import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, type, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-dark-text mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "w-full px-4 py-3 rounded-xl bg-dark-elevated border border-dark-border",
                            "text-dark-text placeholder:text-dark-muted",
                            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
                            "transition-all duration-300",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            icon && "pl-10",
                            error && "border-red-500 focus:ring-red-500",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
