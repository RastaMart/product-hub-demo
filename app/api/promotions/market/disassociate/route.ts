import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { promotionId, marketId } = await request.json();

    // Validate required fields
    if (!promotionId || !marketId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Use Prisma to create the association
    const result = await prisma.promotionMarket.delete({
      where: {
        promotionId_marketId: {
          promotionId,
          marketId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Failed to disassociate market:", error);
    return NextResponse.json(
      { error: "Failed to disassociate market" },
      { status: 500 }
    );
  }
}
