"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function BrandDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("discover");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        } else if (session?.user?.role !== "BRAND" && session?.user?.role !== "AGENCY") {
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
                        <h1 className="font-display text-2xl font-bold gradient-text">Goodtimez Brand</h1>

                        <nav className="flex items-center gap-6">
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("discover")}>
                                Discover
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("campaigns")}>
                                Campaigns
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("analytics")}>
                                Analytics
                            </Button>

                            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-dark-border">
                                <div className="glass rounded-xl px-4 py-2">
                                    <span className="text-sm text-dark-muted">Credit:</span>
                                    <span className="ml-2 font-bold text-brand-400">$50,000</span>
                                </div>

                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center text-white font-bold">
                                    🏢
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === "discover" && <DiscoverTab />}
                {activeTab === "campaigns" && <CampaignsTab />}
                {activeTab === "analytics" && <AnalyticsTab />}
            </main>
        </div>
    );
}

// Discover Tab
function DiscoverTab() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-4xl font-bold mb-2">Influencer <span className="gradient-text">Discovery</span></h2>
                <p className="text-dark-muted">Find the perfect creators for your campaigns</p>
            </div>

            {/* Search & Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Input placeholder="Search creators..." className="md:col-span-2" />
                        <select className="px-4 py-3 rounded-xl bg-dark-elevated border border-dark-border text-dark-text">
                            <option>Category: All</option>
                            <option>Lifestyle</option>
                            <option>Fashion</option>
                            <option>Fitness</option>
                        </select>
                        <select className="px-4 py-3 rounded-xl bg-dark-elevated border border-dark-border text-dark-text">
                            <option>Followers: Any</option>
                            <option>1K - 10K</option>
                            <option>10K - 100K</option>
                            <option>100K+</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Creator Cards with AI Matching */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card hover className="overflow-hidden">
                            {/* Banner */}
                            <div className="h-32 bg-gradient-to-br from-brand-500 to-neon-purple relative">
                                <div className="absolute top-2 right-2 glass-heavy rounded-lg px-3 py-1 text-xs font-bold">
                                    {Math.floor(Math.random() * 30 + 70)}% Match
                                </div>
                            </div>

                            {/* Avatar */}
                            <div className="relative px-6 -mt-12">
                                <div className="w-24 h-24 rounded-full bg-gradient-premium border-4 border-dark-elevated flex items-center justify-center text-3xl">
                                    ⭐
                                </div>
                            </div>

                            <CardContent className="pt-4">
                                <h4 className="text-xl font-bold mb-1">Creator Name</h4>
                                <p className="text-sm text-dark-muted mb-4">
                                    {(Math.random() * 100 + 10).toFixed(1)}K subscribers • {(Math.random() * 10 + 1).toFixed(1)}% engagement
                                </p>

                                {/* Audience Authenticity Score */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-dark-muted">Audience Authenticity</span>
                                        <span className="text-neon-cyan font-bold">94%</span>
                                    </div>
                                    <div className="h-2 bg-dark-elevated rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue w-[94%]" />
                                    </div>
                                </div>

                                {/* Predicted ROI */}
                                <div className="glass rounded-xl p-3 mb-4">
                                    <div className="text-xs text-dark-muted mb-1">Predicted ROI</div>
                                    <div className="text-lg font-bold text-neon-cyan">3.2x</div>
                                    <div className="text-xs text-dark-muted">Based on similar campaigns</div>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="primary" size="sm" className="flex-1">
                                        Book Campaign
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Compare
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

// Campaigns Tab
function CampaignsTab() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-bold mb-2">Campaign <span className="gradient-text">Management</span></h2>
                    <p className="text-dark-muted">Track and manage your influencer partnerships</p>
                </div>
                <Button variant="primary" size="lg">+ New Campaign</Button>
            </div>

            {/* Campaign Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Campaigns", value: "8", icon: "🚀" },
                    { label: "Total Spend", value: "$24,500", icon: "💰" },
                    { label: "Avg ROI", value: "4.2x", icon: "📈" },
                    { label: "Creators Worked With", value: "23", icon: "⭐" },
                ].map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-dark-muted">{stat.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Campaign List (Kanban Style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["In Progress", "Pending Approval", "Completed"].map((status) => (
                    <div key={status}>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            {status}
                            <span className="px-2 py-0.5 rounded-full bg-dark-elevated text-xs">
                                {Math.floor(Math.random() * 5 + 1)}
                            </span>
                        </h3>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <Card key={i} hover>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-premium flex items-center justify-center">
                                                ⭐
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-semibold text-sm">Creator Name</div>
                                                <div className="text-xs text-dark-muted">Campaign #{Math.floor(Math.random() * 1000)}</div>
                                            </div>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-dark-muted">Budget:</span>
                                                <span className="font-semibold">${(Math.random() * 5000 + 1000).toFixed(0)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-dark-muted">Deadline:</span>
                                                <span className="font-semibold">{Math.floor(Math.random() * 10 + 1)} days</span>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full">
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Analytics Tab
function AnalyticsTab() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-4xl font-bold mb-2">Campaign <span className="gradient-text">Analytics</span></h2>
                <p className="text-dark-muted">Real-time performance tracking</p>
            </div>

            {/* Performance Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>Overall Performance</CardTitle>
                    <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <div className="text-sm text-dark-muted mb-2">Total Reach</div>
                            <div className="text-3xl font-bold">847K</div>
                            <div className="text-xs text-neon-cyan">+18% vs last month</div>
                        </div>
                        <div>
                            <div className="text-sm text-dark-muted mb-2">Engagement</div>
                            <div className="text-3xl font-bold">12.4%</div>
                            <div className="text-xs text-neon-cyan">+2.1% vs last month</div>
                        </div>
                        <div>
                            <div className="text-sm text-dark-muted mb-2">Conversions</div>
                            <div className="text-3xl font-bold">1,234</div>
                            <div className="text-xs text-neon-cyan">+34% vs last month</div>
                        </div>
                        <div>
                            <div className="text-sm text-dark-muted mb-2">ROI</div>
                            <div className="text-3xl font-bold">4.2x</div>
                            <div className="text-xs text-neon-cyan">+0.8x vs last month</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Sentiment Analysis */}
            <Card>
                <CardHeader>
                    <CardTitle>AI Sentiment Analysis</CardTitle>
                    <CardDescription>What fans are saying about your campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <div className="text-center">
                            <div className="text-4xl mb-2">😊</div>
                            <div className="text-2xl font-bold text-neon-cyan">76%</div>
                            <div className="text-sm text-dark-muted">Positive</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-2">😐</div>
                            <div className="text-2xl font-bold">18%</div>
                            <div className="text-sm text-dark-muted">Neutral</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-2">😞</div>
                            <div className="text-2xl font-bold">6%</div>
                            <div className="text-sm text-dark-muted">Negative</div>
                        </div>
                    </div>
                    <div className="glass rounded-xl p-4">
                        <div className="text-sm font-semibold mb-2">Top Keywords:</div>
                        <div className="flex flex-wrap gap-2">
                            {["Amazing", "Love it", "Quality", "Authentic", "Inspiring"].map((keyword) => (
                                <span key={keyword} className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
