import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tvProducts = await prisma.tVProduct.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(tvProducts);
  } catch (error) {
    console.error("Error fetching TV products:", error);
    return NextResponse.json(
      { error: "Failed to fetch TV products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, name, channels, price } = body;

    const newProduct = await prisma.tVProduct.create({
      data: {
        key: key || `tv-${Date.now()}`,
        name,
        channels,
        price: parseFloat(price),
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating TV product:", error);
    return NextResponse.json(
      { error: "Failed to create TV product" },
      { status: 500 }
    );
  }
}
