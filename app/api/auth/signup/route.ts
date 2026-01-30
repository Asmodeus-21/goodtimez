import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { isValidAge } from "@/lib/utils";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, username, password, birthDate, role } = body;

        // Validation
        if (!email || !username || !password || !birthDate || !role) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Age validation
        const birthDateObj = new Date(birthDate);
        if (!isValidAge(birthDateObj)) {
            return NextResponse.json(
                { error: "You must be 18 or older to sign up" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email or username already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user with role-specific profile
        const user = await prisma.user.create({
            data: {
                email,
                username,
                passwordHash,
                role,
                status: "PENDING_VERIFICATION",
                ...(role === "FAN" && {
                    fanProfile: {
                        create: {
                            displayName: username,
                        },
                    },
                }),
                ...(role === "CREATOR" && {
                    creatorProfile: {
                        create: {
                            displayName: username,
                        },
                    },
                }),
                ...(role === "BRAND" && {
                    brandProfile: {
                        create: {
                            companyName: username,
                        },
                    },
                }),
            },
        });

        // Create wallet
        await prisma.wallet.create({
            data: {
                userId: user.id,
            },
        });

        return NextResponse.json(
            { message: "Account created successfully", userId: user.id },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Failed to create account" },
            { status: 500 }
        );
    }
}
