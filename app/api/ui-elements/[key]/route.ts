import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;

    // Check if the UI element type exists
    const existing = await sql`
      SELECT key FROM ui_element_types WHERE key = ${key}
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "UI element type not found" },
        { status: 404 }
      );
    }

    // Delete the UI element type (cascades to elements using this type)
    await sql`
      DELETE FROM ui_element_types
      WHERE key = ${key}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete UI element type:", error);
    return NextResponse.json(
      { error: "Failed to delete UI element type" },
      { status: 500 }
    );
  }
}
