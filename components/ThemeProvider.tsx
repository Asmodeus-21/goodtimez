"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CreatorTheme {
    // Identity
    brandName: string;
    logoUrl?: string;
    faviconUrl?: string;

    // Colors
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;

    // Typography
    headingFont: string;
    bodyFont: string;

    // Messaging
    notificationName: string;
    chatHeaderTitle: string;

    // Feature Flags
    hideExplore: boolean;
    hideSearch: boolean;
    hideSuggestions: boolean;
}

const ThemeContext = createContext<CreatorTheme | null>(null);

export function ThemeProvider({
    children,
    creatorId
}: {
    children: ReactNode;
    creatorId?: string;
}) {
    const [theme, setTheme] = useState<CreatorTheme | null>(null);

    useEffect(() => {
        if (creatorId) {
            // Fetch creator's brand configuration
            fetch(`/api/creators/${creatorId}/brand`)
                .then(res => res.json())
                .then(data => {
                    setTheme(data);
                    applyTheme(data);
                })
                .catch(() => {
                    // Fallback to default theme
                    const defaultTheme: CreatorTheme = {
                        brandName: "Goodtimez",
                        primaryColor: "#8b5cf6",
                        secondaryColor: "#ec4899",
                        accentColor: "#06b6d4",
                        backgroundColor: "#0a0a0f",
                        textColor: "#ffffff",
                        headingFont: "Outfit",
                        bodyFont: "Inter",
                        notificationName: "Goodtimez",
                        chatHeaderTitle: "Chat",
                        hideExplore: false,
                        hideSearch: false,
                        hideSuggestions: false,
                    };
                    setTheme(defaultTheme);
                    applyTheme(defaultTheme);
                });
        }
    }, [creatorId]);

    const applyTheme = (themeData: CreatorTheme) => {
        // Apply CSS variables
        const root = document.documentElement;
        root.style.setProperty('--color-primary', themeData.primaryColor);
        root.style.setProperty('--color-secondary', themeData.secondaryColor);
        root.style.setProperty('--color-accent', themeData.accentColor);
        root.style.setProperty('--color-bg', themeData.backgroundColor);
        root.style.setProperty('--color-text', themeData.textColor);
        root.style.setProperty('--font-heading', themeData.headingFont);
        root.style.setProperty('--font-body', themeData.bodyFont);

        // Update favicon if provided
        if (themeData.faviconUrl) {
            const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
            if (favicon) {
                favicon.href = themeData.faviconUrl;
            }
        }

        // Update page title
        document.title = themeData.brandName;
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useCreatorTheme = () => {
    const context = useContext(ThemeContext);
    return context;
};
