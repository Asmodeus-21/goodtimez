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
    viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    themeColor: "#0a0a0f",
    robots: "noindex, nofollow", // Will change for production
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
