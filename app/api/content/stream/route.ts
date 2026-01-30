import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { verifySignedUrl, checkContentAccess, trackContentView } from "@/lib/content-protection";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const searchParams = request.nextUrl.searchParams;
        const contentId = searchParams.get("id");
        const userId = searchParams.get("user");
        const expiresAt = searchParams.get("expires");
        const signature = searchParams.get("signature");

        if (!contentId || !userId || !expiresAt || !signature) {
            return NextResponse.json(
                { error: "Invalid parameters" },
                { status: 400 }
            );
        }

        // Verify user matches session
        if (session.user.id !== userId) {
            return NextResponse.json(
                { error: "User mismatch" },
                { status: 403 }
            );
        }

        // Verify signed URL
        if (!verifySignedUrl(contentId, userId, expiresAt, signature)) {
            return NextResponse.json(
                { error: "Invalid or expired URL" },
                { status: 403 }
            );
        }

        // Check content access
        const { hasAccess, reason } = await checkContentAccess(userId, contentId, prisma);

        if (!hasAccess) {
            return NextResponse.json(
                { error: reason || "Access denied" },
                { status: 403 }
            );
        }

        // Get content
        const content = await prisma.content.findUnique({
            where: { id: contentId },
        });

        if (!content) {
            return NextResponse.json(
                { error: "Content not found" },
                { status: 404 }
            );
        }

        // Track view
        await trackContentView(userId, contentId, prisma);

        // In production, this would stream from S3/CDN
        // For now, return the URL
        return NextResponse.json({
            url: content.originalFileUrl,
            watermark: content.watermarkEnabled,
            drm: content.drmEnabled,
        });

    } catch (error: any) {
        console.error("Content stream error:", error);
        return NextResponse.json(
            { error: "Failed to stream content" },
            { status: 500 }
        );
    }
}
