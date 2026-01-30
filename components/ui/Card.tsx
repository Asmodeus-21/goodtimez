import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    glass?: boolean;
    hover?: boolean;
    onClick?: () => void;
}

export function Card({ children, className, glass = true, hover = false, onClick }: CardProps) {
    const baseStyles = "rounded-2xl p-6 transition-all duration-300";
    const glassStyles = glass ? "glass-heavy" : "bg-dark-elevated border border-dark-border";
    const hoverStyles = hover ? "hover:scale-[1.02] hover:shadow-premium cursor-pointer" : "";

    if (hover) {
        return (
            <motion.div
                className={cn(baseStyles, glassStyles, hoverStyles, className)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <div className={cn(baseStyles, glassStyles, className)} onClick={onClick}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h3 className={cn("text-2xl font-bold text-white", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn("text-dark-muted", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn(className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("mt-4 pt-4 border-t border-dark-border", className)}>{children}</div>;
}
