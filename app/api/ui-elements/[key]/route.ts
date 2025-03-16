import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;

    // Find the UI element by key
    const element = await prisma.uIElement.findUnique({
      where: { key },
    });

    if (!element) {
      return NextResponse.json(
        { error: "UI element not found" },
        { status: 404 }
      );
    }

    // Delete the UI element (associations will be automatically deleted due to cascade delete)
    await prisma.uIElement.delete({
      where: { id: element.id },
    });

    return NextResponse.json(
      { message: "UI element deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting UI element:", error);
    return NextResponse.json(
      { error: "Failed to delete UI element" },
      { status: 500 }
    );
  }
}
