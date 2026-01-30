import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || session.user.role !== "CREATOR") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const days = parseInt(searchParams.get("days") || "30");

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

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Get revenue data
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: session.user.id,
                type: { in: ["TIP", "SUBSCRIPTION", "PURCHASE"] },
                status: "COMPLETED",
                createdAt: { gte: startDate },
            },
            orderBy: { createdAt: "asc" },
        });

        // Group by date
        const revenueByDate: Record<string, number> = {};
        transactions.forEach((tx: any) => {
            const date = tx.createdAt.toISOString().split("T")[0];
            revenueByDate[date] = (revenueByDate[date] || 0) + tx.amount;
        });

        // Convert to array
        const chartData = Object.entries(revenueByDate).map(([date, revenue]) => ({
            date,
            revenue,
        }));

        // Calculate breakdown by source
        const breakdown = {
            subscriptions: 0,
            ppv: 0,
            tips: 0,
        };

        transactions.forEach((tx: any) => {
            if (tx.type === "SUBSCRIPTION") {
                breakdown.subscriptions += tx.amount;
            } else if (tx.type === "PURCHASE") {
                breakdown.ppv += tx.amount;
            } else if (tx.type === "TIP") {
                breakdown.tips += tx.amount;
            }
        });

        const total = breakdown.subscriptions + breakdown.ppv + breakdown.tips;

        return NextResponse.json({
            chartData,
            breakdown: {
                subscriptions: {
                    amount: breakdown.subscriptions,
                    percentage: total > 0 ? (breakdown.subscriptions / total) * 100 : 0,
                },
                ppv: {
                    amount: breakdown.ppv,
                    percentage: total > 0 ? (breakdown.ppv / total) * 100 : 0,
                },
                tips: {
                    amount: breakdown.tips,
                    percentage: total > 0 ? (breakdown.tips / total) * 100 : 0,
                },
            },
            total,
        });
    } catch (error: any) {
        console.error("Error fetching analytics:", error);
        return NextResponse.json(
            { error: "Failed to fetch analytics" },
            { status: 500 }
        );
    }
}
