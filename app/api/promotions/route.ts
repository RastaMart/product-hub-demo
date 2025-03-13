import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    // Get all promotions with their relationships
    const promotions = await sql`
      SELECT p.*, 
        (SELECT json_agg(pm.market_key) FROM promotion_market pm WHERE pm.promotion_key = p.key) as markets,
        (
          SELECT json_agg(
            json_build_object(
              'productKey', ppi.product_key, 
              'productType', 'internet',
              'ui_elements', ppi.ui_elements
            )
          ) 
          FROM promotion_product_internet ppi 
          WHERE ppi.promotion_key = p.key
        ) as internet_products,
        (
          SELECT json_agg(
            json_build_object(
              'productKey', ppt.product_key, 
              'productType', 'tv',
              'ui_elements', ppt.ui_elements
            )
          ) 
          FROM promotion_product_tv ppt 
          WHERE ppt.promotion_key = p.key
        ) as tv_products,
        (
          SELECT json_agg(
            json_build_object(
              'productKey', ppv.product_key, 
              'productType', 'voice',
              'ui_elements', ppv.ui_elements
            )
          ) 
          FROM promotion_product_voice ppv 
          WHERE ppv.promotion_key = p.key
        ) as voice_products,
        (
          SELECT json_agg(
            json_build_object(
              'productKey', ppe.product_key, 
              'productType', 'equipment',
              'ui_elements', ppe.ui_elements
            )
          ) 
          FROM promotion_product_equipment ppe 
          WHERE ppe.promotion_key = p.key
        ) as equipment_products
      FROM promotions p
      ORDER BY p.display_order ASC
    `;

    // Combine all product types into a single products array
    const formattedPromotions = promotions.map(p => {
      const products = [
        ...(p.internet_products || []),
        ...(p.tv_products || []),
        ...(p.voice_products || []),
        ...(p.equipment_products || [])
      ];

      return {
        ...p,
        products: products.filter(Boolean), // Remove any null entries
        // Remove the individual product type arrays
        internet_products: undefined,
        tv_products: undefined,
        voice_products: undefined,
        equipment_products: undefined
      };
    });

    return NextResponse.json(formattedPromotions);
  } catch (error) {
    console.error("Failed to fetch promotions:", error);
    return NextResponse.json(
      { error: "Failed to fetch promotions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      startDate,
      endDate,
      triggers,
      products,
      markets,
      ui_elements,
    } = body;

    // Validate required fields
    if (!name || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate a unique key based on name and date
    const key = `${name.replace(/[^a-zA-Z0-9]/g, "")}-${new Date(
      startDate
    ).getFullYear()}`;

    // Get the maximum display_order and add 1 for the new promotion
    const maxOrderResult = await sql`
      SELECT COALESCE(MAX(display_order), -1) as max_order FROM promotions
    `;
    const display_order = (maxOrderResult[0]?.max_order || -1) + 1;

    // Insert new promotion
    const result = await sql`
      INSERT INTO promotions (
        key,
        name,
        start_date,
        end_date,
        triggers,
        ui_elements,
        display_order
      )
      VALUES (
        ${key},
        ${name},
        ${startDate},
        ${endDate},
        ${triggers || []},
        ${ui_elements || []},
        ${display_order}
      )
      RETURNING *
    `;

    // Insert market associations
    if (markets && markets.length > 0) {
      for (const marketKey of markets) {
        await sql`
          INSERT INTO promotion_market (promotion_key, market_key)
          VALUES (${key}, ${marketKey})
        `;
      }
    }

    // Insert product associations
    if (products && products.length > 0) {
      for (const product of products) {
        switch (product.productType) {
          case 'internet':
            await sql`
              INSERT INTO promotion_product_internet (promotion_key, product_key, ui_elements)
              VALUES (${key}, ${product.productKey}, ${product.ui_elements || []})
            `;
            break;
          case 'tv':
            await sql`
              INSERT INTO promotion_product_tv (promotion_key, product_key, ui_elements)
              VALUES (${key}, ${product.productKey}, ${product.ui_elements || []})
            `;
            break;
          case 'voice':
            await sql`
              INSERT INTO promotion_product_voice (promotion_key, product_key, ui_elements)
              VALUES (${key}, ${product.productKey}, ${product.ui_elements || []})
            `;
            break;
          case 'equipment':
            await sql`
              INSERT INTO promotion_product_equipment (promotion_key, product_key, ui_elements)
              VALUES (${key}, ${product.productKey}, ${product.ui_elements || []})
            `;
            break;
        }
      }
    }

    // Fetch the complete promotion with associations
    const completePromotion = await sql`
      SELECT p.*, 
        (SELECT json_agg(pm.market_key) FROM promotion_market pm WHERE pm.promotion_key = p.key) as markets,
        (
          SELECT json_agg(json_build_object('productKey', ppi.product_key, 'productType', 'internet', 'ui_elements', ppi.ui_elements)) 
          FROM promotion_product_internet ppi 
          WHERE ppi.promotion_key = p.key
        ) as products
      FROM promotions p
      WHERE p.key = ${key}
    `;

    return NextResponse.json({
      success: true,
      data: completePromotion[0],
    });
  } catch (error) {
    console.error("Failed to create promotion:", error);
    return NextResponse.json(
      { error: "Failed to create promotion" },
      { status: 500 }
    );
  }
}
