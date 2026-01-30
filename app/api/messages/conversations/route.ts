import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        // Get all conversations for the user
        const messages = await prisma.message.findMany({
            where: {
                OR: [{ senderId: userId }, { recipientId: userId }],
            },
            orderBy: { createdAt: "desc" },
            take: 100,
        });

        // Group by conversation partner
        const conversationsMap = new Map();

        for (const message of messages) {
            const partnerId = message.senderId === userId ? message.recipientId : message.senderId;

            if (!conversationsMap.has(partnerId)) {
                // Get partner info
                const partner = await prisma.user.findUnique({
                    where: { id: partnerId },
                    select: {
                        id: true,
                        username: true,
                        fanProfile: { select: { displayName: true, avatar: true } },
                        creatorProfile: { select: { displayName: true, avatar: true } },
                    },
                });

                conversationsMap.set(partnerId, {
                    partnerId,
                    partnerName: partner?.username || "Unknown",
                    partnerAvatar:
                        partner?.fanProfile?.avatar || partner?.creatorProfile?.avatar || null,
                    lastMessage: message,
                    unreadCount: 0,
                    messages: [],
                });
            }

            const conversation = conversationsMap.get(partnerId);
            conversation.messages.push(message);

            // Count unread messages
            if (message.recipientId === userId && !message.read) {
                conversation.unreadCount++;
            }
        }

        const conversations = Array.from(conversationsMap.values());

        return NextResponse.json({ conversations });
    } catch (error: any) {
        console.error("Error fetching conversations:", error);
        return NextResponse.json(
            { error: "Failed to fetch conversations" },
            { status: 500 }
        );
    }
}
