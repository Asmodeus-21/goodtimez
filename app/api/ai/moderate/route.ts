import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { moderateContent } from "@/lib/ai";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { contentUrl, contentType } = await request.json();

        if (!contentUrl || !contentType) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Moderate content
        const result = await moderateContent(contentUrl, contentType);

        return NextResponse.json({
            success: true,
            ...result,
        });
    } catch (error: any) {
        console.error("Error moderating content:", error);
        return NextResponse.json(
            { error: "Failed to moderate content" },
            { status: 500 }
        );
    }
}
