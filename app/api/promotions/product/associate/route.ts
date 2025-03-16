import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { promotionId, productId, productType } = await request.json();

    // Validate required fields
    if (!promotionId || !productId || !productType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Determine which join table to use based on product type
    let result;
    const where = {
      where: {
        promotionId_productId: {
          promotionId,
          productId,
        },
      },
      update: {},
      create: {
        promotionId,
        productId,
      },
    };

    switch (productType.toLowerCase()) {
      case "internet":
        result = await prisma.promotionProductInternet.upsert(where);
        break;

      case "tv":
        result = await prisma.promotionProductTV.upsert(where);
        break;

      case "voice":
        result = await prisma.promotionProductVoice.upsert(where);
        break;

      case "equipment":
        result = await prisma.promotionProductEquipment.upsert(where);
        break;

      default:
        return NextResponse.json(
          { error: "Invalid product type" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Failed to associate product:", error);
    return NextResponse.json(
      { error: "Failed to associate product" },
      { status: 500 }
    );
  }
}
