"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useSocket, useConversation } from "@/hooks/useSocket";

interface Message {
    id: string;
    senderId: string;
    recipientId: string;
    type: string;
    content?: string;
    mediaUrl?: string;
    isPPV: boolean;
    price?: number;
    read: boolean;
    readAt?: Date;
    createdAt: Date;
}

export function MessagingInterface({ userId, partnerId }: { userId: string; partnerId: string }) {
    const [messageText, setMessageText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showPPVModal, setShowPPVModal] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { socket, isConnected } = useSocket(userId);
    const conversationId = [userId, partnerId].sort().join("-");
    const { messages, isTyping: partnerTyping, sendMessage, sendTypingIndicator, markAsRead } = useConversation(conversationId);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Mark messages as read
    useEffect(() => {
        messages.forEach((msg) => {
            if (msg.recipientId === userId && !msg.read) {
                markAsRead(msg.id, userId);
            }
        });
    }, [messages, userId, markAsRead]);

    const handleSendMessage = () => {
        if (!messageText.trim()) return;

        sendMessage({
            type: "TEXT",
            content: messageText,
            senderId: userId,
            recipientId: partnerId,
        });

        setMessageText("");
        sendTypingIndicator(userId, false);
    };

    const handleTyping = (text: string) => {
        setMessageText(text);

        if (text.length > 0 && !isTyping) {
            setIsTyping(true);
            sendTypingIndicator(userId, true);
        } else if (text.length === 0 && isTyping) {
            setIsTyping(false);
            sendTypingIndicator(userId, false);
        }
    };

    const handleUnlockPPV = async (messageId: string) => {
        try {
            const response = await fetch("/api/messages/unlock", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messageId, userId }),
            });

            if (response.ok) {
                alert("Message unlocked!");
                // Refresh messages
            } else {
                const data = await response.json();
                alert(data.error || "Failed to unlock message");
            }
        } catch (error) {
            alert("Error unlocking message");
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="glass border-b border-dark-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-premium flex items-center justify-center text-xl">
                        ⭐
                    </div>
                    <div>
                        <div className="font-semibold">Partner Name</div>
                        <div className="text-xs text-dark-muted flex items-center gap-2">
                            {isConnected ? (
                                <>
                                    <div className="w-2 h-2 bg-neon-cyan rounded-full" />
                                    <span>Online</span>
                                </>
                            ) : (
                                <>
                                    <div className="w-2 h-2 bg-dark-muted rounded-full" />
                                    <span>Offline</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowPPVModal(true)}>
                        💰 Send PPV
                    </Button>
                    <Button variant="ghost" size="sm">⋮</Button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((message, index) => {
                        const isMine = message.senderId === userId;

                        return (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                            >
                                {message.isPPV && message.recipientId === userId ? (
                                    // PPV Locked Message
                                    <div className="max-w-sm">
                                        <Card className="border-2 border-neon-pink/30">
                                            <CardContent className="pt-6 text-center">
                                                <div className="text-4xl mb-3">🔒</div>
                                                <div className="font-semibold mb-2">Locked Content</div>
                                                <div className="text-sm text-dark-muted mb-4">
                                                    Unlock this message for {message.price} tokens
                                                </div>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() => handleUnlockPPV(message.id)}
                                                >
                                                    Unlock for {message.price} Tokens
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ) : (
                                    // Regular Message
                                    <div className={`max-w-sm ${isMine ? "text-right" : "text-left"}`}>
                                        <div
                                            className={`inline-block px-4 py-3 rounded-2xl ${isMine
                                                    ? "bg-gradient-premium text-white"
                                                    : "glass"
                                                }`}
                                        >
                                            {message.type === "TEXT" && (
                                                <div className="text-sm">{message.content}</div>
                                            )}
                                            {message.type === "PHOTO" && (
                                                <div className="w-48 h-48 bg-dark-surface rounded-xl flex items-center justify-center">
                                                    📸 Photo
                                                </div>
                                            )}
                                            {message.type === "VIDEO" && (
                                                <div className="w-48 h-48 bg-dark-surface rounded-xl flex items-center justify-center">
                                                    🎥 Video
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-xs text-dark-muted mt-1 px-2">
                                            {new Date(message.createdAt).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                            {isMine && message.read && " • Read"}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Typing Indicator */}
                {partnerTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="glass px-4 py-3 rounded-2xl">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="glass border-t border-dark-border p-4">
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                        📎
                    </Button>
                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => handleTyping(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 rounded-xl bg-dark-elevated border border-dark-border focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <Button
                        variant="primary"
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                    >
                        Send
                    </Button>
                </div>
            </div>

            {/* PPV Modal */}
            {showPPVModal && (
                <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-md"
                    >
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Send PPV Content</CardTitle>
                                    <Button variant="ghost" onClick={() => setShowPPVModal(false)}>
                                        ✕
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-dark-muted mb-2 block">Price (tokens)</label>
                                        <input
                                            type="number"
                                            placeholder="10"
                                            className="w-full px-4 py-3 rounded-xl bg-dark-elevated border border-dark-border focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-dark-muted mb-2 block">Upload Content</label>
                                        <div className="border-2 border-dashed border-dark-border rounded-xl p-8 text-center cursor-pointer hover:border-brand-500 transition-colors">
                                            <div className="text-4xl mb-2">📤</div>
                                            <div className="text-sm">Click to upload photo or video</div>
                                        </div>
                                    </div>
                                    <Button variant="primary" className="w-full">
                                        Send PPV Message
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
