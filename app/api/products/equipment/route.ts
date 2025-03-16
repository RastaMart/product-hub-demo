import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const equipment = await prisma.equipment.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(equipment);
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return NextResponse.json(
      { error: "Failed to fetch equipment" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, name, type, price } = body;

    const newEquipment = await prisma.equipment.create({
      data: {
        key: key || `equipment-${Date.now()}`,
        name,
        type,
        price: parseFloat(price),
      },
    });

    return NextResponse.json(newEquipment, { status: 201 });
  } catch (error) {
    console.error("Error creating equipment:", error);
    return NextResponse.json(
      { error: "Failed to create equipment" },
      { status: 500 }
    );
  }
}
