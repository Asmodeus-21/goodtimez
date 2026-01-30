"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Goal {
    id: string;
    title: string;
    target: number;
    current: number;
}

interface Tip {
    id: string;
    username: string;
    amount: number;
    message?: string;
    timestamp: Date;
}

export function LiveStreamPlayer({ streamId, isCreator }: { streamId: string; isCreator: boolean }) {
    const [viewerCount, setViewerCount] = useState(847);
    const [totalTips, setTotalTips] = useState(0);
    const [goals, setGoals] = useState<Goal[]>([
        { id: "1", title: "Oil Show", target: 1000, current: 650 },
        { id: "2", title: "Special Request", target: 2500, current: 200 },
    ]);
    const [recentTips, setRecentTips] = useState<Tip[]>([]);
    const [showTipModal, setShowTipModal] = useState(false);
    const [tipAmount, setTipAmount] = useState("");
    const [tipMessage, setTipMessage] = useState("");
    const videoRef = useRef<HTMLVideoElement>(null);

    // Simulate tip animations
    const addTip = (tip: Tip) => {
        setRecentTips((prev) => [tip, ...prev.slice(0, 4)]);
        setTotalTips((prev) => prev + tip.amount);

        // Update goals
        setGoals((prev) =>
            prev.map((goal) => ({
                ...goal,
                current: goal.current + tip.amount,
            }))
        );

        // Remove after animation
        setTimeout(() => {
            setRecentTips((prev) => prev.filter((t) => t.id !== tip.id));
        }, 5000);
    };

    const handleSendTip = async () => {
        const amount = parseInt(tipAmount);
        if (!amount || amount <= 0) return;

        try {
            const response = await fetch(`/api/live/${streamId}/tip`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount,
                    message: tipMessage,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                // Add tip animation
                addTip({
                    id: Date.now().toString(),
                    username: "You",
                    amount,
                    message: tipMessage,
                    timestamp: new Date(),
                });

                setTipAmount("");
                setTipMessage("");
                setShowTipModal(false);
            } else {
                const data = await response.json();
                alert(data.error || "Failed to send tip");
            }
        } catch (error) {
            alert("Error sending tip");
        }
    };

    return (
        <div className="relative h-full bg-dark-bg">
            {/* Video Player */}
            <div className="relative aspect-video bg-dark-surface">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                >
                    {/* Video source would be added here */}
                </video>

                {/* Live Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="glass-heavy rounded-lg px-3 py-1 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm font-bold">LIVE</span>
                    </div>
                    <div className="glass-heavy rounded-lg px-3 py-1 flex items-center gap-2">
                        <span className="text-sm">👁️ {viewerCount.toLocaleString()}</span>
                    </div>
                </div>

                {/* Goals Overlay */}
                <div className="absolute top-4 right-4 space-y-2 max-w-xs">
                    {goals.map((goal) => {
                        const progress = (goal.current / goal.target) * 100;
                        const isComplete = progress >= 100;

                        return (
                            <motion.div
                                key={goal.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`glass-heavy rounded-xl p-3 ${isComplete ? "border-2 border-neon-cyan" : ""
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold">{goal.title}</span>
                                    <span className="text-xs text-dark-muted">
                                        {goal.current}/{goal.target}
                                    </span>
                                </div>
                                <div className="h-2 bg-dark-elevated rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full ${isComplete
                                                ? "bg-gradient-to-r from-neon-cyan to-neon-blue"
                                                : "bg-gradient-premium"
                                            }`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(progress, 100)}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                {isComplete && (
                                    <div className="text-xs text-neon-cyan mt-1">✓ Complete!</div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Tip Animations */}
                <div className="absolute bottom-20 left-4 space-y-2">
                    <AnimatePresence>
                        {recentTips.map((tip) => (
                            <motion.div
                                key={tip.id}
                                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="glass-heavy rounded-xl px-4 py-2 flex items-center gap-3"
                            >
                                <div className="text-2xl">💰</div>
                                <div>
                                    <div className="text-sm font-bold text-neon-cyan">
                                        {tip.amount} tokens
                                    </div>
                                    <div className="text-xs text-dark-muted">
                                        from {tip.username}
                                    </div>
                                    {tip.message && (
                                        <div className="text-xs mt-1">{tip.message}</div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex gap-2">
                        {!isCreator && (
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setShowTipModal(true)}
                            >
                                💰 Send Tip
                            </Button>
                        )}
                        <Button variant="ghost" size="sm">
                            🔇 Mute
                        </Button>
                        <Button variant="ghost" size="sm">
                            ⚙️ Quality
                        </Button>
                    </div>

                    <div className="glass-heavy rounded-lg px-4 py-2">
                        <span className="text-sm font-bold text-neon-cyan">
                            ${totalTips.toLocaleString()} raised
                        </span>
                    </div>
                </div>
            </div>

            {/* Chat Sidebar (would be integrated with messaging) */}
            <div className="absolute top-0 right-0 w-80 h-full glass border-l border-dark-border p-4">
                <div className="text-sm font-semibold mb-4">Live Chat</div>
                <div className="space-y-2 text-sm">
                    <div className="glass rounded-lg p-2">
                        <span className="font-semibold text-brand-400">User123:</span> Amazing show! 🔥
                    </div>
                    <div className="glass rounded-lg p-2">
                        <span className="font-semibold text-brand-400">Fan456:</span> Just tipped!
                    </div>
                </div>
            </div>

            {/* Tip Modal */}
            {showTipModal && (
                <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-md"
                    >
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold">Send a Tip</h3>
                                    <Button variant="ghost" onClick={() => setShowTipModal(false)}>
                                        ✕
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {/* Quick amounts */}
                                    <div className="grid grid-cols-4 gap-2">
                                        {[10, 25, 50, 100].map((amount) => (
                                            <Button
                                                key={amount}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setTipAmount(amount.toString())}
                                            >
                                                {amount}
                                            </Button>
                                        ))}
                                    </div>

                                    <div>
                                        <label className="text-sm text-dark-muted mb-2 block">
                                            Custom Amount (tokens)
                                        </label>
                                        <input
                                            type="number"
                                            value={tipAmount}
                                            onChange={(e) => setTipAmount(e.target.value)}
                                            placeholder="Enter amount"
                                            className="w-full px-4 py-3 rounded-xl bg-dark-elevated border border-dark-border focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-dark-muted mb-2 block">
                                            Message (optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={tipMessage}
                                            onChange={(e) => setTipMessage(e.target.value)}
                                            placeholder="Say something nice..."
                                            className="w-full px-4 py-3 rounded-xl bg-dark-elevated border border-dark-border focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>

                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        onClick={handleSendTip}
                                        disabled={!tipAmount || parseInt(tipAmount) <= 0}
                                    >
                                        Send {tipAmount || "0"} Tokens
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
