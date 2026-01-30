"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("pulse");
    const [commandBarOpen, setCommandBarOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        } else if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
            router.push("/portal-select");
        }

        // Command Bar (Cmd+K)
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setCommandBarOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [status, session, router]);

    if (status === "loading") {
        return <div className="min-h-screen bg-dark-bg flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>;
    }

    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Command Bar */}
            {commandBarOpen && (
                <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-[100] flex items-start justify-center pt-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-2xl glass-heavy rounded-2xl p-2"
                    >
                        <Input
                            placeholder="Search users, transactions, content... (Cmd+K)"
                            autoFocus
                            onBlur={() => setCommandBarOpen(false)}
                        />
                        <div className="mt-2 p-4 text-sm text-dark-muted">
                            Type to search across the entire platform...
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Header */}
            <header className="glass border-b border-dark-border sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="font-display text-2xl font-bold gradient-text">🛡️ Admin Portal</h1>

                        <nav className="flex items-center gap-6">
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("pulse")}>
                                Pulse
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("kyc")}>
                                KYC Queue
                                <span className="ml-2 px-2 py-0.5 rounded-full bg-neon-pink text-xs">8</span>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("moderation")}>
                                Moderation
                                <span className="ml-2 px-2 py-0.5 rounded-full bg-red-500 text-xs">3</span>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("financials")}>
                                Financials
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("users")}>
                                Users
                            </Button>

                            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-dark-border">
                                <Button variant="ghost" size="sm" onClick={() => setCommandBarOpen(true)}>
                                    ⌘K
                                </Button>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                                    A
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === "pulse" && <PulseTab />}
                {activeTab === "kyc" && <KYCTab />}
                {activeTab === "moderation" && <ModerationTab />}
                {activeTab === "financials" && <FinancialsTab />}
                {activeTab === "users" && <UsersTab />}
            </main>
        </div>
    );
}

// Pulse Tab (Live Dashboard)
function PulseTab() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-4xl font-bold mb-2">Platform <span className="gradient-text">Pulse</span></h2>
                <p className="text-dark-muted">Real-time platform activity</p>
            </div>

            {/* System Health */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Users", value: "2,847", status: "healthy", icon: "👥" },
                    { label: "Server Load", value: "42%", status: "healthy", icon: "⚡" },
                    { label: "Revenue Today", value: "$24,847", status: "healthy", icon: "💰" },
                    { label: "Pending Reports", value: "3", status: "warning", icon: "⚠️" },
                ].map((stat, i) => (
                    <Card key={i} className={stat.status === "warning" ? "border-2 border-neon-pink/30" : ""}>
                        <CardContent className="pt-6">
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-dark-muted">{stat.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Live Activity Feed */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>🔴 Live Activity Feed</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                            <span className="text-sm text-dark-muted">Live</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {[
                            { event: "New user signup", user: "fan_user_847", time: "Just now", type: "info" },
                            { event: "Large transaction", user: "DiamondFan123 spent $500", time: "2 min ago", type: "success" },
                            { event: "Content uploaded", user: "creator_star_23", time: "3 min ago", type: "info" },
                            { event: "Chargeback alert", user: "Transaction #12847", time: "5 min ago", type: "warning" },
                            { event: "New creator verified", user: "creator_new_99", time: "8 min ago", type: "success" },
                        ].map((activity, i) => (
                            <div key={i} className={`p-3 rounded-xl flex items-center justify-between ${activity.type === "warning" ? "bg-neon-pink/10 border border-neon-pink/30" :
                                    activity.type === "success" ? "bg-neon-cyan/10 border border-neon-cyan/30" :
                                        "glass"
                                }`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${activity.type === "warning" ? "bg-neon-pink" :
                                            activity.type === "success" ? "bg-neon-cyan" :
                                                "bg-brand-500"
                                        }`} />
                                    <div>
                                        <div className="text-sm font-semibold">{activity.event}</div>
                                        <div className="text-xs text-dark-muted">{activity.user}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-dark-muted">{activity.time}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Global Revenue Map */}
            <Card>
                <CardHeader>
                    <CardTitle>🌍 Global Revenue Map</CardTitle>
                    <CardDescription>Real-time revenue by region</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 bg-dark-surface rounded-xl flex items-center justify-center">
                        <div className="text-center text-dark-muted">
                            <div className="text-4xl mb-2">🗺️</div>
                            <div className="text-sm">3D Map Visualization</div>
                            <div className="text-xs">(Would integrate with mapping library)</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// KYC Queue Tab
function KYCTab() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-bold mb-2">KYC <span className="gradient-text">Verification Queue</span></h2>
                    <p className="text-dark-muted">Review and approve creator identities</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Auto-Approve (90%+)</Button>
                    <Button variant="outline" size="sm">Filters</Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold mb-1">8</div>
                        <div className="text-sm text-dark-muted">Pending Review</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold mb-1 text-neon-cyan">247</div>
                        <div className="text-sm text-dark-muted">Auto-Approved Today</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold mb-1 text-red-500">3</div>
                        <div className="text-sm text-dark-muted">Rejected Today</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold mb-1">94%</div>
                        <div className="text-sm text-dark-muted">Avg Confidence Score</div>
                    </CardContent>
                </Card>
            </div>

            {/* Review Queue */}
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-2 border-brand-500/30">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* ID Document */}
                                <div>
                                    <div className="text-sm font-semibold mb-2">Government ID</div>
                                    <div className="aspect-video bg-dark-surface rounded-xl flex items-center justify-center">
                                        <div className="text-4xl">🪪</div>
                                    </div>
                                    <div className="mt-2 text-xs text-dark-muted">
                                        Type: Passport • Uploaded 2 hours ago
                                    </div>
                                </div>

                                {/* Liveness Selfie */}
                                <div>
                                    <div className="text-sm font-semibold mb-2">Liveness Selfie</div>
                                    <div className="aspect-video bg-dark-surface rounded-xl flex items-center justify-center">
                                        <div className="text-4xl">📸</div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className="text-dark-muted">AI Confidence</span>
                                            <span className="text-neon-cyan font-bold">87%</span>
                                        </div>
                                        <div className="h-1 bg-dark-elevated rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue w-[87%]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div>
                                    <div className="text-sm font-semibold mb-2">Review</div>
                                    <div className="space-y-3">
                                        <div className="glass rounded-xl p-3">
                                            <div className="text-xs text-dark-muted mb-1">Creator</div>
                                            <div className="font-semibold">@creator_username_{i}</div>
                                        </div>
                                        <div className="glass rounded-xl p-3">
                                            <div className="text-xs text-dark-muted mb-1">AI Flags</div>
                                            <div className="text-sm">
                                                {i === 1 ? "✅ None" : "⚠️ Low lighting quality"}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="primary" size="sm" className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-blue">
                                                ✓ Approve
                                            </Button>
                                            <Button variant="danger" size="sm" className="flex-1">
                                                ✗ Reject
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// Moderation Tab
function ModerationTab() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-4xl font-bold mb-2">Content <span className="gradient-text">Moderation</span></h2>
                <p className="text-dark-muted">AI-flagged content requiring review</p>
            </div>

            {/* Flagged Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-2 border-red-500/30">
                        <div className="aspect-square bg-dark-surface relative">
                            <div className="absolute inset-0 backdrop-blur-3xl flex items-center justify-center">
                                <div className="text-6xl">⚠️</div>
                            </div>
                            <div className="absolute top-2 right-2 glass-heavy rounded-lg px-3 py-1 text-xs font-bold text-red-500">
                                Flagged
                            </div>
                        </div>
                        <CardContent className="pt-4">
                            <div className="space-y-3">
                                <div>
                                    <div className="text-xs text-dark-muted">Creator</div>
                                    <div className="font-semibold">@creator_name_{i}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-dark-muted">AI Flag Reason</div>
                                    <div className="text-sm text-red-500">Possible policy violation</div>
                                </div>
                                <div>
                                    <div className="text-xs text-dark-muted">Risk Score</div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-dark-elevated rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 w-[78%]" />
                                        </div>
                                        <span className="text-sm font-bold">78%</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="primary" size="sm" className="flex-1">
                                        Approve
                                    </Button>
                                    <Button variant="danger" size="sm" className="flex-1">
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// Financials Tab
function FinancialsTab() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-4xl font-bold mb-2">Financial <span className="gradient-text">Orchestration</span></h2>
                <p className="text-dark-muted">Platform revenue and commission management</p>
            </div>

            {/* Revenue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Platform Revenue (30d)", value: "$124,847", icon: "💰" },
                    { label: "Creator Payouts (30d)", value: "$487,234", icon: "💸" },
                    { label: "Pending Chargebacks", value: "$2,341", icon: "⚠️" },
                    { label: "Avg Commission Rate", value: "22%", icon: "📊" },
                ].map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-dark-muted">{stat.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Commission Control */}
            <Card>
                <CardHeader>
                    <CardTitle>Global Commission Settings</CardTitle>
                    <CardDescription>Adjust platform-wide commission rates</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm">Default Creator Rate</span>
                                <span className="text-xl font-bold">20%</span>
                            </div>
                            <input type="range" min="10" max="40" defaultValue="20" className="w-full" />
                        </div>
                        <div className="glass rounded-xl p-4">
                            <div className="text-sm text-dark-muted mb-2">Tiered Rates</div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Earnings &lt; $1K/mo:</span>
                                    <span className="font-bold">25%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Earnings $1K - $10K/mo:</span>
                                    <span className="font-bold">20%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Earnings &gt; $10K/mo:</span>
                                    <span className="font-bold text-neon-cyan">15%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Users Tab
function UsersTab() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-bold mb-2">User <span className="gradient-text">Management</span></h2>
                    <p className="text-dark-muted">Search and manage all platform users</p>
                </div>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <Input placeholder="Search by username, email, or ID..." />
                </CardContent>
            </Card>

            {/* User Table */}
            <Card>
                <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-dark-border">
                                    <th className="text-left py-3 text-sm text-dark-muted">User</th>
                                    <th className="text-left py-3 text-sm text-dark-muted">Role</th>
                                    <th className="text-left py-3 text-sm text-dark-muted">Status</th>
                                    <th className="text-left py-3 text-sm text-dark-muted">Joined</th>
                                    <th className="text-left py-3 text-sm text-dark-muted">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "DiamondFan123", role: "FAN", status: "ACTIVE", joined: "2024-01-15" },
                                    { name: "CreatorStar", role: "CREATOR", status: "ACTIVE", joined: "2024-02-20" },
                                    { name: "BrandCorp", role: "BRAND", status: "PENDING_VERIFICATION", joined: "2024-03-01" },
                                ].map((user, i) => (
                                    <tr key={i} className="border-b border-dark-border hover:bg-dark-elevated transition-colors">
                                        <td className="py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-premium flex items-center justify-center text-sm">
                                                    {user.name[0]}
                                                </div>
                                                <div className="font-semibold">{user.name}</div>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <span className="px-2 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.status === "ACTIVE" ? "bg-neon-cyan/20 text-neon-cyan" : "bg-neon-pink/20 text-neon-pink"
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-sm text-dark-muted">{user.joined}</td>
                                        <td className="py-3">
                                            <Button variant="ghost" size="sm">View</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
