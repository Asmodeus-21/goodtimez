"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const portals = [
    {
        id: "fan",
        title: "Fan",
        description: "Discover and connect with your favorite creators",
        icon: "👤",
        gradient: "from-neon-pink to-brand-500",
        route: "/fan",
    },
    {
        id: "creator",
        title: "Creator",
        description: "Build your brand and monetize your content",
        icon: "⭐",
        gradient: "from-brand-500 to-neon-purple",
        route: "/creator",
    },
    {
        id: "brand",
        title: "Brand/Agency",
        description: "Partner with creators for campaigns",
        icon: "🏢",
        gradient: "from-neon-purple to-neon-blue",
        route: "/brand",
    },
    {
        id: "admin",
        title: "Admin",
        description: "Platform management and oversight",
        icon: "🛡️",
        gradient: "from-neon-blue to-neon-cyan",
        route: "/admin",
    },
];

export default function PortalSelect() {
    const router = useRouter();
    const [hoveredPortal, setHoveredPortal] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-dark-bg relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 via-dark-bg to-neon-purple/10" />
            <motion.div
                className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-neon-pink/20 to-brand-500/20 blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-display text-5xl md:text-6xl font-black mb-4 gradient-text">
                        Choose Your Portal
                    </h1>
                    <p className="text-dark-muted text-lg">
                        Select how you want to experience Goodtimez
                    </p>
                </motion.div>

                {/* Portal Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
                    {portals.map((portal, index) => (
                        <motion.div
                            key={portal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            onHoverStart={() => setHoveredPortal(portal.id)}
                            onHoverEnd={() => setHoveredPortal(null)}
                            whileHover={{ scale: 1.05, y: -10 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push(portal.route)}
                            className="cursor-pointer"
                        >
                            <div className="glass-heavy rounded-3xl p-8 h-full relative overflow-hidden group">
                                {/* Gradient Overlay on Hover */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                />

                                {/* Icon */}
                                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {portal.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold mb-3 text-white">
                                    {portal.title}
                                </h3>

                                {/* Description */}
                                <p className="text-dark-muted mb-6">
                                    {portal.description}
                                </p>

                                {/* Arrow */}
                                <motion.div
                                    className="flex items-center text-brand-400 font-semibold"
                                    animate={{
                                        x: hoveredPortal === portal.id ? 5 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Enter
                                    <svg
                                        className="w-5 h-5 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </motion.div>

                                {/* Glow Effect */}
                                {hoveredPortal === portal.id && (
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-20 blur-xl`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.2 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-dark-muted text-sm text-center"
                >
                    Don't have an account?{" "}
                    <button className="text-brand-400 hover:text-brand-300 font-semibold underline">
                        Sign up now
                    </button>
                </motion.p>
            </div>
        </div>
    );
}
