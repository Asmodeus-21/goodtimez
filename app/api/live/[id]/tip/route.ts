import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { amount, message } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid tip amount" },
                { status: 400 }
            );
        }

        // Get live stream
        const liveStream = await prisma.liveStream.findUnique({
            where: { id },
            include: {
                creator: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!liveStream) {
            return NextResponse.json(
                { error: "Live stream not found" },
                { status: 404 }
            );
        }

        if (liveStream.status !== "LIVE") {
            return NextResponse.json(
                { error: "Stream is not live" },
                { status: 400 }
            );
        }

        // Check wallet balance
        const wallet = await prisma.wallet.findUnique({
            where: { userId: session.user.id },
        });

        if (!wallet || wallet.tokenBalance < amount) {
            return NextResponse.json(
                { error: "Insufficient tokens" },
                { status: 400 }
            );
        }

        // Deduct tokens from fan
        await prisma.wallet.update({
            where: { userId: session.user.id },
            data: {
                tokenBalance: {
                    decrement: amount,
                },
            },
        });

        // Add tokens to creator (80%)
        await prisma.wallet.update({
            where: { userId: liveStream.creator.userId },
            data: {
                tokenBalance: {
                    increment: amount * 0.8,
                },
            },
        });

        // Update live stream total tips
        await prisma.liveStream.update({
            where: { id },
            data: {
                totalTips: {
                    increment: amount,
                },
            },
        });

        // Create transaction records
        await prisma.transaction.createMany({
            data: [
                {
                    userId: session.user.id,
                    type: "TIP",
                    status: "COMPLETED",
                    amount,
                    currency: "TOKENS",
                    description: `Tipped ${liveStream.creator.displayName} during live stream`,
                },
                {
                    userId: liveStream.creator.userId,
                    type: "TIP",
                    status: "COMPLETED",
                    amount: amount * 0.8,
                    currency: "TOKENS",
                    description: `Tip received during live stream`,
                },
            ],
        });

        // Emit tip event via Socket.io (would be implemented)
        // emitToLiveStream(params.id, 'tip', { amount, username, message });

        return NextResponse.json({
            success: true,
            newTotal: liveStream.totalTips + amount,
        });
    } catch (error: any) {
        console.error("Error sending tip:", error);
        return NextResponse.json(
            { error: "Failed to send tip" },
            { status: 500 }
        );
    }
}
