"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const TOKEN_PACKAGES = [
    { tokens: 100, price: 9.99, bonus: 0, popular: false },
    { tokens: 500, price: 49.99, bonus: 50, popular: true },
    { tokens: 1000, price: 99.99, bonus: 150, popular: false },
    { tokens: 5000, price: 499.99, bonus: 1000, popular: false },
];

export function WalletModal({ isOpen, onClose, userId }: { isOpen: boolean; onClose: () => void; userId: string }) {
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePurchase = async (packageIndex: number) => {
        setIsProcessing(true);
        setSelectedPackage(packageIndex);

        try {
            const pkg = TOKEN_PACKAGES[packageIndex];

            // Create payment intent
            const response = await fetch("/api/payments/create-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: pkg.price,
                    userId,
                }),
            });

            const { clientSecret } = await response.json();

            // Redirect to Stripe Checkout (simplified for demo)
            // In production, use Stripe Elements for embedded checkout
            alert(`Payment initiated for ${pkg.tokens + pkg.bonus} tokens ($${pkg.price})`);

            onClose();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
            setSelectedPackage(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl"
            >
                <Card className="border-2 border-brand-500/30">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-3xl">💰 Buy Tokens</CardTitle>
                                <CardDescription>Choose a package to add tokens to your wallet</CardDescription>
                            </div>
                            <Button variant="ghost" onClick={onClose}>✕</Button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {TOKEN_PACKAGES.map((pkg, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Card
                                        hover
                                        className={`relative overflow-hidden cursor-pointer ${pkg.popular ? "border-2 border-neon-cyan" : ""
                                            }`}
                                        onClick={() => !isProcessing && handlePurchase(index)}
                                    >
                                        {pkg.popular && (
                                            <div className="absolute top-0 right-0 bg-gradient-to-r from-neon-cyan to-neon-blue px-4 py-1 text-xs font-bold rounded-bl-xl">
                                                MOST POPULAR
                                            </div>
                                        )}

                                        <CardContent className="pt-6">
                                            <div className="text-center mb-4">
                                                <div className="text-5xl font-black mb-2 gradient-text">
                                                    {pkg.tokens.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-dark-muted">Tokens</div>
                                                {pkg.bonus > 0 && (
                                                    <div className="mt-2 px-3 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan text-xs inline-block">
                                                        +{pkg.bonus} BONUS
                                                    </div>
                                                )}
                                            </div>

                                            <div className="text-center mb-4">
                                                <div className="text-3xl font-bold">${pkg.price}</div>
                                                <div className="text-xs text-dark-muted">
                                                    ${(pkg.price / (pkg.tokens + pkg.bonus)).toFixed(3)} per token
                                                </div>
                                            </div>

                                            <Button
                                                variant={pkg.popular ? "primary" : "secondary"}
                                                className="w-full"
                                                isLoading={isProcessing && selectedPackage === index}
                                            >
                                                {isProcessing && selectedPackage === index ? "Processing..." : "Purchase"}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Payment Methods */}
                        <div className="glass rounded-xl p-6">
                            <div className="text-sm font-semibold mb-4">Accepted Payment Methods</div>
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-8 h-8 rounded bg-dark-elevated flex items-center justify-center">💳</div>
                                    <span>Credit/Debit</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-8 h-8 rounded bg-dark-elevated flex items-center justify-center">🪙</div>
                                    <span>Crypto</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-8 h-8 rounded bg-dark-elevated flex items-center justify-center">📱</div>
                                    <span>Apple Pay</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-8 h-8 rounded bg-dark-elevated flex items-center justify-center">🅖</div>
                                    <span>Google Pay</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center text-xs text-dark-muted">
                            Secure payment powered by Stripe • All transactions are encrypted
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
