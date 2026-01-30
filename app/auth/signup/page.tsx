"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import Link from "next/link";

type UserRole = "FAN" | "CREATOR" | "BRAND";

export default function SignUp() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<UserRole | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleSelect = (selectedRole: UserRole) => {
        setRole(selectedRole);
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        // Age validation
        const birthDate = new Date(formData.birthDate);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        if (age < 18) {
            setError("You must be 18 or older to sign up");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    role,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create account");
            }

            // Redirect to sign in
            router.push("/auth/signin?registered=true");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 relative overflow-hidden py-12">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 via-dark-bg to-neon-purple/10" />
            <motion.div
                className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20 blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="font-display text-5xl font-black gradient-text mb-2">
                        Goodtimez
                    </h1>
                    <p className="text-dark-muted">Create your account</p>
                </div>

                {step === 1 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Choose Your Role</CardTitle>
                            <CardDescription>Select how you want to use Goodtimez</CardDescription>
                        </CardHeader>

                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { role: "FAN" as UserRole, icon: "👤", title: "Fan", desc: "Discover creators" },
                                { role: "CREATOR" as UserRole, icon: "⭐", title: "Creator", desc: "Monetize content" },
                                { role: "BRAND" as UserRole, icon: "🏢", title: "Brand", desc: "Partner with creators" },
                            ].map((item) => (
                                <motion.button
                                    key={item.role}
                                    onClick={() => handleRoleSelect(item.role)}
                                    className="glass-heavy rounded-2xl p-6 text-center hover:scale-105 transition-transform"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="text-5xl mb-3">{item.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm text-dark-muted">{item.desc}</p>
                                </motion.button>
                            ))}
                        </CardContent>

                        <CardFooter>
                            <p className="text-center text-sm text-dark-muted w-full">
                                Already have an account?{" "}
                                <Link href="/auth/signin" className="text-brand-400 hover:text-brand-300 font-semibold">
                                    Sign in
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Your Account</CardTitle>
                            <CardDescription>
                                Signing up as a <span className="text-brand-400 font-semibold">{role}</span>
                            </CardDescription>
                        </CardHeader>

                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-4">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-500 text-sm"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@example.com"
                                        required
                                    />

                                    <Input
                                        label="Username"
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        placeholder="@username"
                                        required
                                    />
                                </div>

                                <Input
                                    label="Date of Birth"
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                    required
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        required
                                    />

                                    <Input
                                        label="Confirm Password"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                <div className="bg-brand-500/10 border border-brand-500/30 rounded-xl p-4 text-sm">
                                    <p className="text-dark-text">
                                        ✓ Password must be at least 8 characters
                                        <br />
                                        ✓ You must be 18 years or older
                                    </p>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col gap-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                    isLoading={isLoading}
                                >
                                    Create Account
                                </Button>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setStep(1)}
                                    className="w-full"
                                >
                                    ← Back to role selection
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                )}

                <p className="text-center text-xs text-dark-muted mt-8">
                    By creating an account, you agree to our{" "}
                    <Link href="/legal/terms" className="text-brand-400 hover:underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/legal/privacy" className="text-brand-400 hover:underline">
                        Privacy Policy
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
