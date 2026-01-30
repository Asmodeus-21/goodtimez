"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useSocket(userId?: string) {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!userId) return;

        // Initialize socket connection
        if (!socket) {
            socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
                transports: ["websocket", "polling"],
            });

            socket.on("connect", () => {
                console.log("✅ Socket connected");
                setIsConnected(true);
                socket?.emit("join", userId);
            });

            socket.on("disconnect", () => {
                console.log("❌ Socket disconnected");
                setIsConnected(false);
            });
        }

        return () => {
            // Don't disconnect on unmount, keep connection alive
        };
    }, [userId]);

    return { socket, isConnected };
}

export function useConversation(conversationId?: string) {
    const [messages, setMessages] = useState<any[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!socket || !conversationId) return;

        // Join conversation room
        socket.emit("join_conversation", conversationId);

        // Listen for new messages
        socket.on("new_message", (message: any) => {
            setMessages((prev) => [...prev, message]);
        });

        // Listen for typing indicator
        socket.on("user_typing", (data: { userId: string; isTyping: boolean }) => {
            setIsTyping(data.isTyping);
        });

        // Listen for read receipts
        socket.on("message_read", (data: { messageId: string; readAt: Date }) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === data.messageId ? { ...msg, read: true, readAt: data.readAt } : msg
                )
            );
        });

        return () => {
            socket?.off("new_message");
            socket?.off("user_typing");
            socket?.off("message_read");
        };
    }, [conversationId]);

    const sendMessage = (data: {
        type: string;
        content?: string;
        mediaUrl?: string;
        isPPV?: boolean;
        price?: number;
        senderId: string;
        recipientId: string;
    }) => {
        if (!socket || !conversationId) return;

        socket.emit("send_message", {
            conversationId,
            ...data,
        });
    };

    const sendTypingIndicator = (userId: string, isTyping: boolean) => {
        if (!socket || !conversationId) return;

        socket.emit("typing", {
            conversationId,
            userId,
            isTyping,
        });
    };

    const markAsRead = (messageId: string, userId: string) => {
        if (!socket) return;

        socket.emit("mark_read", {
            messageId,
            userId,
        });
    };

    return {
        messages,
        isTyping,
        sendMessage,
        sendTypingIndicator,
        markAsRead,
    };
}
