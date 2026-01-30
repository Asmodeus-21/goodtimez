"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to demo mode for easy access
        router.push("/demo");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-dark-muted">Loading Goodtimez Demo...</p>
            </div>
        </div>
    );
}
