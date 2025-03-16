import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;

    // Find the UI element by key
    const element = await prisma.uIElementKeyType.findUnique({
      where: { id },
    });

    if (!element) {
      return NextResponse.json(
        { error: "UI element key type not found" },
        { status: 404 }
      );
    }

    // Delete the UI element (associations will be automatically deleted due to cascade delete)
    await prisma.uIElementKeyType.delete({
      where: { id: element.id },
    });

    return NextResponse.json(
      { message: "UI element key type deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting UI element key type:", error);
    return NextResponse.json(
      { error: "Failed to delete UI element key type" },
      { status: 500 }
    );
  }
}
