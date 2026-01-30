// Demo Mode Configuration
export const DEMO_MODE = true;

// Demo Users
export const DEMO_USERS = {
    fan: {
        id: "demo_fan_1",
        email: "fan@demo.com",
        username: "DemoFan",
        role: "FAN",
        status: "ACTIVE",
    },
    creator: {
        id: "demo_creator_1",
        email: "creator@demo.com",
        username: "DemoCreator",
        role: "CREATOR",
        status: "ACTIVE",
    },
    brand: {
        id: "demo_brand_1",
        email: "brand@demo.com",
        username: "DemoBrand",
        role: "BRAND",
        status: "ACTIVE",
    },
    admin: {
        id: "demo_admin_1",
        email: "admin@demo.com",
        username: "DemoAdmin",
        role: "ADMIN",
        status: "ACTIVE",
    },
};

// Demo Wallet Data
export const DEMO_WALLETS = {
    demo_fan_1: {
        tokenBalance: 500,
        usdBalance: 100,
    },
    demo_creator_1: {
        tokenBalance: 2500,
        usdBalance: 1250,
    },
};

// Demo Creators
export const DEMO_CREATORS = [
    {
        id: "creator_1",
        displayName: "Luna Star",
        avatar: "⭐",
        subscribers: 12500,
        price: 9.99,
        engagement: 8.5,
        category: "Lifestyle",
    },
    {
        id: "creator_2",
        displayName: "Jade Rose",
        avatar: "🌹",
        subscribers: 8200,
        price: 14.99,
        engagement: 12.3,
        category: "Fashion",
    },
    {
        id: "creator_3",
        displayName: "Scarlett Fox",
        avatar: "🦊",
        subscribers: 15800,
        price: 19.99,
        engagement: 15.7,
        category: "Fitness",
    },
    {
        id: "creator_4",
        displayName: "Violet Dream",
        avatar: "💜",
        subscribers: 6400,
        price: 7.99,
        engagement: 6.2,
        category: "Art",
    },
    {
        id: "creator_5",
        displayName: "Ruby Blaze",
        avatar: "🔥",
        subscribers: 22100,
        price: 24.99,
        engagement: 18.9,
        category: "Lifestyle",
    },
    {
        id: "creator_6",
        displayName: "Amber Sky",
        avatar: "☀️",
        subscribers: 9700,
        price: 12.99,
        engagement: 9.8,
        category: "Travel",
    },
];

// Demo Content
export const DEMO_CONTENT = [
    {
        id: "content_1",
        type: "PHOTO",
        title: "Beach Vibes",
        price: 10,
        unlocks: 847,
        revenue: 8470,
        isPPV: true,
    },
    {
        id: "content_2",
        type: "VIDEO",
        title: "Workout Session",
        price: 25,
        unlocks: 523,
        revenue: 13075,
        isPPV: true,
    },
    {
        id: "content_3",
        type: "PHOTO",
        title: "Sunset Photoshoot",
        price: 15,
        unlocks: 1204,
        revenue: 18060,
        isPPV: true,
    },
    {
        id: "content_4",
        type: "VIDEO",
        title: "Behind the Scenes",
        price: 20,
        unlocks: 689,
        revenue: 13780,
        isPPV: true,
    },
];

// Demo Transactions
export const DEMO_TRANSACTIONS = [
    {
        id: "tx_1",
        type: "SUBSCRIPTION",
        amount: 9.99,
        date: new Date(Date.now() - 2 * 60 * 60 * 1000),
        description: "Monthly subscription",
    },
    {
        id: "tx_2",
        type: "TIP",
        amount: 50,
        date: new Date(Date.now() - 5 * 60 * 60 * 1000),
        description: "Tip from DemoFan",
    },
    {
        id: "tx_3",
        type: "PURCHASE",
        amount: 25,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        description: "PPV content unlock",
    },
];

// Demo Messages
export const DEMO_MESSAGES = [
    {
        id: "msg_1",
        senderId: "demo_fan_1",
        recipientId: "demo_creator_1",
        content: "Love your content! 🔥",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: true,
    },
    {
        id: "msg_2",
        senderId: "demo_creator_1",
        recipientId: "demo_fan_1",
        content: "Thank you so much! 💕",
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        read: true,
    },
    {
        id: "msg_3",
        senderId: "demo_fan_1",
        recipientId: "demo_creator_1",
        content: "When is your next live stream?",
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        read: false,
    },
];

// Demo Stats
export const DEMO_STATS = {
    creator: {
        subscribers: 2847,
        monthlyRevenue: 24847,
        contentPieces: 156,
        engagementRate: 12.4,
        availableBalance: 18234,
        pendingBalance: 3421,
        lifetimeEarnings: 124567,
    },
    fan: {
        activeSubscriptions: 5,
        totalSpent: 847,
        currentStreak: 23,
        rank: "Diamond",
    },
    admin: {
        activeUsers: 2847,
        serverLoad: 42,
        revenueToday: 24847,
        pendingReports: 3,
    },
};

// Demo Whale Tracking
export const DEMO_WHALES = [
    {
        id: "whale_1",
        username: "DiamondFan123",
        totalSpent: 2847,
        lastSeen: "2 min ago",
        isOnline: true,
        tier: "Diamond",
    },
    {
        id: "whale_2",
        username: "PlatinumLover",
        totalSpent: 1523,
        lastSeen: "1 hour ago",
        isOnline: false,
        tier: "Platinum",
    },
    {
        id: "whale_3",
        username: "GoldSupporter",
        totalSpent: 847,
        lastSeen: "5 min ago",
        isOnline: true,
        tier: "Gold",
    },
];

// Demo Revenue Chart Data (30 days)
export const DEMO_REVENUE_CHART = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    revenue: Math.floor(Math.random() * 1000 + 500),
}));

// Demo Churn Predictions
export const DEMO_CHURN_ALERTS = [
    {
        subscriberId: "sub_1",
        username: "User123",
        risk: "high",
        score: 85,
        factors: ["No login in 14 days", "Renewal in 2 days"],
        suggestedAction: "Send exclusive content + 20% discount",
    },
    {
        subscriberId: "sub_2",
        username: "Fan456",
        risk: "medium",
        score: 55,
        factors: ["Low engagement with content"],
        suggestedAction: "Send personalized message",
    },
];

// Helper function to get demo user by role
export function getDemoUser(role: string) {
    const roleKey = role.toLowerCase() as keyof typeof DEMO_USERS;
    return DEMO_USERS[roleKey] || DEMO_USERS.fan;
}

// Helper function to check if in demo mode
export function isDemoMode() {
    return DEMO_MODE || process.env.NEXT_PUBLIC_DEMO_MODE === "true";
}
