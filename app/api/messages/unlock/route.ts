import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { messageId, userId } = await request.json();

        if (!messageId || !userId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Get message
        const message = await prisma.message.findUnique({
            where: { id: messageId },
        });

        if (!message) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        // Check if message is PPV
        if (!message.isPPV) {
            return NextResponse.json(
                { error: "Message is not PPV" },
                { status: 400 }
            );
        }

        // Check if user has enough tokens
        const wallet = await prisma.wallet.findUnique({
            where: { userId },
        });

        if (!wallet || wallet.tokenBalance < (message.price || 0)) {
            return NextResponse.json(
                { error: "Insufficient tokens" },
                { status: 400 }
            );
        }

        // Deduct tokens from fan
        await prisma.wallet.update({
            where: { userId },
            data: {
                tokenBalance: {
                    decrement: message.price || 0,
                },
            },
        });

        // Add tokens to creator
        await prisma.wallet.update({
            where: { userId: message.senderId },
            data: {
                tokenBalance: {
                    increment: (message.price || 0) * 0.8, // 80% to creator
                },
            },
        });

        // Create transaction records
        await prisma.transaction.createMany({
            data: [
                {
                    userId,
                    type: "PURCHASE",
                    status: "COMPLETED",
                    amount: message.price || 0,
                    currency: "TOKENS",
                    description: `Unlocked PPV message`,
                },
                {
                    userId: message.senderId,
                    type: "TIP",
                    status: "COMPLETED",
                    amount: (message.price || 0) * 0.8,
                    currency: "TOKENS",
                    description: `PPV message earnings`,
                },
            ],
        });

        // Mark message as unlocked (update message to add unlocked field)
        // For now, we'll just return success

        return NextResponse.json({
            success: true,
            message: "Message unlocked successfully",
        });
    } catch (error: any) {
        console.error("Error unlocking message:", error);
        return NextResponse.json(
            { error: "Failed to unlock message" },
            { status: 500 }
        );
    }
}
