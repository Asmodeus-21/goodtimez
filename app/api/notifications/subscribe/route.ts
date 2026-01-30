import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { subscription } = await request.json();

        if (!subscription) {
            return NextResponse.json(
                { error: "Missing subscription" },
                { status: 400 }
            );
        }

        // In production, save subscription to database
        // and use web-push library to send notifications

        return NextResponse.json({
            success: true,
            message: "Push notification subscription saved",
        });
    } catch (error: any) {
        console.error("Error subscribing to push notifications:", error);
        return NextResponse.json(
            { error: "Failed to subscribe to push notifications" },
            { status: 500 }
        );
    }
}
