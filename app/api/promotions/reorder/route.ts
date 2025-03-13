import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { promotions } = body;

    if (!promotions || !Array.isArray(promotions)) {
      return NextResponse.json(
        { error: "Promotions array is required" },
        { status: 400 }
      );
    }

    // Update each promotion's order in a transaction
      for (let i = 0; i < promotions.length; i++) {
        await sql`
          UPDATE promotions
          SET display_order = ${i}
          WHERE key = ${promotions[i].key}
        `;
      }

    return NextResponse.json({
      success: true,
      message: "Promotion order updated successfully"
    });
  } catch (error) {
    console.error("Failed to update promotion order:", error);
    return NextResponse.json(
      { error: "Failed to update promotion order" },
      { status: 500 }
    );
  }
}
