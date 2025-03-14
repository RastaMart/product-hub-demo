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
      INSERT INTO promotion_market (promotion_key, market_key)
      VALUES (${promotionKey}, ${marketKey})
      ON CONFLICT (promotion_key, market_key) DO NOTHING
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Failed to associate market:", error);
    return NextResponse.json(
      { error: "Failed to associate market" },
      { status: 500 }
    );
  }
}