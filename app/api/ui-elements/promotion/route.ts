// import { NextResponse } from "next/server";
// import sql from "@/lib/db";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { promotion_key, element_id } = body;

//     // Validate input
//     if (!promotion_key || !element_id) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Check if promotion exists
//     const promotionExists = await sql`
//       SELECT key FROM promotions WHERE key = ${promotion_key}
//     `;

//     if (promotionExists.length === 0) {
//       return NextResponse.json(
//         { error: "Promotion not found" },
//         { status: 404 }
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
//       SELECT * FROM promotion_ui_elements
//       WHERE promotion_key = ${promotion_key} AND ui_element_id = ${element_id}
//     `;

//     if (associationExists.length > 0) {
//       return NextResponse.json(
//         { error: "Association already exists" },
//         { status: 409 }
//       );
//     }

//     // Create the association
//     await sql`
//       INSERT INTO promotion_ui_elements (promotion_key, ui_element_id)
//       VALUES (${promotion_key}, ${element_id})
//     `;

//     return NextResponse.json({
//       success: true,
//       data: { promotion_key, element_id },
//     });
//   } catch (error) {
//     console.error("Failed to associate UI element with promotion:", error);
//     return NextResponse.json(
//       { error: "Failed to associate UI element with promotion" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: Request) {
//   try {
//     const { promotion_key, element_id } = await request.json();

//     // Validate input
//     if (!promotion_key || !element_id) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Delete the association
//     await sql`
//       DELETE FROM promotion_ui_elements
//       WHERE promotion_key = ${promotion_key} AND ui_element_id = ${element_id}
//     `;

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Failed to remove UI element from promotion:", error);
//     return NextResponse.json(
//       { error: "Failed to remove UI element from promotion" },
//       { status: 500 }
//     );
//   }
// }
