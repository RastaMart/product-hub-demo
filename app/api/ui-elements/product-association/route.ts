// import { NextResponse } from "next/server";
// import sql from "@/lib/db";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { product_association_id, product_association_table, element_id } =
//       body;

//     // Validate input
//     if (!product_association_id || !product_association_table || !element_id) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Valid product association tables
//     const validTables = [
//       "promotion_product_internet",
//       "promotion_product_tv",
//       "promotion_product_voice",
//       "promotion_product_equipment",
//     ];

//     if (!validTables.includes(product_association_table)) {
//       return NextResponse.json(
//         { error: "Invalid product association table" },
//         { status: 400 }
//       );
//     }

//     // Check if UI element exists
//     const elementExists = await sql`
//       SELECT id FROM ui_elements WHERE id = ${element_id}
//     `;

//     if (elementExists.length === 0) {
//       return NextResponse.json(
//         { error: "UI element not found" },
//         { status: 404 }
//       );
//     }

//     // Check if association already exists
//     const associationExists = await sql`
//       SELECT * FROM product_association_ui_elements
//       WHERE product_association_id = ${product_association_id}
//       AND product_association_table = ${product_association_table}
//       AND ui_element_id = ${element_id}
//     `;

//     if (associationExists.length > 0) {
//       return NextResponse.json(
//         { error: "Association already exists" },
//         { status: 409 }
//       );
//     }

//     // Create the association
//     await sql`
//       INSERT INTO product_association_ui_elements (
//         product_association_id,
//         product_association_table,
//         ui_element_id
//       )
//       VALUES (
//         ${product_association_id},
//         ${product_association_table},
//         ${element_id}
//       )
//     `;

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Failed to associate UI element with product:", error);
//     return NextResponse.json(
//       { error: "Failed to associate UI element with product" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: Request) {
//   try {
//     const { product_association_id, product_association_table, element_id } =
//       await request.json();

//     // Validate input
//     if (!product_association_id || !product_association_table || !element_id) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Delete the association
//     await sql`
//       DELETE FROM product_association_ui_elements
//       WHERE product_association_id = ${product_association_id}
//       AND product_association_table = ${product_association_table}
//       AND ui_element_id = ${element_id}
//     `;

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Failed to remove UI element from product:", error);
//     return NextResponse.json(
//       { error: "Failed to remove UI element from product" },
//       { status: 500 }
//     );
//   }
// }
