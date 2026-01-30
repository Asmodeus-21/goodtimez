"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function DemoLogin() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDemoLogin = async (role: string) => {
        setIsLoading(true);

        const demoCredentials = {
            fan: { email: "fan@demo.com", password: "demo" },
            creator: { email: "creator@demo.com", password: "demo" },
            brand: { email: "brand@demo.com", password: "demo" },
            admin: { email: "admin@demo.com", password: "demo" },
        };

        const credentials = demoCredentials[role as keyof typeof demoCredentials];

        const result = await signIn("credentials", {
            email: credentials.email,
            password: credentials.password,
            redirect: false,
        });

        if (result?.ok) {
            // Redirect based on role
            const routes = {
                fan: "/fan",
                creator: "/creator",
                brand: "/brand",
                admin: "/admin",
            };

            router.push(routes[role as keyof typeof routes]);
        } else {
            alert("Demo login failed. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
            <div className="w-full max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-5xl font-bold mb-4">
                        <span className="gradient-text">Goodtimez</span> Demo
                    </h1>
                    <p className="text-dark-muted text-lg">
                        Choose a role to explore the platform
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fan Portal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card hover className="h-full border-2 border-transparent hover:border-brand-500/30">
                            <CardContent className="pt-6">
                                <div className="text-center mb-6">
                                    <div className="text-6xl mb-4">👤</div>
                                    <CardTitle className="text-2xl mb-2">Fan Portal</CardTitle>
                                    <CardDescription>
                                        Discover creators, unlock content, and manage subscriptions
                                    </CardDescription>
                                </div>

                                <div className="space-y-2 mb-6 text-sm text-dark-muted">
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-cyan">✓</span>
                                        <span>Browse creator profiles</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-cyan">✓</span>
                                        <span>PPV content unlocking</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-cyan">✓</span>
                                        <span>Real-time messaging</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-cyan">✓</span>
                                        <span>Wallet & token management</span>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={() => handleDemoLogin("fan")}
                                    isLoading={isLoading}
                                >
                                    Enter as Fan
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Creator Portal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card hover className="h-full border-2 border-transparent hover:border-neon-purple/30">
                            <CardContent className="pt-6">
                                <div className="text-center mb-6">
                                    <div className="text-6xl mb-4">⭐</div>
                                    <CardTitle className="text-2xl mb-2">Creator Portal</CardTitle>
                                    <CardDescription>
                                        Manage content, track earnings, and engage with fans
                                    </CardDescription>
                                </div>

                                <div className="space-y-2 mb-6 text-sm text-dark-muted">
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-purple">✓</span>
                                        <span>Content vault & analytics</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-purple">✓</span>
                                        <span>Whale tracking & CRM</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-purple">✓</span>
                                        <span>Live streaming tools</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-purple">✓</span>
                                        <span>Financial dashboard</span>
                                    </div>
                                </div>

                                <Button
                                    variant="secondary"
                                    className="w-full bg-gradient-to-r from-neon-purple to-brand-500"
                                    onClick={() => handleDemoLogin("creator")}
                                    isLoading={isLoading}
                                >
                                    Enter as Creator
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Brand Portal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card hover className="h-full border-2 border-transparent hover:border-neon-blue/30">
                            <CardContent className="pt-6">
                                <div className="text-center mb-6">
                                    <div className="text-6xl mb-4">🏢</div>
                                    <CardTitle className="text-2xl mb-2">Brand Portal</CardTitle>
                                    <CardDescription>
                                        Discover influencers and manage campaigns
                                    </CardDescription>
                                </div>

                                <div className="space-y-2 mb-6 text-sm text-dark-muted">
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-blue">✓</span>
                                        <span>AI-powered matching</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-blue">✓</span>
                                        <span>ROI prediction</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-blue">✓</span>
                                        <span>Campaign management</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-blue">✓</span>
                                        <span>Sentiment analysis</span>
                                    </div>
                                </div>

                                <Button
                                    variant="secondary"
                                    className="w-full bg-gradient-to-r from-neon-blue to-neon-cyan"
                                    onClick={() => handleDemoLogin("brand")}
                                    isLoading={isLoading}
                                >
                                    Enter as Brand
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Admin Portal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card hover className="h-full border-2 border-transparent hover:border-red-500/30">
                            <CardContent className="pt-6">
                                <div className="text-center mb-6">
                                    <div className="text-6xl mb-4">🛡️</div>
                                    <CardTitle className="text-2xl mb-2">Admin Portal</CardTitle>
                                    <CardDescription>
                                        Platform management and moderation
                                    </CardDescription>
                                </div>

                                <div className="space-y-2 mb-6 text-sm text-dark-muted">
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500">✓</span>
                                        <span>Live platform pulse</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500">✓</span>
                                        <span>KYC verification queue</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500">✓</span>
                                        <span>Content moderation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500">✓</span>
                                        <span>Financial orchestration</span>
                                    </div>
                                </div>

                                <Button
                                    variant="secondary"
                                    className="w-full bg-gradient-to-r from-red-500 to-orange-500"
                                    onClick={() => handleDemoLogin("admin")}
                                    isLoading={isLoading}
                                >
                                    Enter as Admin
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <div className="mt-8 text-center">
                    <div className="glass rounded-xl p-6 inline-block">
                        <p className="text-sm font-semibold mb-4">🎭 Demo Mode Active - No database required</p>
                        <p className="text-xs text-dark-muted mb-4">Click any button above for instant access, or use these credentials:</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div className="glass-heavy rounded-lg p-3">
                                <div className="font-semibold text-brand-400 mb-1">Fan</div>
                                <div className="text-dark-muted">fan@demo.com</div>
                                <div className="text-dark-muted">demo</div>
                            </div>
                            <div className="glass-heavy rounded-lg p-3">
                                <div className="font-semibold text-neon-purple mb-1">Creator</div>
                                <div className="text-dark-muted">creator@demo.com</div>
                                <div className="text-dark-muted">demo</div>
                            </div>
                            <div className="glass-heavy rounded-lg p-3">
                                <div className="font-semibold text-neon-blue mb-1">Brand</div>
                                <div className="text-dark-muted">brand@demo.com</div>
                                <div className="text-dark-muted">demo</div>
                            </div>
                            <div className="glass-heavy rounded-lg p-3">
                                <div className="font-semibold text-red-500 mb-1">Admin</div>
                                <div className="text-dark-muted">admin@demo.com</div>
                                <div className="text-dark-muted">demo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
