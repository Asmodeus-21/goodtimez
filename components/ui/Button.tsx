import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = "primary",
    size = "md",
    isLoading = false,
    className,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "relative overflow-hidden font-semibold transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-premium text-white shadow-premium hover:shadow-neon",
        secondary: "bg-dark-elevated text-white hover:bg-dark-border",
        outline: "border-2 border-brand-500 text-brand-400 hover:bg-brand-500/10",
        ghost: "text-dark-text hover:bg-dark-elevated",
        danger: "bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-lg",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <motion.div
            whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
            className="inline-block"
        >
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Loading...</span>
                    </div>
                ) : (
                    children
                )}
            </button>
        </motion.div>
    );
}
