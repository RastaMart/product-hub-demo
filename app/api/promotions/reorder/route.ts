import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { promotions } = await request.json();

    // Update promotion orders in a transaction
    await prisma.$transaction(
      promotions.map((promotion: { key: string }, index: number) =>
        prisma.promotion.update({
          where: { key: promotion.key },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({
      message: "Promotion order updated successfully",
    });
  } catch (error) {
    console.error("Error reordering promotions:", error);
    return NextResponse.json(
      { error: "Failed to reorder promotions" },
      { status: 500 }
    );
  }
}
