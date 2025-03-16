import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const uiElementTypes = await prisma.uIElementKeyType.findMany({
      orderBy: {
        key: "asc",
      },
    });
    return Response.json(uiElementTypes);
  } catch (error) {
    console.error("Failed to load UI element types:", error);
    return Response.json(
      { error: "Failed to load UI element types" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, description, kind } = body;
    // Validate input
    if (!key || !description || !kind) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if type is valid
    if (!["text", "image"].includes(kind)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "text" or "image"' },
        { status: 400 }
      );
    }

    // Check if key already exists
    const existing = await prisma.uIElementKeyType.findUnique({
      where: { key },
    });

    if (existing) {
      return NextResponse.json(
        { error: "UI element with this key already exists" },
        { status: 409 }
      );
    }

    // Create new UI element type
    const newElementType = await prisma.uIElementKeyType.create({
      data: {
        key,
        description,
        kind,
      },
    });

    return NextResponse.json({
      success: true,
      data: newElementType,
    });
  } catch (error) {
    console.error("Failed to create UI element type:", error);
    return NextResponse.json(
      { error: "Failed to create UI element type" },
      { status: 500 }
    );
  }
}
