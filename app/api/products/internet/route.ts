import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const internetProducts = await prisma.internetProduct.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(internetProducts);
  } catch (error) {
    console.error("Error fetching internet products:", error);
    return NextResponse.json(
      { error: "Failed to fetch internet products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, name, speed, price } = body;

    const newProduct = await prisma.internetProduct.create({
      data: {
        key: key || `internet-${Date.now()}`,
        name,
        speed,
        price: parseFloat(price),
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating internet product:", error);
    return NextResponse.json(
      { error: "Failed to create internet product" },
      { status: 500 }
    );
  }
}
