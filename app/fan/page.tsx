"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

export default function FanDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        } else if (session?.user?.role !== "FAN") {
            router.push("/portal-select");
        }
    }, [status, session, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-dark-bg p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <Skeleton className="h-12 w-64" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Header */}
            <header className="glass border-b border-dark-border sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="font-display text-2xl font-bold gradient-text">Goodtimez</h1>

                    <nav className="flex items-center gap-6">
                        <Button variant="ghost" size="sm">Discover</Button>
                        <Button variant="ghost" size="sm">Messages</Button>
                        <Button variant="ghost" size="sm">Subscriptions</Button>
                        <Button variant="ghost" size="sm">Vault</Button>

                        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-dark-border">
                            <div className="glass rounded-xl px-4 py-2">
                                <span className="text-sm text-dark-muted">Balance:</span>
                                <span className="ml-2 font-bold text-brand-400">1,250 Tokens</span>
                            </div>

                            <div className="w-10 h-10 rounded-full bg-gradient-premium flex items-center justify-center text-white font-bold">
                                {session?.user?.name?.[0]?.toUpperCase() || "F"}
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-4xl font-bold mb-2">
                        Welcome back, <span className="gradient-text">{session?.user?.name}</span>
                    </h2>
                    <p className="text-dark-muted">Discover amazing creators and exclusive content</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Active Subscriptions", value: "3", icon: "⭐", gradient: "from-neon-pink to-brand-500" },
                        { label: "Total Spent", value: "$247", icon: "💰", gradient: "from-brand-500 to-neon-purple" },
                        { label: "Current Streak", value: "12 days", icon: "🔥", gradient: "from-neon-purple to-neon-blue" },
                        { label: "Fan Rank", value: "Gold", icon: "👑", gradient: "from-neon-blue to-neon-cyan" },
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
                                    <div className="text-sm text-dark-muted">{stat.label}</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Featured Creators */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold">Featured Creators</h3>
                        <Button variant="outline" size="sm">View All →</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card hover className="overflow-hidden">
                                    {/* Banner */}
                                    <div className="h-32 bg-gradient-to-br from-brand-500 to-neon-purple relative">
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80')] bg-cover bg-center opacity-50" />
                                    </div>

                                    {/* Avatar */}
                                    <div className="relative px-6 -mt-12">
                                        <div className="w-24 h-24 rounded-full bg-gradient-premium border-4 border-dark-elevated flex items-center justify-center text-3xl">
                                            ⭐
                                        </div>
                                    </div>

                                    <CardContent className="pt-4">
                                        <h4 className="text-xl font-bold mb-1">Creator Name</h4>
                                        <p className="text-sm text-dark-muted mb-4">@username • 12.5K subscribers</p>

                                        <div className="flex gap-2 mb-4">
                                            <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs">
                                                #Lifestyle
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple text-xs">
                                                #Fashion
                                            </span>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button variant="primary" size="sm" className="flex-1">
                                                Subscribe $9.99/mo
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Preview
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Recent Content */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold">Recent Content</h3>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm">All</Button>
                            <Button variant="ghost" size="sm">Photos</Button>
                            <Button variant="ghost" size="sm">Videos</Button>
                            <Button variant="ghost" size="sm">Live</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="relative group cursor-pointer"
                            >
                                <div className="aspect-square rounded-2xl overflow-hidden relative">
                                    {/* Blurred Preview */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/50 to-neon-purple/50 blur-2xl" />

                                    {/* Lock Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="glass-heavy rounded-full p-4 group-hover:scale-110 transition-transform">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Price Tag */}
                                    <div className="absolute top-3 right-3 glass-heavy rounded-xl px-3 py-1 text-sm font-bold">
                                        ${(Math.random() * 20 + 5).toFixed(2)}
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <p className="text-sm font-semibold">Creator Name</p>
                                    <p className="text-xs text-dark-muted">2 hours ago</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
