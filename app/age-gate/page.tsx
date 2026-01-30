"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeGate() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Show modal after brief delay for dramatic effect
        const timer = setTimeout(() => setShowModal(true), 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleVerify = () => {
        localStorage.setItem("age_verified", "true");
        router.push("/portal-select");
    };

    const handleExit = () => {
        window.location.href = "https://www.google.com";
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-dark-bg">
            {/* Animated Background with Parallax */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />

            {/* Double Blur Layers */}
            <div className="absolute inset-0 z-10 backdrop-blur-3xl bg-dark-bg/60" />
            <div className="absolute inset-0 z-20 backdrop-blur-xl bg-gradient-to-br from-brand-900/40 via-dark-bg/50 to-neon-purple/20" />

            {/* Floating Gradient Orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-neon-pink/30 to-brand-500/30 blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-neon-blue/30 to-neon-cyan/30 blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Content */}
            <div className="relative z-30 min-h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-center max-w-2xl"
                >
                    {/* Logo/Brand */}
                    <motion.h1
                        className="font-display text-7xl md:text-8xl font-black mb-6 gradient-text"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                    >
                        Goodtimez
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-dark-text/80 mb-12 font-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        Premium Creator Platform
                    </motion.p>

                    {/* Age Verification Modal */}
                    <AnimatePresence>
                        {showModal && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.4, type: "spring" }}
                                className="glass-heavy rounded-3xl p-8 md:p-12 shadow-premium"
                            >
                                <div className="mb-8">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-premium flex items-center justify-center shadow-neon">
                                        <svg
                                            className="w-10 h-10 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                                        Age Verification Required
                                    </h2>
                                    <p className="text-dark-text/70 text-lg mb-2">
                                        This platform contains adult content
                                    </p>
                                    <p className="text-dark-text/60">
                                        You must be 18 years or older to continue
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <motion.button
                                        onClick={handleVerify}
                                        className="w-full btn-premium text-lg py-4 rounded-2xl"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            I am 18 or older
                                            <svg
                                                className="w-5 h-5"
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
                                        </span>
                                    </motion.button>

                                    <motion.button
                                        onClick={handleExit}
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-dark-border bg-dark-surface/50 text-dark-text hover:bg-dark-elevated transition-all duration-300"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        I am under 18 - Exit
                                    </motion.button>
                                </div>

                                <p className="mt-8 text-sm text-dark-muted">
                                    By entering, you agree to our Terms of Service and Privacy Policy
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent z-20" />
        </div>
    );
}
