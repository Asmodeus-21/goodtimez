"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CreatorDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        } else if (session?.user?.role !== "CREATOR") {
            router.push("/portal-select");
        }
    }, [status, session, router]);

    if (status === "loading") {
        return <div className="min-h-screen bg-dark-bg flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>;
    }

    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Header */}
            <header className="glass border-b border-dark-border sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="font-display text-2xl font-bold gradient-text">Goodtimez Creator</h1>

                        <nav className="flex items-center gap-6">
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("overview")}>
                                Dashboard
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("vault")}>
                                Vault
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("analytics")}>
                                Analytics
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("messages")}>
                                Messages
                                <span className="ml-2 px-2 py-0.5 rounded-full bg-neon-pink text-xs">12</span>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("financials")}>
                                Financials
                            </Button>

                            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-dark-border">
                                <div className="glass rounded-xl px-4 py-2">
                                    <span className="text-sm text-dark-muted">Earnings:</span>
                                    <span className="ml-2 font-bold text-neon-cyan">$12,847</span>
                                </div>

                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink to-brand-500 flex items-center justify-center text-white font-bold">
                                    {session?.user?.name?.[0]?.toUpperCase() || "C"}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "vault" && <VaultTab />}
                {activeTab === "analytics" && <AnalyticsTab />}
                {activeTab === "messages" && <MessagesTab />}
                {activeTab === "financials" && <FinancialsTab />}
            </main>
        </div>
    );
}

// Overview Tab
function OverviewTab() {
    return (
        <div className="space-y-8">
            {/* Welcome */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-4xl font-bold mb-2">
                    Creator <span className="gradient-text">Dashboard</span>
                </h2>
                <p className="text-dark-muted">Manage your content, engage with fans, and track your growth</p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Subscribers", value: "1,247", change: "+12%", icon: "👥", gradient: "from-neon-pink to-brand-500" },
                    { label: "Monthly Revenue", value: "$12,847", change: "+23%", icon: "💰", gradient: "from-brand-500 to-neon-purple" },
                    { label: "Content Pieces", value: "342", change: "+8", icon: "📸", gradient: "from-neon-purple to-neon-blue" },
                    { label: "Engagement Rate", value: "87%", change: "+5%", icon: "❤️", gradient: "from-neon-blue to-neon-cyan" },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card hover className="relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`} />
                            <CardContent className="relative pt-6">
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                <div className="text-sm text-dark-muted mb-1">{stat.label}</div>
                                <div className="text-xs text-neon-cyan font-semibold">{stat.change} this month</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Fast access to common tasks</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="primary" className="h-24 flex flex-col gap-2">
                            <span className="text-2xl">📤</span>
                            <span>Upload Content</span>
                        </Button>
                        <Button variant="secondary" className="h-24 flex flex-col gap-2">
                            <span className="text-2xl">🎥</span>
                            <span>Start Live Stream</span>
                        </Button>
                        <Button variant="secondary" className="h-24 flex flex-col gap-2">
                            <span className="text-2xl">💬</span>
                            <span>Mass DM</span>
                        </Button>
                        <Button variant="secondary" className="h-24 flex flex-col gap-2">
                            <span className="text-2xl">📊</span>
                            <span>View Analytics</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Top Fans (Whale Tracking) */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>🐋 Top Fans (Whales)</CardTitle>
                            <CardDescription>Your highest spenders this month</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">View All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: "DiamondFan123", spent: "$847", badge: "💎", online: true },
                            { name: "PlatinumSupporter", spent: "$623", badge: "🏆", online: false },
                            { name: "GoldMember99", spent: "$512", badge: "⭐", online: true },
                            { name: "SilverWhale", spent: "$389", badge: "🥈", online: false },
                        ].map((fan, i) => (
                            <div key={i} className="flex items-center justify-between p-4 glass rounded-xl hover:bg-dark-elevated transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-premium flex items-center justify-center text-xl">
                                            {fan.badge}
                                        </div>
                                        {fan.online && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-cyan rounded-full border-2 border-dark-elevated" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{fan.name}</div>
                                        <div className="text-sm text-dark-muted">Spent {fan.spent} this month</div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Send Message</Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Vault Tab
function VaultTab() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-bold mb-2">Content <span className="gradient-text">Vault</span></h2>
                    <p className="text-dark-muted">Manage and schedule your content</p>
                </div>
                <Button variant="primary" size="lg">
                    <span className="text-xl mr-2">+</span> Upload Content
                </Button>
            </div>

            {/* Upload Zone */}
            <Card className="border-2 border-dashed border-dark-border hover:border-brand-500 transition-colors cursor-pointer">
                <CardContent className="py-12 text-center">
                    <div className="text-6xl mb-4">📤</div>
                    <h3 className="text-xl font-bold mb-2">Drag & Drop Files Here</h3>
                    <p className="text-dark-muted mb-4">or click to browse</p>
                    <p className="text-sm text-dark-muted">Supports: Photos, Videos, Audio • Max 500MB per file</p>
                </CardContent>
            </Card>

            {/* Content Grid */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm">All (342)</Button>
                        <Button variant="ghost" size="sm">Photos (234)</Button>
                        <Button variant="ghost" size="sm">Videos (98)</Button>
                        <Button variant="ghost" size="sm">Audio (10)</Button>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Sort: Recent</Button>
                        <Button variant="ghost" size="sm">Filter</Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Card key={i} hover className="overflow-hidden group">
                            <div className="aspect-square bg-gradient-to-br from-brand-500/30 to-neon-purple/30 relative">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dark-bg/80">
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2 glass-heavy rounded-lg px-2 py-1 text-xs font-bold">
                                    ${(Math.random() * 20 + 5).toFixed(2)}
                                </div>
                                <div className="absolute bottom-2 left-2 glass-heavy rounded-lg px-2 py-1 text-xs">
                                    {Math.floor(Math.random() * 500)} unlocks
                                </div>
                            </div>
                            <CardContent className="pt-3">
                                <div className="text-sm font-semibold mb-1">Content #{i + 1}</div>
                                <div className="text-xs text-dark-muted">{Math.floor(Math.random() * 24)} hours ago</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Analytics Tab (War Room)
function AnalyticsTab() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-4xl font-bold mb-2">Analytics <span className="gradient-text">War Room</span></h2>
                <p className="text-dark-muted">Deep insights into your performance</p>
            </div>

            {/* Revenue Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 flex items-end gap-2">
                        {Array.from({ length: 30 }).map((_, i) => {
                            const height = Math.random() * 100;
                            return (
                                <div key={i} className="flex-1 bg-gradient-to-t from-brand-500 to-neon-purple rounded-t-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer" style={{ height: `${height}%` }} />
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-2">$8,234</div>
                        <div className="text-sm text-dark-muted mb-4">64% of total revenue</div>
                        <div className="h-2 bg-dark-elevated rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-brand-500 to-neon-purple w-[64%]" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>PPV Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-2">$3,421</div>
                        <div className="text-sm text-dark-muted mb-4">27% of total revenue</div>
                        <div className="h-2 bg-dark-elevated rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-neon-purple to-neon-blue w-[27%]" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tips & Custom</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-2">$1,192</div>
                        <div className="text-sm text-dark-muted mb-4">9% of total revenue</div>
                        <div className="h-2 bg-dark-elevated rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan w-[9%]" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Churn Prediction */}
            <Card className="border-2 border-neon-pink/30">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        <div>
                            <CardTitle>Churn Alert</CardTitle>
                            <CardDescription>AI-powered retention insights</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-xl p-4 mb-4">
                        <p className="font-semibold mb-2">32% of your subscribers are at risk of churning in the next 48 hours</p>
                        <p className="text-sm text-dark-muted">Send a retention promo to re-engage them</p>
                    </div>
                    <Button variant="primary">Send Retention Campaign</Button>
                </CardContent>
            </Card>
        </div>
    );
}

// Messages Tab
function MessagesTab() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-bold mb-2">Smart <span className="gradient-text">Messages</span></h2>
                    <p className="text-dark-muted">AI-powered DM management</p>
                </div>
                <Button variant="primary" size="lg">Mass PPV Blast</Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Inbox List */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Priority Inbox</CardTitle>
                        <CardDescription>Sorted by spending power</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[
                            { name: "DiamondFan123", message: "Hey! Love your content", badge: "💎", unread: 2 },
                            { name: "PlatinumUser", message: "Custom request?", badge: "🏆", unread: 1 },
                            { name: "GoldMember", message: "Thanks for the post!", badge: "⭐", unread: 0 },
                        ].map((msg, i) => (
                            <div key={i} className={`p-3 rounded-xl cursor-pointer transition-colors ${msg.unread ? 'glass' : 'hover:bg-dark-elevated'}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="text-xl">{msg.badge}</div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-sm">{msg.name}</div>
                                    </div>
                                    {msg.unread > 0 && (
                                        <div className="w-5 h-5 rounded-full bg-neon-pink flex items-center justify-center text-xs">
                                            {msg.unread}
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs text-dark-muted truncate">{msg.message}</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Chat Window */}
                <Card className="col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">💎</div>
                                <div>
                                    <CardTitle>DiamondFan123</CardTitle>
                                    <CardDescription>Top 1% Spender • $847 this month</CardDescription>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">View Profile</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-96 bg-dark-surface rounded-xl p-4 mb-4 overflow-y-auto space-y-4">
                            {/* Messages would go here */}
                            <div className="text-center text-dark-muted text-sm">Select a conversation to start messaging</div>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-3 rounded-xl bg-dark-elevated border border-dark-border focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                            <Button variant="ghost">📎</Button>
                            <Button variant="primary">Send</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Financials Tab
function FinancialsTab() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-bold mb-2">Financial <span className="gradient-text">Hub</span></h2>
                    <p className="text-dark-muted">Manage your earnings and payouts</p>
                </div>
                <Button variant="primary" size="lg" className="bg-gradient-to-r from-neon-cyan to-neon-blue">
                    💸 Instant Payout
                </Button>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-neon-cyan/30">
                    <CardContent className="pt-6">
                        <div className="text-sm text-dark-muted mb-2">Available Balance</div>
                        <div className="text-4xl font-bold mb-4 text-neon-cyan">$12,847.32</div>
                        <Button variant="primary" className="w-full">Withdraw Now</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm text-dark-muted mb-2">Pending (7 days)</div>
                        <div className="text-4xl font-bold mb-4">$3,421.18</div>
                        <div className="text-xs text-dark-muted">Available on Feb 6</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm text-dark-muted mb-2">Lifetime Earnings</div>
                        <div className="text-4xl font-bold mb-4">$87,234.56</div>
                        <div className="text-xs text-neon-cyan">+23% vs last month</div>
                    </CardContent>
                </Card>
            </div>

            {/* Commission Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Commission Rate</CardTitle>
                    <CardDescription>Platform takes 20% • You keep 80%</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1">
                            <div className="h-8 bg-dark-elevated rounded-full overflow-hidden flex">
                                <div className="bg-gradient-to-r from-neon-cyan to-neon-blue h-full flex items-center justify-center text-sm font-bold" style={{ width: '80%' }}>
                                    You: 80%
                                </div>
                                <div className="bg-dark-border h-full flex items-center justify-center text-sm" style={{ width: '20%' }}>
                                    Platform: 20%
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-dark-muted">
                        💡 Earn $10,000+/month to unlock VIP rate (85%)
                    </p>
                </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Transactions</CardTitle>
                        <Button variant="outline" size="sm">Export CSV</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[
                            { type: "Subscription", user: "DiamondFan123", amount: "+$9.99", time: "2 min ago" },
                            { type: "PPV Unlock", user: "PlatinumUser", amount: "+$14.99", time: "15 min ago" },
                            { type: "Tip", user: "GoldMember", amount: "+$50.00", time: "1 hour ago" },
                            { type: "Custom Request", user: "SilverWhale", amount: "+$125.00", time: "3 hours ago" },
                        ].map((tx, i) => (
                            <div key={i} className="flex items-center justify-between p-3 glass rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-premium flex items-center justify-center text-sm">
                                        💰
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{tx.type}</div>
                                        <div className="text-xs text-dark-muted">{tx.user} • {tx.time}</div>
                                    </div>
                                </div>
                                <div className="text-neon-cyan font-bold">{tx.amount}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
