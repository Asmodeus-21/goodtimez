import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateKYCLink } from "@/lib/compliance";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || session.user.role !== "CREATOR") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Generate KYC verification link
        const kycLink = await generateKYCLink(session.user.id);

        // Create KYC document record
        await prisma.kYCDocument.create({
            data: {
                userId: session.user.id,
                documentType: "GOVERNMENT_ID",
                status: "PENDING",
            },
        });

        return NextResponse.json({
            success: true,
            verificationUrl: kycLink,
            message: "Please complete identity verification",
        });
    } catch (error: any) {
        console.error("Error initiating KYC:", error);
        return NextResponse.json(
            { error: "Failed to initiate KYC verification" },
            { status: 500 }
        );
    }
}
