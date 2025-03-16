import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

// GET all promotions
export async function GET(request: NextRequest) {
  try {
    // Get all promotions with their related data
    const promotions = await prisma.promotion.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        internetProducts: {
          include: {
            product: true,
            uiElements: {
              include: {
                uiElement: true,
              },
            },
          },
        },
        tvProducts: {
          include: {
            product: true,
            uiElements: {
              include: {
                uiElement: true,
              },
            },
          },
        },
        voiceProducts: {
          include: {
            product: true,
            uiElements: {
              include: {
                uiElement: true,
              },
            },
          },
        },
        equipmentProducts: {
          include: {
            product: true,
            uiElements: {
              include: {
                uiElement: true,
              },
            },
          },
        },
        markets: {
          include: {
            market: true,
          },
        },
        triggers: true,
        uiElements: true,
      },
    });

    // Transform the data to match the expected format
    const formattedPromotions = promotions.map((promotion) => {
      // Collect all products from different categories
      const products = [
        ...promotion.internetProducts.map((p) => ({
          id: p.id,
          productId: p.product.id,
          productKey: p.product.key,
          productType: "internet",
          uiElements: p.uiElements.map((ue) => ue.uiElement),
        })),
        ...promotion.tvProducts.map((p) => ({
          id: p.id,
          productId: p.product.id,
          productKey: p.product.key,
          productType: "tv",
          uiElements: p.uiElements.map((ue) => ue.uiElement),
        })),
        ...promotion.voiceProducts.map((p) => ({
          id: p.id,
          productId: p.product.id,
          productKey: p.product.key,
          productType: "voice",
          uiElements: p.uiElements.map((ue) => ue.uiElement),
        })),
        ...promotion.equipmentProducts.map((p) => ({
          id: p.id,
          productId: p.product.id,
          productKey: p.product.key,
          productType: "equipment",
          uiElements: p.uiElements.map((ue) => ue.uiElement),
        })),
      ];

      return {
        id: promotion.id,
        key: promotion.key,
        name: promotion.name,
        start_date: promotion.startDate.toISOString(),
        end_date: promotion.endDate?.toISOString() || null,
        triggers: promotion.triggers.map((t) => ({
          type: t.type,
          value: t.value,
        })),
        products: products,
        markets: promotion.markets.map((m) => m.market.key),
        uiElements: promotion.uiElements,
      };
    });

    return NextResponse.json(formattedPromotions);
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json(
      { error: "Failed to fetch promotions" },
      { status: 500 }
    );
  }
}

// POST a new promotion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      startDate,
      endDate,
      triggers = [],
      products = [],
      markets = [],
    } = body;

    // Get the highest order to place this at the end
    const maxOrderPromo = await prisma.promotion.findFirst({
      orderBy: {
        order: "desc",
      },
    });

    const newOrder = (maxOrderPromo?.order || 0) + 1;

    // Create promotion in a transaction with all its associations
    const result = await prisma.$transaction(async (tx) => {
      // Create the promotion
      const promotion = await tx.promotion.create({
        data: {
          id,
          key: uuidv4(),
          name,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null,
          order: newOrder,
          // Create triggers in the same transaction
          triggers: {
            create: triggers.map((trigger: any) => ({
              type: trigger.type,
              value: trigger.value,
            })),
          },
        },
      });

      // Associate markets
      if (markets.length > 0) {
        const marketEntities = await tx.market.findMany({
          where: {
            key: {
              in: markets,
            },
          },
        });

        await Promise.all(
          marketEntities.map((market) =>
            tx.promotionMarket.create({
              data: {
                promotionId: promotion.id,
                marketId: market.id,
              },
            })
          )
        );
      }

      // Associate products based on their type
      for (const product of products) {
        const { productKey, productType } = product;

        if (productType === "internet") {
          const internetProduct = await tx.internetProduct.findUnique({
            where: { key: productKey },
          });
          if (internetProduct) {
            await tx.promotionProductInternet.create({
              data: {
                promotionId: promotion.id,
                productId: internetProduct.id,
              },
            });
          }
        } else if (productType === "tv") {
          const tvProduct = await tx.tVProduct.findUnique({
            where: { key: productKey },
          });
          if (tvProduct) {
            await tx.promotionProductTV.create({
              data: {
                promotionId: promotion.id,
                productId: tvProduct.id,
              },
            });
          }
        } else if (productType === "voice") {
          const voiceProduct = await tx.voiceProduct.findUnique({
            where: { key: productKey },
          });
          if (voiceProduct) {
            await tx.promotionProductVoice.create({
              data: {
                promotionId: promotion.id,
                productId: voiceProduct.id,
              },
            });
          }
        } else if (productType === "equipment") {
          const equipmentItem = await tx.equipment.findUnique({
            where: { key: productKey },
          });
          if (equipmentItem) {
            await tx.promotionProductEquipment.create({
              data: {
                promotionId: promotion.id,
                productId: equipmentItem.id,
              },
            });
          }
        }
      }

      return promotion;
    });

    return NextResponse.json(
      {
        message: "Promotion created successfully",
        promotion: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating promotion:", error);
    return NextResponse.json(
      { error: "Failed to create promotion" },
      { status: 500 }
    );
  }
}
