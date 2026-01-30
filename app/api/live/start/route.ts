import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || session.user.role !== "CREATOR") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, description, scheduledAt, goals } = await request.json();

        if (!title) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        // Get creator profile
        const creatorProfile = await prisma.creatorProfile.findUnique({
            where: { userId: session.user.id },
        });

        if (!creatorProfile) {
            return NextResponse.json(
                { error: "Creator profile not found" },
                { status: 404 }
            );
        }

        // Create live stream
        const liveStream = await prisma.liveStream.create({
            data: {
                creatorId: creatorProfile.id,
                title,
                description,
                status: scheduledAt ? "SCHEDULED" : "LIVE",
                scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
                startedAt: scheduledAt ? null : new Date(),
                goals: goals || [],
            },
        });

        // Notify subscribers
        const subscribers = await prisma.subscription.findMany({
            where: {
                creatorId: creatorProfile.id,
                active: true,
            },
            include: {
                fan: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        // Create notifications for subscribers
        await prisma.notification.createMany({
            data: subscribers.map((sub) => ({
                userId: sub.fan.userId,
                type: "LIVE_STREAM",
                title: `${creatorProfile.displayName} is live!`,
                message: title,
                link: `/live/${liveStream.id}`,
            })),
        });

        return NextResponse.json({
            success: true,
            liveStream,
        });
    } catch (error: any) {
        console.error("Error starting live stream:", error);
        return NextResponse.json(
            { error: "Failed to start live stream" },
            { status: 500 }
        );
    }
}
