import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ creatorId: string }> }
) {
  try {
    const { creatorId } = await params;

    // In demo mode, return mock brand data
    const mockBrand = {
      brandName: "Luna Star Official",
      logoUrl: null,
      faviconUrl: null,
      primaryColor: "#ec4899",
      secondaryColor: "#8b5cf6",
      accentColor: "#06b6d4",
      backgroundColor: "#0a0a0f",
      textColor: "#ffffff",
      headingFont: "Outfit",
      bodyFont: "Inter",
      notificationName: "Luna Star",
      chatHeaderTitle: "Chat with Luna Star",
      hideExplore: true,
      hideSearch: true,
      hideSuggestions: true,
    };

    return NextResponse.json(mockBrand);

    // Production code (when database is ready):
    /*
    const brand = await prisma.creatorBrand.findUnique({
      where: { creatorId },
    });

    if (!brand) {
      return NextResponse.json(
        { error: "Brand not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      brandName: brand.brandName,
      logoUrl: brand.logoUrl,
      faviconUrl: brand.faviconUrl,
      primaryColor: brand.primaryColor,
      secondaryColor: brand.secondaryColor,
      accentColor: brand.accentColor,
      backgroundColor: brand.backgroundColor,
      textColor: brand.textColor,
      headingFont: brand.headingFont,
      bodyFont: brand.bodyFont,
      notificationName: brand.notificationName,
      chatHeaderTitle: brand.chatHeaderTitle,
      hideExplore: brand.hideExplore,
      hideSearch: brand.hideSearch,
      hideSuggestions: brand.hideSuggestions,
    });
    */
  } catch (error: any) {
    console.error("Error fetching creator brand:", error);
    return NextResponse.json(
      { error: "Failed to fetch brand" },
      { status: 500 }
    );
  }
}
