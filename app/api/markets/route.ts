import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const markets = await prisma.market.findMany({
      orderBy: {
        key: "asc",
      },
    });

    return NextResponse.json(markets);
  } catch (error) {
    console.error("Error fetching markets:", error);
    return NextResponse.json(
      { error: "Failed to fetch markets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, label, csgCode } = body;

    const newMarket = await prisma.market.create({
      data: {
        key: key || `market-${Date.now()}`,
        label,
        csgCode,
      },
    });

    return NextResponse.json(newMarket, { status: 201 });
  } catch (error) {
    console.error("Error creating market:", error);
    return NextResponse.json(
      { error: "Failed to create market" },
      { status: 500 }
    );
  }
}
