import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    const products = await sql`SELECT * FROM voice_products ORDER BY key`;
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch voice products:", error);
    return NextResponse.json(
      { error: "Failed to fetch voice products" },
      { status: 500 }
    );
  }
}
