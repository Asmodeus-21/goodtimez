import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { prisma } from "./prisma";

let io: SocketIOServer | null = null;

export function initializeSocket(server: HTTPServer) {
    if (io) return io;

    io = new SocketIOServer(server, {
        cors: {
            origin: process.env.NEXTAUTH_URL || "http://localhost:3001",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`✅ User connected: ${socket.id}`);

        // Join user's personal room
        socket.on("join", (userId: string) => {
            socket.join(`user:${userId}`);
            console.log(`User ${userId} joined their room`);
        });

        // Join conversation room
        socket.on("join_conversation", (conversationId: string) => {
            socket.join(`conversation:${conversationId}`);
            console.log(`User joined conversation: ${conversationId}`);
        });

        // Send message
        socket.on("send_message", async (data: {
            conversationId: string;
            senderId: string;
            recipientId: string;
            type: string;
            content?: string;
            mediaUrl?: string;
            isPPV?: boolean;
            price?: number;
        }) => {
            try {
                // Create message in database
                const message = await prisma.message.create({
                    data: {
                        senderId: data.senderId,
                        recipientId: data.recipientId,
                        type: data.type as any,
                        content: data.content,
                        mediaUrl: data.mediaUrl,
                        isPPV: data.isPPV || false,
                        price: data.price,
                    },
                });

                // Emit to conversation room
                io?.to(`conversation:${data.conversationId}`).emit("new_message", message);

                // Emit to recipient's personal room (for notification)
                io?.to(`user:${data.recipientId}`).emit("message_notification", {
                    messageId: message.id,
                    senderId: data.senderId,
                    conversationId: data.conversationId,
                });

                console.log(`Message sent: ${message.id}`);
            } catch (error) {
                console.error("Error sending message:", error);
                socket.emit("message_error", { error: "Failed to send message" });
            }
        });

        // Typing indicator
        socket.on("typing", (data: { conversationId: string; userId: string; isTyping: boolean }) => {
            socket.to(`conversation:${data.conversationId}`).emit("user_typing", {
                userId: data.userId,
                isTyping: data.isTyping,
            });
        });

        // Mark message as read
        socket.on("mark_read", async (data: { messageId: string; userId: string }) => {
            try {
                await prisma.message.update({
                    where: { id: data.messageId },
                    data: {
                        read: true,
                        readAt: new Date(),
                    },
                });

                // Notify sender
                const message = await prisma.message.findUnique({
                    where: { id: data.messageId },
                });

                if (message) {
                    io?.to(`user:${message.senderId}`).emit("message_read", {
                        messageId: data.messageId,
                        readAt: new Date(),
                    });
                }
            } catch (error) {
                console.error("Error marking message as read:", error);
            }
        });

        // Disconnect
        socket.on("disconnect", () => {
            console.log(`❌ User disconnected: ${socket.id}`);
        });
    });

    return io;
}

export function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
}

// Helper function to emit to a specific user
export function emitToUser(userId: string, event: string, data: any) {
    if (!io) return;
    io.to(`user:${userId}`).emit(event, data);
}

// Helper function to emit to a conversation
export function emitToConversation(conversationId: string, event: string, data: any) {
    if (!io) return;
    io.to(`conversation:${conversationId}`).emit(event, data);
}
