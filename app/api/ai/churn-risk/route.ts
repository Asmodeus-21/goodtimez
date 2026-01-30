import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { predictChurnRisk, generateRetentionCampaign } from "@/lib/ai";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || session.user.role !== "CREATOR") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

        // Get all active subscriptions
        const subscriptions = await prisma.subscription.findMany({
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

        // Analyze churn risk for each subscription
        const atRiskSubscribers = [];

        for (const subscription of subscriptions) {
            const { risk, score, factors } = await predictChurnRisk(subscription.id, prisma);

            if (risk === "high" || risk === "medium") {
                const campaign = generateRetentionCampaign(risk, factors);

                atRiskSubscribers.push({
                    subscriberId: subscription.fanId,
                    username: subscription.fan.user.username,
                    risk,
                    score,
                    factors,
                    suggestedAction: campaign,
                });
            }
        }

        // Sort by risk score (highest first)
        atRiskSubscribers.sort((a, b) => b.score - a.score);

        return NextResponse.json({
            totalSubscribers: subscriptions.length,
            atRiskCount: atRiskSubscribers.length,
            atRiskSubscribers: atRiskSubscribers.slice(0, 10), // Top 10
        });
    } catch (error: any) {
        console.error("Error analyzing churn risk:", error);
        return NextResponse.json(
            { error: "Failed to analyze churn risk" },
            { status: 500 }
        );
    }
}
