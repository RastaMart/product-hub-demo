import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const markets = [
  {
    label: "Ohio Fiber Equal Speed",
    csgCode: "1001",
    active: true,
    key: "ohio-fiber-equal-speed",
  },
  {
    label: "Florida Fiber",
    csgCode: "1002",
    active: true,
    key: "florida-fiber",
  },
  {
    label: "South Carolina Fiber",
    csgCode: "1003",
    active: true,
    key: "fragile-fiber-sc",
  },
  {
    label: "Competitive Fiber",
    csgCode: "1004",
    active: false,
    key: "fiber-competitive",
  },
  {
    label: "West Virginia Prime Fiber",
    csgCode: "1005",
    active: true,
    key: "prime-fiber-wv",
  },
  {
    label: "Maryland/Delaware Fiber",
    csgCode: "1006",
    active: true,
    key: "fragile-fiber-md-de",
  },
  { label: "Standard Fiber", csgCode: "1007", active: true, key: "fiber" },
  {
    label: "Maryland Equal Speed Fiber",
    csgCode: "1008",
    active: false,
    key: "fragile-fiber-equal-speed-md",
  },
  {
    label: "Equal Speed Fiber",
    csgCode: "1009",
    active: true,
    key: "fiber-equal-speed",
  },
  {
    label: "Connecticut Equal Speed Fiber",
    csgCode: "1010",
    active: true,
    key: "fragile-fiber-equal-speed-ct",
  },
  {
    label: "Florida Equal Speed Fiber",
    csgCode: "1011",
    active: true,
    key: "florida-fiber-equal-speed",
  },
  {
    label: "Competitive Equal Speed Fiber",
    csgCode: "1012",
    active: true,
    key: "fiber-competitive-equal-speed",
  },
  { label: "Ohio", csgCode: "1013", active: false, key: "ohio" },
  {
    label: "West Virginia Prime",
    csgCode: "1014",
    active: true,
    key: "prime-wv",
  },
  {
    label: "Maryland/Delaware",
    csgCode: "1015",
    active: true,
    key: "fragile-md-de",
  },
  { label: "Standard", csgCode: "1016", active: true, key: "default" },
  {
    label: "Maryland Limited",
    csgCode: "1017",
    active: true,
    key: "fragile-limited-md",
  },
  { label: "Limited", csgCode: "1018", active: false, key: "limited" },
  { label: "Connecticut", csgCode: "1019", active: true, key: "fragile-ct" },
  { label: "Florida Coax", csgCode: "1020", active: true, key: "florida-coax" },
  { label: "Western PA", csgCode: "1021", active: true, key: "fragile-wpa" },
  { label: "South Carolina", csgCode: "1022", active: true, key: "fragile-sc" },
  { label: "Competitive", csgCode: "1023", active: false, key: "competitive" },
];

const internetProducts = [
  {
    key: "P100",
    name: "Basic Internet",
    download_speed: 100,
    upload_speed: 10,
    technology: ["coax"],
    market_keys: [
      "ohio-fiber-equal-speed",
      "florida-fiber",
      "fragile-fiber-sc",
    ],
    ideal_for: "Up to 3 devices",
    promo_banner: "Free Equipment and Wifi Your Way For 12 Months",
    promo_months: 12,
    banner_text: "Best Value",
    banner_color: "salmon",
  },
  {
    key: "P200",
    name: "Fast Internet",
    download_speed: 200,
    upload_speed: 20,
    technology: ["coax", "Fiber G"],
    market_keys: [
      "ohio-fiber-equal-speed",
      "florida-fiber",
      "fiber-competitive",
    ],
    ideal_for: "Up to 5 devices",
    promo_banner: "Free Installation",
    promo_months: 6,
    banner_text: "Popular Choice",
    banner_color: "blue",
  },
  {
    key: "P400",
    name: "Ultra Internet",
    download_speed: 500,
    upload_speed: 50,
    technology: ["Fiber G"],
    market_keys: ["florida-fiber", "fragile-fiber-sc", "fiber-competitive"],
    ideal_for: "Up to 8 devices",
    promo_banner: "First Month Free",
    promo_months: 1,
    banner_text: "Ultra Fast",
    banner_color: "purple",
  },
  {
    key: "P1GB",
    name: "Gigabit Pro",
    download_speed: 1000,
    upload_speed: 1000,
    technology: ["Fiber P"],
    market_keys: [
      "ohio-fiber-equal-speed",
      "fragile-fiber-sc",
      "fiber-competitive",
    ],
    ideal_for: "Up to 12+ devices",
    promo_banner: "Free Professional Installation",
    promo_months: 3,
    banner_text: "Ultimate Speed",
    banner_color: "gold",
  },
];

const tvProducts = [
  {
    key: "Stream TV Box".toLowerCase(),
    name: "Stream TV Box",
    type: "Stream",
    channels: [],
    features: [],
    promo_banner: null,
    promo_months: null,
    monthly_price: 59.99,
  },
];

const voiceProducts = [
  {
    key: "Unlimited Voice Service".toLowerCase(),
    name: "Unlimited Voice Service",
    type: "VoIP",
    features: ["Caller ID", "Call Waiting", "Voicemail"],
    promo_banner: null,
    promo_months: null,
    monthly_price: 29.99,
  },
];

const uiElementKeyTypes = [
  {
    key: "package-header",
    description: "package_header of the product in the check avail module",
    kind: "text",
  },
  {
    key: "cart-onetime-label",
    description: "text added to one time bill section of the cart",
    kind: "text",
  },
  {
    key: "cart-onetime-price",
    description: "text display to one time bill section of the cart",
    kind: "text",
  },
  {
    key: "cart-footer-note",
    description: "disclaimer added to cart footer",
    kind: "text",
  },
  {
    key: "cart-footer-note-info",
    description: 'legal disclaimer added to a modal when clicking to "i" icon',
    kind: "text",
  },
  {
    key: "package-card-top-banner",
    description: "Banner display on top of package cards",
    kind: "image",
  },
];

const promotions = [
  {
    key: "2MF-2025",
    name: "2MF 1Gig",
    start_date: "2025-02-01T00:00:00Z",
    end_date: "2025-05-31T23:59:59Z",
    triggers: [
      {
        cmsBlock: "2mf1gig2025",
        abandonedCartCode: "2mf1gig2025",
      },
    ],
    products: [
      {
        promokey: "2MF-2025",
        product_key: "P1GB",
        productName: "Fiber GigaFast",
        ui_elements: [
          {
            key: "package-header",
            kind: "text",
            txt_text: "Limited Time Offer - 2 month free Internet",
          },
          {
            key: "cart-onetime-label",
            kind: "text",
            txt_text: "Enjoy 2 month of savings",
          },
          {
            key: "cart-onetime-price",
            kind: "text",
            txt_text: "2 month free",
          },
          {
            key: "cart-footer-note",
            kind: "text",
            txt_text:
              "Enjoy 2 month of savings on Ultrafast or Gigafast Speeds:2 month free applied automatically after 90 days of service",
          },
          {
            key: "cart-footer-note-info",
            kind: "text",
            txt_text:
              "Service subject to availability. For new residential customers only. Free offer of 1Gig internet service speeds applied as monthly bill credits in the amount of the monthly recurring charge, beginning in the fourth billing cycle, subject to good standing and no outstanding balance on the account. Taxes and other fees not included. Following the introductory period, the price will convert to the then current retail price for the applicable internet service. Actual internet speeds may vary; please see Breezeline's Network Management Disclosure at breezeline.com for details. ",
          },
        ],
      },
    ],
    markets: ["ohio-fiber-equal-speed", "florida-fiber", "fragile-fiber-sc"],
    ui_elements: [
      {
        key: "package-card-top-banner",
        kind: "image",
        img_desktopImgUrl: "https://....",
        img_mobileImgUrl: "https://....",
        img_alt: "Upgrade to 1Gig and save!",
      },
    ],
  },
  {
    key: "1MF-sitewide",
    name: "1MF 500Mb and 1Gig",
    start_date: "2024-06-01T00:00:00Z",
    end_date: "2024-08-31T23:59:59Z",
    triggers: [
      {
        siteWide: true,
      },
    ],
    products: [
      {
        product_key: "P1GB",
        ui_elements: [
          {
            key: "package-header",
            kind: "text",
            txt_text: "Limited Time Offer - 1 month free Internet",
          },
          {
            key: "cart-onetime-label",
            kind: "text",
            txt_text: "Enjoy 1 month of savings",
          },
          {
            key: "cart-onetime-price",
            kind: "text",
            txt_text: "1 month free",
          },
          {
            key: "cart-footer-note",
            kind: "text",
            txt_text:
              "Enjoy 1 month of savings on Ultrafast or Gigafast Speeds: 1 month free applied automatically after 90 days of service",
          },
          {
            key: "cart-footer-note-info",
            kind: "text",
            txt_text:
              "Service subject to availability. For new residential customers only. Free offer of 500 Mbps or 1Gig internet service speeds applied as monthly bill credits in the amount of the monthly recurring charge, beginning in the fourth billing cycle, subject to good standing and no outstanding balance on the account. Taxes and other fees not included. Following the introductory period, the price will convert to the then current retail price for the applicable internet service. Actual internet speeds may vary; please see Breezeline's Network Management Disclosure at breezeline.com for details. ",
          },
        ],
      },
      {
        product_key: "P400",
        ui_elements: [
          {
            key: "package-header",
            kind: "text",
            txt_text: "Limited Time Offer - 1 month free Internet",
          },
          {
            key: "cart-onetime-label",
            kind: "text",
            txt_text: "Enjoy 1 month of savings",
          },
          {
            key: "cart-onetime-price",
            kind: "text",
            txt_text: "1 month free",
          },
          {
            key: "cart-footer-note",
            kind: "text",
            txt_text:
              "Enjoy 1 month of savings on Ultrafast or Gigafast Speeds: 1 month free applied automatically after 90 days of service",
          },
          {
            key: "cart-footer-note-info",
            kind: "text",
            txt_text:
              "Service subject to availability. For new residential customers only. Free offer of 500 Mbps or 1Gig internet service speeds applied as monthly bill credits in the amount of the monthly recurring charge, beginning in the fourth billing cycle, subject to good standing and no outstanding balance on the account. Taxes and other fees not included. Following the introductory period, the price will convert to the then current retail price for the applicable internet service. Actual internet speeds may vary; please see Breezeline's Network Management Disclosure at breezeline.com for details. ",
          },
        ],
      },
    ],
    markets: ["ohio-fiber-equal-speed", "fiber-competitive"],
    ui_elements: [
      {
        key: "package-card-top-banner",
        kind: "image",
        img_desktopImgUrl: "https://example.com/banners/summer-desktop.jpg",
        img_mobileImgUrl: "https://example.com/banners/summer-mobile.jpg",
        img_alt: "Summer Streaming Bundle",
      },
    ],
  },
];

// Add proper type definitions for your trigger and uiElement objects
interface Trigger {
  cmsBlock: string;
  abandonedCartCode: string;
  siteWide: string;
  [key: string]: string; // Add index signature
}

interface UiElement {
  key: string;
  img_desktopImgUrl?: string;
  // Add other properties that might exist
  [key: string]: any;
}

async function main() {
  console.log("Starting database seeding...");

  // Clear existing data - using Prisma's deleteMany
  await prisma.$transaction([
    prisma.uIElementEquipmentAssociation.deleteMany(),
    prisma.uIElementVoiceAssociation.deleteMany(),
    prisma.uIElementTVAssociation.deleteMany(),
    prisma.uIElementInternetAssociation.deleteMany(),
    prisma.promotionTrigger.deleteMany(),
    prisma.promotionMarket.deleteMany(),
    prisma.promotionProductEquipment.deleteMany(),
    prisma.promotionProductVoice.deleteMany(),
    prisma.promotionProductTV.deleteMany(),
    prisma.promotionProductInternet.deleteMany(),
    prisma.uIElement.deleteMany(),
    prisma.uIElementKeyType.deleteMany(),
    prisma.equipment.deleteMany(),
    prisma.voiceProduct.deleteMany(),
    prisma.tVProduct.deleteMany(),
    prisma.internetProduct.deleteMany(),
    prisma.market.deleteMany(),
    prisma.promotion.deleteMany(),
  ]);
  console.log("✓ Existing data cleared");

  // Seed markets
  for (const market of markets) {
    await prisma.market.create({
      data: {
        key: market.key,
        label: market.label,
        csgCode: market.csgCode,
      },
    });
  }
  console.log("✓ Markets seeded");

  // Seed internet products
  for (const product of internetProducts) {
    await prisma.internetProduct.create({
      data: {
        key: product.key,
        name: product.name,
        speed: `${product.download_speed}/${product.upload_speed}`, // Combining into one field as per schema
        price: 0, // Set appropriate price or calculate it
      },
    });
  }
  console.log("✓ Internet products seeded");

  // Seed TV products
  for (const product of tvProducts) {
    await prisma.tVProduct.create({
      data: {
        key: product.key,
        name: product.name,
        channels: product.channels.length || 0,
        price: product.monthly_price,
      },
    });
  }
  console.log("✓ TV products seeded");

  // Seed Voice products
  for (const product of voiceProducts) {
    await prisma.voiceProduct.create({
      data: {
        key: product.key,
        name: product.name,
        features: product.features,
        price: product.monthly_price,
      },
    });
  }
  console.log("✓ Voice products seeded");

  // Seed UI elements and promotions
  for (const uiElementKeyType of uiElementKeyTypes) {
    await prisma.uIElementKeyType.create({
      data: {
        key: uiElementKeyType.key,
        description: uiElementKeyType.description,
        kind: uiElementKeyType.kind,
      },
    });
  }
  console.log("✓ UI element key types seeded");

  // Seed UI elements and promotions
  for (const promotion of promotions) {
    // Create the base promotion
    const createdPromotion = await prisma.promotion.create({
      data: {
        key: promotion.key,
        name: promotion.name,
        startDate: new Date(promotion.start_date),
        endDate: promotion.end_date ? new Date(promotion.end_date) : null,
        order: promotions.indexOf(promotion),
      },
    });

    // Add promotion triggers
    if (promotion.triggers) {
      for (const trigger of promotion.triggers) {
        // Instead of trying to dynamically get the first property
        // Let's check for known properties directly
        if ("cmsBlock" in trigger) {
          await prisma.promotionTrigger.create({
            data: {
              promotionId: createdPromotion.id,
              type: "cmsBlock",
              value: trigger.cmsBlock,
            },
          });
        }

        if ("abandonedCartCode" in trigger) {
          await prisma.promotionTrigger.create({
            data: {
              promotionId: createdPromotion.id,
              type: "abandonedCartCode",
              value: trigger.abandonedCartCode,
            },
          });
        }

        if ("siteWide" in trigger) {
          await prisma.promotionTrigger.create({
            data: {
              promotionId: createdPromotion.id,
              type: "siteWide",
              value: trigger.siteWide ? "true" : "false",
            },
          });
        }

        // Add additional trigger types as needed
      }
    }

    // Add promotion UI elements
    if (promotion.ui_elements && promotion.ui_elements.length > 0) {
      for (const uiElement of promotion.ui_elements) {
        const typedUiElement = uiElement as UiElement;
        const createdUiElement = await prisma.uIElement.create({
          data: {
            key: typedUiElement.key,
            kind: typedUiElement.kind,
            txtText: typedUiElement.txt_text || null,
            imageDesktopUrl: typedUiElement.img_desktopImgUrl || null,
            imageMobileUrl: typedUiElement.img_mobileImgUrl || null,
            imageAlt: typedUiElement.img_alt || null,
          },
        });
      }
    }

    // Add market associations
    if (promotion.markets && promotion.markets.length > 0) {
      for (const marketKey of promotion.markets) {
        const market = await prisma.market.findUnique({
          where: { key: marketKey },
        });

        if (market) {
          await prisma.promotionMarket.create({
            data: {
              promotionId: createdPromotion.id,
              marketId: market.id,
            },
          });
        }
      }
    }

    // Add product associations with their UI elements
    if (promotion.products && promotion.products.length > 0) {
      for (const product of promotion.products) {
        // Determine product type and create appropriate association
        if (product.product_key.startsWith("P")) {
          // Internet product
          const internetProduct = await prisma.internetProduct.findUnique({
            where: { key: product.product_key },
          });

          if (internetProduct) {
            const promotionProduct =
              await prisma.promotionProductInternet.create({
                data: {
                  promotionId: createdPromotion.id,
                  productId: internetProduct.id,
                },
              });

            // Add UI elements for this product association
            if (product.ui_elements && product.ui_elements.length > 0) {
              for (const uiElement of product.ui_elements) {
                const typedUiElement = uiElement as UiElement;
                const createdUiElement = await prisma.uIElement.create({
                  data: {
                    key: typedUiElement.key,
                    kind: typedUiElement.kind,
                    txtText: typedUiElement.txt_text || null,
                    imageDesktopUrl: typedUiElement.img_desktopImgUrl || null,
                    imageMobileUrl: typedUiElement.img_mobileImgUrl || null,
                    imageAlt: typedUiElement.img_alt || null,
                  },
                });

                await prisma.uIElementInternetAssociation.create({
                  data: {
                    promotionProductId: promotionProduct.id,
                    uiElementId: createdUiElement.id,
                  },
                });
              }
            }
          }
        }
        // Handle other product types (TV, Voice, Equipment) similarly
        // ...
      }
    }
  }

  console.log("✓ Promotions, UI Elements and relationships seeded");
  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
