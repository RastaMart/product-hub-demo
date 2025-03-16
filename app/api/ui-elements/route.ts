import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { element, promotionId, productType, promoXproductID } = body;

    // Create UI element and associate it in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the UI element
      const uiElement = await tx.uIElement.create({
        data: {
          key: element.key,
          kind: element.kind,
          txtText: element.txt_text,
          imageAlt: element.img_alt,
          imageDesktopUrl: element.img_desktopImgUrl,
          imageMobileUrl: element.img_mobileImgUrl,
          promotionId,
        },
      });

      // Associate with the appropriate product type
      let association;
      if (promoXproductID) {
        if (productType === "internet") {
          association = await tx.uIElementInternetAssociation.create({
            data: {
              promotionProductId: promoXproductID,
              uiElementId: uiElement.id,
            },
            include: {
              uiElement: true,
            },
          });
        } else if (productType === "tv") {
          association = await tx.uIElementTVAssociation.create({
            data: {
              promotionProductId: promoXproductID,
              uiElementId: uiElement.id,
            },
            include: {
              uiElement: true,
            },
          });
        } else if (productType === "voice") {
          association = await tx.uIElementVoiceAssociation.create({
            data: {
              promotionProductId: promoXproductID,
              uiElementId: uiElement.id,
            },
            include: {
              uiElement: true,
            },
          });
        } else if (productType === "equipment") {
          association = await tx.uIElementEquipmentAssociation.create({
            data: {
              promotionProductId: promoXproductID,
              uiElementId: uiElement.id,
            },
            include: {
              uiElement: true,
            },
          });
        } else {
          throw new Error(`Invalid product type: ${productType}`);
        }
      }
      return { uiElement, association };
    });

    return NextResponse.json(
      {
        message: "UI element created and associated successfully",
        element: result.uiElement,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create UI element:", error);
    return NextResponse.json(
      { error: "Failed to create UI element" },
      { status: 500 }
    );
  }
}

// Your DELETE endpoint for UI elements is already implemented correctly
