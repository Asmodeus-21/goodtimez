import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Goodtimez - Premium Creator Platform",
    description: "The ultimate platform for creators and fans to connect",
    keywords: ["creators", "content", "premium", "platform"],
    authors: [{ name: "Goodtimez" }],
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 5,
        userScalable: true,
        viewportFit: "cover", // For notched devices
    },
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    ],
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Goodtimez",
    },
    formatDetection: {
        telephone: false, // Prevent auto-linking phone numbers
    },
    robots: "noindex, nofollow", // Will change for production
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${outfit.variable} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
