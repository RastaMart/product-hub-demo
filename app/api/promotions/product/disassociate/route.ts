import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { promotionKey, productKey, productType } = await request.json();

    // Validate required fields
    if (!promotionKey || !productKey || !productType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Determine which join table to use based on product type
    let result;
    
    switch (productType.toLowerCase()) {
      case 'internet':
        result = await sql`
          DELETE FROM promotion_product_internet
          WHERE promotion_key = ${promotionKey} AND product_key = ${productKey}
          RETURNING *
        `;
        break;
      
      case 'tv':
        result = await sql`
          DELETE FROM promotion_product_tv
          WHERE promotion_key = ${promotionKey} AND product_key = ${productKey}
          RETURNING *
        `;
        break;
      
      case 'voice':
        result = await sql`
          DELETE FROM promotion_product_voice
          WHERE promotion_key = ${promotionKey} AND product_key = ${productKey}
          RETURNING *
        `;
        break;
      
      case 'equipment':
        result = await sql`
          DELETE FROM promotion_product_equipment
          WHERE promotion_key = ${promotionKey} AND product_key = ${productKey}
          RETURNING *
        `;
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
    console.error("Failed to disassociate product:", error);
    return NextResponse.json(
      { error: "Failed to disassociate product" },
      { status: 500 }
    );
  }
}