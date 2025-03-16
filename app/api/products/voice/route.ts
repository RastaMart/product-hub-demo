import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const voiceProducts = await prisma.voiceProduct.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(voiceProducts);
  } catch (error) {
    console.error("Error fetching voice products:", error);
    return NextResponse.json(
      { error: "Failed to fetch voice products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, name, features, price } = body;

    const newProduct = await prisma.voiceProduct.create({
      data: {
        key: key || `voice-${Date.now()}`,
        name,
        features,
        price: parseFloat(price),
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating voice product:", error);
    return NextResponse.json(
      { error: "Failed to create voice product" },
      { status: 500 }
    );
  }
}
