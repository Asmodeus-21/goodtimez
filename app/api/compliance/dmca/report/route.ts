import { NextRequest, NextResponse } from "next/server";
import { processDMCATakedown } from "@/lib/compliance";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const { contentId, reportedUrl, reportedBy, description } = await request.json();

        if (!contentId || !reportedUrl || !reportedBy) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Process DMCA takedown
        const result = await processDMCATakedown(
            contentId,
            reportedUrl,
            reportedBy,
            prisma
        );

        // Send notification to creator
        const content = await prisma.content.findUnique({
            where: { id: contentId },
            include: { creator: { include: { user: true } } },
        });

        if (content) {
            await prisma.notification.create({
                data: {
                    userId: content.creator.userId,
                    type: "DMCA_NOTICE",
                    title: "DMCA Takedown Notice",
                    message: `Your content has been temporarily disabled due to a copyright claim. Takedown ID: ${result.takedownId}`,
                    link: `/compliance/dmca/${result.takedownId}`,
                },
            });
        }

        return NextResponse.json({
            success: true,
            takedownId: result.takedownId,
            message: "DMCA takedown processed. Content has been disabled.",
        });
    } catch (error: any) {
        console.error("Error processing DMCA takedown:", error);
        return NextResponse.json(
            { error: "Failed to process DMCA takedown" },
            { status: 500 }
        );
    }
}
