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
          INSERT INTO promotion_product_internet (promotion_key, product_key)
          VALUES (${promotionKey}, ${productKey})
          ON CONFLICT (promotion_key, product_key) DO NOTHING
          RETURNING *
        `;
        break;
      
      case 'tv':
        result = await sql`
          INSERT INTO promotion_product_tv (promotion_key, product_key)
          VALUES (${promotionKey}, ${productKey})
          ON CONFLICT (promotion_key, product_key) DO NOTHING
          RETURNING *
        `;
        break;
      
      case 'voice':
        result = await sql`
          INSERT INTO promotion_product_voice (promotion_key, product_key)
          VALUES (${promotionKey}, ${productKey})
          ON CONFLICT (promotion_key, product_key) DO NOTHING
          RETURNING *
        `;
        break;
      
      case 'equipment':
        result = await sql`
          INSERT INTO promotion_product_equipment (promotion_key, product_key)
          VALUES (${promotionKey}, ${productKey})
          ON CONFLICT (promotion_key, product_key) DO NOTHING
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
    console.error("Failed to associate product:", error);
    return NextResponse.json(
      { error: "Failed to associate product" },
      { status: 500 }
    );
  }
}