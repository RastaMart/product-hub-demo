import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { promotionKey, marketKey } = await request.json();

    // Validate required fields
    if (!promotionKey || !marketKey) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await sql`
      DELETE FROM promotion_market
      WHERE promotion_key = ${promotionKey} AND market_key = ${marketKey}
      RETURNING *
    `;

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