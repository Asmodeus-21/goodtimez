import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Extract vibrant color from image for adaptive theming
 */
export async function extractVibrantColor(imageUrl: string): Promise<string> {
    // Placeholder - would use a library like node-vibrant in production
    return "#d946ef";
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount);
}

/**
 * Format large numbers (e.g., 1.2K, 3.4M)
 */
export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
}

/**
 * Generate signed URL for content protection
 */
export function generateSignedUrl(
    baseUrl: string,
    userId: string,
    expiresIn: number = 3600
): string {
    const expires = Date.now() + expiresIn * 1000;
    const signature = btoa(`${userId}:${expires}`); // Simplified - use proper crypto in production
    return `${baseUrl}?sig=${signature}&exp=${expires}&uid=${userId}`;
}

/**
 * Validate age (18+)
 */
export function isValidAge(birthDate: Date): boolean {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
    }

    return age >= 18;
}

/**
 * Detect VPN/Proxy (simplified)
 */
export async function detectVPN(ip: string): Promise<boolean> {
    // Placeholder - would integrate with VPN detection API
    return false;
}

/**
 * Get geolocation from IP
 */
export async function getGeolocation(ip: string): Promise<{
    country: string;
    state?: string;
    city?: string;
}> {
    // Placeholder - would integrate with IP geolocation API
    return { country: "US", state: "CA", city: "Los Angeles" };
}

/**
 * Haptic feedback (mobile)
 */
export function triggerHaptic(type: "light" | "medium" | "heavy" = "medium") {
    if ("vibrate" in navigator) {
        const duration = type === "light" ? 10 : type === "medium" ? 20 : 30;
        navigator.vibrate(duration);
    }
}

/**
 * Calculate commission
 */
export function calculateCommission(
    amount: number,
    rate: number,
    agencyRate?: number
): {
    platformFee: number;
    agencyFee: number;
    creatorEarnings: number;
} {
    const platformFee = amount * rate;
    const agencyFee = agencyRate ? (amount - platformFee) * agencyRate : 0;
    const creatorEarnings = amount - platformFee - agencyFee;

    return {
        platformFee,
        agencyFee,
        creatorEarnings,
    };
}

/**
 * Time ago formatter
 */
export function timeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";

    return "just now";
}
