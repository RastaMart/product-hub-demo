import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Associate or disassociate a product with a promotion
export async function POST(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;
    const { productKey, productType, associate } = await request.json();

    // Find the promotion
    const promotion = await prisma.promotion.findUnique({
      where: { key },
    });

    if (!promotion) {
      return NextResponse.json(
        { error: "Promotion not found" },
        { status: 404 }
      );
    }

    if (associate) {
      // Associate product with promotion
      if (productType === "internet") {
        const product = await prisma.internetProduct.findUnique({
          where: { key: productKey },
        });
        if (!product) {
          return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
          );
        }

        // Check if already associated
        const existing = await prisma.promotionProductInternet.findFirst({
          where: {
            promotionId: promotion.id,
            productId: product.id,
          },
        });

        if (!existing) {
          await prisma.promotionProductInternet.create({
            data: {
              promotionId: promotion.id,
              productId: product.id,
            },
          });
        }
      } else if (productType === "tv") {
        const product = await prisma.tVProduct.findUnique({
          where: { key: productKey },
        });
        if (!product) {
          return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
          );
        }

        // Check if already associated
        const existing = await prisma.promotionProductTV.findFirst({
          where: {
            promotionId: promotion.id,
            productId: product.id,
          },
        });

        if (!existing) {
          await prisma.promotionProductTV.create({
            data: {
              promotionId: promotion.id,
              productId: product.id,
            },
          });
        }
      } else if (productType === "voice") {
        const product = await prisma.voiceProduct.findUnique({
          where: { key: productKey },
        });
        if (!product) {
          return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
          );
        }

        // Check if already associated
        const existing = await prisma.promotionProductVoice.findFirst({
          where: {
            promotionId: promotion.id,
            productId: product.id,
          },
        });

        if (!existing) {
          await prisma.promotionProductVoice.create({
            data: {
              promotionId: promotion.id,
              productId: product.id,
            },
          });
        }
      } else if (productType === "equipment") {
        const product = await prisma.equipment.findUnique({
          where: { key: productKey },
        });
        if (!product) {
          return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
          );
        }

        // Check if already associated
        const existing = await prisma.promotionProductEquipment.findFirst({
          where: {
            promotionId: promotion.id,
            productId: product.id,
          },
        });

        if (!existing) {
          await prisma.promotionProductEquipment.create({
            data: {
              promotionId: promotion.id,
              productId: product.id,
            },
          });
        }
      } else {
        return NextResponse.json(
          { error: "Invalid product type" },
          { status: 400 }
        );
      }
    } else {
      // Disassociate product from promotion
      if (productType === "internet") {
        const product = await prisma.internetProduct.findUnique({
          where: { key: productKey },
        });
        if (product) {
          await prisma.promotionProductInternet.deleteMany({
            where: {
              promotionId: promotion.id,
              productId: product.id,
            },
          });
        }
      } else if (productType === "tv") {
        const product = await prisma.tVProduct.findUnique({
          where: { key: productKey },
        });
        if (product) {
          await prisma.promotionProductTV.deleteMany({
            where: {
              promotionId: promotion.id,
              productId: product.id,
            },
          });
        }
      } else if (productType === "voice") {
        const product = await prisma.voiceProduct.findUnique({
          where: { key: productKey },
        });
        if (product) {
          await prisma.promotionProductVoice.deleteMany({
            where: {
              promotionId: promotion.id,
              productId: product.id,
            },
          });
        }
      } else if (productType === "equipment") {
        const product = await prisma.equipment.findUnique({
          where: { key: productKey },
        });
        if (product) {
          await prisma.promotionProductEquipment.deleteMany({
            where: {
              promotionId: promotion.id,
              productId: product.id,
            },
          });
        }
      }
    }

    return NextResponse.json({
      message: associate
        ? "Product associated successfully"
        : "Product disassociated successfully",
    });
  } catch (error) {
    console.error("Error managing product association:", error);
    return NextResponse.json(
      { error: "Failed to manage product association" },
      { status: 500 }
    );
  }
}
