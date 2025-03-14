import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    const uiElements = await sql`
      SELECT e.*, t.type as element_type_category
      FROM ui_elements e
      JOIN ui_element_types t ON e.element_type = t.key
      ORDER BY e.id DESC
    `;
    return Response.json(uiElements);
  } catch (error) {
    console.error("Failed to load UI elements:", error);
    return Response.json(
      { error: "Failed to load UI elements" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      key,
      element_type,
      txt_text,
      img_desktopImgUrl,
      img_mobileImgUrl,
      img_alt,
    } = body;

    // Validate input
    if (!element_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if key exists in ui_element_types
    const typeExists = await sql`
      SELECT key, type FROM ui_element_types WHERE key = ${key}
    `;

    if (typeExists.length === 0) {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });
    }

    const elementTypeType = element_type;

    // Insert new UI element
    const result = await sql`
      INSERT INTO ui_elements (
        element_type, 
        element_type_type, 
        txt_text, 
        img_desktopImgUrl, 
        img_mobileImgUrl, 
        img_alt
      )
      VALUES (
        ${key},
        ${element_type},
        ${txt_text || null},
        ${img_desktopImgUrl || null},
        ${img_mobileImgUrl || null},
        ${img_alt || null}
      )
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      data: {
        id: result[0].id,
        element_type: key,
        element_type_type: elementTypeType,
        txt_text,
        img_desktopImgUrl,
        img_mobileImgUrl,
        img_alt,
      },
    });
  } catch (error) {
    console.error("Failed to create UI element:", error);
    return NextResponse.json(
      { error: "Failed to create UI element" },
      { status: 500 }
    );
  }
}
