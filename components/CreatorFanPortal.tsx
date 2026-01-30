"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCreatorTheme } from "./ThemeProvider";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { DEMO_CONTENT } from "@/lib/demo-data";

export function CreatorFanPortal({ creator }: { creator: any }) {
    const theme = useCreatorTheme();
    const [activeTab, setActiveTab] = useState("feed");

    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Branded Header */}
            <header className="glass border-b border-dark-border sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Creator Logo/Brand */}
                        <div className="flex items-center gap-3">
                            {theme?.logoUrl ? (
                                <img
                                    src={theme.logoUrl}
                                    alt={theme.brandName}
                                    className="h-10"
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="text-3xl">{creator.avatar}</div>
                                    <h1
                                        className="text-2xl font-bold"
                                        style={{ color: theme?.primaryColor || '#8b5cf6' }}
                                    >
                                        {theme?.brandName || creator.displayName}
                                    </h1>
                                </div>
                            )}
                        </div>

                        {/* Navigation - NO "Explore" or "Discover" */}
                        <nav className="hidden md:flex gap-6">
                            <button
                                onClick={() => setActiveTab("feed")}
                                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "feed"
                                        ? "bg-gradient-premium text-white"
                                        : "hover:bg-dark-elevated"
                                    }`}
                            >
                                Feed
                            </button>
                            <button
                                onClick={() => setActiveTab("vault")}
                                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "vault"
                                        ? "bg-gradient-premium text-white"
                                        : "hover:bg-dark-elevated"
                                    }`}
                            >
                                Vault
                            </button>
                            <button
                                onClick={() => setActiveTab("messages")}
                                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "messages"
                                        ? "bg-gradient-premium text-white"
                                        : "hover:bg-dark-elevated"
                                    }`}
                            >
                                Messages
                            </button>
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "profile"
                                        ? "bg-gradient-premium text-white"
                                        : "hover:bg-dark-elevated"
                                    }`}
                            >
                                Profile
                            </button>
                            {/* NO "Explore Creators" link */}
                        </nav>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm">
                                💰 500 Tokens
                            </Button>
                            <div className="w-10 h-10 rounded-full bg-gradient-premium flex items-center justify-center">
                                👤
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                {activeTab === "feed" && <FeedTab creator={creator} theme={theme} />}
                {activeTab === "vault" && <VaultTab creator={creator} theme={theme} />}
                {activeTab === "messages" && <MessagesTab creator={creator} theme={theme} />}
                {activeTab === "profile" && <ProfileTab creator={creator} theme={theme} />}
            </main>
        </div>
    );
}

function FeedTab({ creator, theme }: { creator: any; theme: any }) {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Creator Banner */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-6">
                        <div className="text-6xl">{creator.avatar}</div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-2">{creator.displayName}</h2>
                            <p className="text-dark-muted mb-4">
                                {creator.subscribers.toLocaleString()} subscribers • {creator.engagement}% engagement
                            </p>
                            <div className="flex gap-3">
                                <Button variant="primary">
                                    Subscribe for ${creator.price}/month
                                </Button>
                                <Button variant="outline">
                                    💬 Send Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Content Feed - Only this creator's content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DEMO_CONTENT.map((content) => (
                    <motion.div
                        key={content.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card hover>
                            <CardContent className="pt-6">
                                <div className="aspect-video bg-dark-elevated rounded-xl mb-4 flex items-center justify-center text-6xl">
                                    {content.type === "PHOTO" ? "📸" : "🎥"}
                                </div>
                                <h3 className="font-semibold mb-2">{content.title}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-dark-muted">
                                        {content.unlocks.toLocaleString()} unlocks
                                    </span>
                                    <Button variant="primary" size="sm">
                                        Unlock for {content.price} tokens
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function VaultTab({ creator, theme }: { creator: any; theme: any }) {
    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
                {theme?.brandName || creator.displayName}'s Vault
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {DEMO_CONTENT.map((content) => (
                    <Card key={content.id} hover>
                        <CardContent className="p-4">
                            <div className="aspect-square bg-dark-elevated rounded-lg mb-3 flex items-center justify-center text-4xl">
                                {content.type === "PHOTO" ? "📸" : "🎥"}
                            </div>
                            <div className="text-sm font-semibold mb-1">{content.title}</div>
                            <div className="text-xs text-dark-muted">{content.price} tokens</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function MessagesTab({ creator, theme }: { creator: any; theme: any }) {
    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardContent className="pt-6">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">💬</div>
                        <h3 className="text-xl font-bold mb-2">
                            {theme?.chatHeaderTitle || `Chat with ${creator.displayName}`}
                        </h3>
                        <p className="text-dark-muted mb-6">
                            Send a message to start the conversation
                        </p>
                        <Button variant="primary">
                            Send Message
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function ProfileTab({ creator, theme }: { creator: any; theme: any }) {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">Your Subscription</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-dark-muted">Status</span>
                            <span className="text-neon-cyan font-semibold">Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-dark-muted">Next Billing</span>
                            <span>Feb 28, 2026</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-dark-muted">Monthly Price</span>
                            <span>${creator.price}/month</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">Your Stats</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-brand-500">23</div>
                            <div className="text-sm text-dark-muted">Day Streak</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-neon-cyan">847</div>
                            <div className="text-sm text-dark-muted">Tokens Spent</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-neon-purple">12</div>
                            <div className="text-sm text-dark-muted">Items Unlocked</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
