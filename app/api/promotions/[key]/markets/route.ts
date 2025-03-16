import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Associate or disassociate a market with a promotion
export async function POST(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;
    const { marketKey, associate } = await request.json();

    // Find the promotion
    const promotion = await prisma.promotion.findUnique({
      where: { key },
    });

    if (!promotion) {
      return NextResponse.json(
        { error: "Promotion not found" },
        { status: 404 }
      );
    }

    // Find the market
    const market = await prisma.market.findUnique({
      where: { key: marketKey },
    });

    if (!market) {
      return NextResponse.json({ error: "Market not found" }, { status: 404 });
    }

    if (associate) {
      // Check if already associated
      const existing = await prisma.promotionMarket.findFirst({
        where: {
          promotionId: promotion.id,
          marketId: market.id,
        },
      });

      if (!existing) {
        // Associate market with promotion
        await prisma.promotionMarket.create({
          data: {
            promotionId: promotion.id,
            marketId: market.id,
          },
        });
      }
    } else {
      // Disassociate market from promotion
      await prisma.promotionMarket.deleteMany({
        where: {
          promotionId: promotion.id,
          marketId: market.id,
        },
      });
    }

    return NextResponse.json({
      message: associate
        ? "Market associated successfully"
        : "Market disassociated successfully",
    });
  } catch (error) {
    console.error("Error managing market association:", error);
    return NextResponse.json(
      { error: "Failed to manage market association" },
      { status: 500 }
    );
  }
}
