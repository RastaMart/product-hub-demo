const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

const markets = [
  { id: '1', label: 'Ohio Fiber Equal Speed', code: '1001', active: true, key: 'ohio-fiber-equal-speed' },
  { id: '2', label: 'Florida Fiber', code: '1002', active: true, key: 'florida-fiber' },
  { id: '3', label: 'South Carolina Fiber', code: '1003', active: true, key: 'fragile-fiber-sc' },
  { id: '4', label: 'Competitive Fiber', code: '1004', active: false, key: 'fiber-competitive' },
  { id: '5', label: 'West Virginia Prime Fiber', code: '1005', active: true, key: 'prime-fiber-wv' },
  { id: '6', label: 'Maryland/Delaware Fiber', code: '1006', active: true, key: 'fragile-fiber-md-de' },
  { id: '7', label: 'Standard Fiber', code: '1007', active: true, key: 'fiber' },
  { id: '8', label: 'Maryland Equal Speed Fiber', code: '1008', active: false, key: 'fragile-fiber-equal-speed-md' },
  { id: '9', label: 'Equal Speed Fiber', code: '1009', active: true, key: 'fiber-equal-speed' },
  { id: '10', label: 'Connecticut Equal Speed Fiber', code: '1010', active: true, key: 'fragile-fiber-equal-speed-ct' },
  { id: '11', label: 'Florida Equal Speed Fiber', code: '1011', active: true, key: 'florida-fiber-equal-speed' },
  { id: '12', label: 'Competitive Equal Speed Fiber', code: '1012', active: true, key: 'fiber-competitive-equal-speed' },
  { id: '13', label: 'Ohio', code: '1013', active: false, key: 'ohio' },
  { id: '14', label: 'West Virginia Prime', code: '1014', active: true, key: 'prime-wv' },
  { id: '15', label: 'Maryland/Delaware', code: '1015', active: true, key: 'fragile-md-de' },
  { id: '16', label: 'Standard', code: '1016', active: true, key: 'default' },
  { id: '17', label: 'Maryland Limited', code: '1017', active: true, key: 'fragile-limited-md' },
  { id: '18', label: 'Limited', code: '1018', active: false, key: 'limited' },
  { id: '19', label: 'Connecticut', code: '1019', active: true, key: 'fragile-ct' },
  { id: '20', label: 'Florida Coax', code: '1020', active: true, key: 'florida-coax' },
  { id: '21', label: 'Western PA', code: '1021', active: true, key: 'fragile-wpa' },
  { id: '22', label: 'South Carolina', code: '1022', active: true, key: 'fragile-sc' },
  { id: '23', label: 'Competitive', code: '1023', active: false, key: 'competitive' }
];

const internetProducts = [
  {
    id: '1',
    key: 'P100',
    name: 'Basic Internet',
    download_speed: 100,
    upload_speed: 10,
    technology: ['coax'],
    market_ids: ['1', '2', '3'],
    ideal_for: 'Up to 3 devices',
    promo_banner: 'Free Equipment and Wifi Your Way For 12 Months',
    promo_months: 12,
    banner_text: 'Best Value',
    banner_color: 'salmon'
  },
  {
    id: '2',
    key: 'P200',
    name: 'Fast Internet',
    download_speed: 200,
    upload_speed: 20,
    technology: ['coax', 'Fiber G'],
    market_ids: ['1', '2', '4'],
    ideal_for: 'Up to 5 devices',
    promo_banner: 'Free Installation',
    promo_months: 6,
    banner_text: 'Popular Choice',
    banner_color: 'blue'
  },
  {
    id: '3',
    key: 'P400',
    name: 'Ultra Internet',
    download_speed: 500,
    upload_speed: 50,
    technology: ['Fiber G'],
    market_ids: ['2', '3', '4'],
    ideal_for: 'Up to 8 devices',
    promo_banner: 'First Month Free',
    promo_months: 1,
    banner_text: 'Ultra Fast',
    banner_color: 'purple'
  },
  {
    id: '4',
    key: 'P1GB',
    name: 'Gigabit Pro',
    download_speed: 1000,
    upload_speed: 1000,
    technology: ['Fiber P'],
    market_ids: ['1', '3', '4'],
    ideal_for: 'Up to 12+ devices',
    promo_banner: 'Free Professional Installation',
    promo_months: 3,
    banner_text: 'Ultimate Speed',
    banner_color: 'gold'
  }
];

const uiElements = [
  {
    key: 'cart-onetime-label',
    description: 'text added to one time bill section of the cart',
    type: 'text'
  },
  {
    key: 'cart-onetime-price',
    description: 'text display to one time bill section of the cart',
    type: 'text'
  },
  {
    key: 'cart-footer-note',
    description: 'disclaimer added to cart footer',
    type: 'text'
  },
  {
    key: 'cart-footer-note-legal',
    description: 'legal disclaimer added to a modal when clicking to "i" icon',
    type: 'text'
  },
  {
    key: 'package-card-top-banner',
    description: 'Banner display on top of package cards',
    type: 'image'
  }
];

const promotions = [
  {
    id: '1',
    key: "2MF-2025",
    name: '2MF 1Gig',
    start_date: '2025-02-01T00:00:00Z',
    end_date: '2025-05-31T23:59:59Z',
    triggers: [
      {
        cmsBlock: '2mf1gig2025',
        abandonedCartCode: '2mf1gig2025'
      }
    ],
    products: [
      {
					promokey: "2MF-2025",
        product_id: 4,
        productKey: 'P1GB',
					productName: "Fiber GigaFast",
					ui_elements: [
						{
							key: "package_header",
							txt_text: "Limited Time Offer - 2 month free Internet"
						},
						{
							key: "cart_oneTime_label",
							txt_text: "Enjoy 2 month of savings"
						},
						{
							key: "cart_oneTime_price",
							txt_text: "2 month free"
						},
						{
							key: "cart_footNote",
							txt_text: "Enjoy 2 month of savings on Ultrafast or Gigafast Speeds:2 month free applied automatically after 90 days of service"
						},
						{
							key: "cart_footNoteInfo",
							txt_text: "Service subject to availability. For new residential customers only. Free offer of 1Gig internet service speeds applied as monthly bill credits in the amount of the monthly recurring charge, beginning in the fourth billing cycle, subject to good standing and no outstanding balance on the account. Taxes and other fees not included. Following the introductory period, the price will convert to the then current retail price for the applicable internet service. Actual internet speeds may vary; please see Breezeline's Network Management Disclosure at breezeline.com for details. "
						}
					]
				}
    ],
    markets: ['1', '2', '3'],
    ui_elements: [
				{
					key: "internetPage_banner",
					img_desktopImgUrl: "https://....",
					img_mobileImgUrl: "https://....",
					img_alt: "Upgrade to 1Gig and save!"
				}
    ]
  },
  {
    id: '2',
		key: "1MF-sitewide",
    name: '1MF 500Mb and 1Gig',
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z',
    triggers: [
      {
        siteWide: true
      }
    ],
    products: [
      {
        product_id: 4,
        productKey: 'P1GB',
        ui_elements: [
						{
						key: "package_header",
							txt_text: "Limited Time Offer - 1 month free Internet"
						},
						{
							key: "cart_oneTime_label",
							txt_text: "Enjoy 1 month of savings"
						},
						{
							key: "cart_oneTime_price",
							txt_text: "1 month free"
						},
						{
							key: "cart_footNote",
							txt_text: "Enjoy 1 month of savings on Ultrafast or Gigafast Speeds: 1 month free applied automatically after 90 days of service"
						},
						{
							key: "cart_footNoteInfo",
							txt_text: "Service subject to availability. For new residential customers only. Free offer of 500 Mbps or 1Gig internet service speeds applied as monthly bill credits in the amount of the monthly recurring charge, beginning in the fourth billing cycle, subject to good standing and no outstanding balance on the account. Taxes and other fees not included. Following the introductory period, the price will convert to the then current retail price for the applicable internet service. Actual internet speeds may vary; please see Breezeline's Network Management Disclosure at breezeline.com for details. "
						}
        ]
      },
      {
        product_id: 3,
        productKey: 'P400',
        ui_elements: [
						{
						key: "package_header",
							txt_text: "Limited Time Offer - 1 month free Internet"
						},
						{
							key: "cart_oneTime_label",
							txt_text: "Enjoy 1 month of savings"
						},
						{
							key: "cart_oneTime_price",
							txt_text: "1 month free"
						},
						{
							key: "cart_footNote",
							txt_text: "Enjoy 1 month of savings on Ultrafast or Gigafast Speeds: 1 month free applied automatically after 90 days of service"
						},
						{
							key: "cart_footNoteInfo",
							txt_text: "Service subject to availability. For new residential customers only. Free offer of 500 Mbps or 1Gig internet service speeds applied as monthly bill credits in the amount of the monthly recurring charge, beginning in the fourth billing cycle, subject to good standing and no outstanding balance on the account. Taxes and other fees not included. Following the introductory period, the price will convert to the then current retail price for the applicable internet service. Actual internet speeds may vary; please see Breezeline's Network Management Disclosure at breezeline.com for details. "
						}
        ]
      }
    ],
    markets: ['1', '4'],
    ui_elements: [
      {
        key: 'package-card-top-banner',
        img_desktopImgUrl: 'https://example.com/banners/summer-desktop.jpg',
        img_mobileImgUrl: 'https://example.com/banners/summer-mobile.jpg',
        img_alt: 'Summer Streaming Bundle'
      }
    ]
  }
];

// Sample TV products
const tvProducts = [
  {
    id: '1',
    name: 'Basic TV',
    type: 'Cable',
    channels: ['1', '2', '3', '4', '5'],
    features: ['Local channels', 'HD Available'],
    market_ids: ['1', '2', '3'],
    promo_banner: 'First month at half price',
    promo_months: 1,
    monthly_price: 29.99
  },
  {
    id: '2',
    name: 'Essential TV',
    type: 'Cable',
    channels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    features: ['Local channels', 'Popular networks', 'HD Available'],
    market_ids: ['1', '4'],
    promo_banner: 'Free DVR for 3 months',
    promo_months: 3,
    monthly_price: 49.99
  },
  {
    id: '3',
    name: 'Stream TV',
    type: 'Stream',
    channels: ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    features: ['No cable box needed', 'Watch on any device', 'Cloud DVR included'],
    market_ids: ['2', '3', '4'],
    promo_banner: '2 months free premium channels',
    promo_months: 2,
    monthly_price: 69.99
  }
];

// Sample Voice products
const voiceProducts = [
  {
    id: '1',
    name: 'Basic Voice',
    type: 'Landline',
    features: ['Unlimited local calls', 'Voicemail'],
    market_ids: ['1', '2', '3'],
    promo_banner: 'Free activation',
    promo_months: 0,
    monthly_price: 19.99
  },
  {
    id: '2',
    name: 'Premium Voice',
    type: 'VoIP',
    features: ['Unlimited nationwide calls', 'Caller ID', 'Call waiting', 'Voicemail to email'],
    market_ids: ['1', '3', '4'],
    promo_banner: 'First month free',
    promo_months: 1,
    monthly_price: 29.99
  }
];

// Define market-internet product relationships
const marketInternetProducts = [
  { market_id: '1', internet_product_id: '1' },
  { market_id: '1', internet_product_id: '2' },
  { market_id: '1', internet_product_id: '4' },
  { market_id: '2', internet_product_id: '1' },
  { market_id: '2', internet_product_id: '2' },
  { market_id: '2', internet_product_id: '3' },
  { market_id: '3', internet_product_id: '1' },
  { market_id: '3', internet_product_id: '3' },
  { market_id: '3', internet_product_id: '4' },
  { market_id: '4', internet_product_id: '2' },
  { market_id: '4', internet_product_id: '3' },
  { market_id: '4', internet_product_id: '4' }
];

// Define market-TV product relationships
const marketTvProducts = [
  { market_id: '1', tv_product_id: '1' },
  { market_id: '1', tv_product_id: '2' },
  { market_id: '2', tv_product_id: '1' },
  { market_id: '2', tv_product_id: '3' },
  { market_id: '3', tv_product_id: '1' },
  { market_id: '3', tv_product_id: '3' },
  { market_id: '4', tv_product_id: '2' },
  { market_id: '4', tv_product_id: '3' }
];

// Define market-Voice product relationships
const marketVoiceProducts = [
  { market_id: '1', voice_product_id: '1' },
  { market_id: '1', voice_product_id: '2' },
  { market_id: '2', voice_product_id: '1' },
  { market_id: '3', voice_product_id: '1' },
  { market_id: '3', voice_product_id: '2' },
  { market_id: '4', voice_product_id: '2' }
];

async function seed() {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await sql`TRUNCATE markets, internet_products, channels, tv_products, voice_products, equipment, promotions, ui_elements, market_internet_product, market_tv_product, market_voice_product CASCADE`;
    console.log('✓ Existing data cleared');

    // Seed markets
    for (const market of markets) {
      await sql`
        INSERT INTO markets (id, label, code, active, key)
        VALUES (${market.id}, ${market.label}, ${market.code}, ${market.active}, ${market.key})
      `;
    }
    console.log('✓ Markets seeded');

    // Seed internet products - remove market_ids from the insert
    for (const product of internetProducts) {
      await sql`
        INSERT INTO internet_products (
          id, key, name, download_speed, upload_speed, technology,
          ideal_for, promo_banner, promo_months, banner_text, banner_color
        )
        VALUES (
          ${product.id}, ${product.key}, ${product.name}, ${product.download_speed},
          ${product.upload_speed}, ${product.technology},
          ${product.ideal_for}, ${product.promo_banner}, ${product.promo_months},
          ${product.banner_text}, ${product.banner_color}
        )
      `;
    }
    console.log('✓ Internet products seeded');

    // Seed market-internet product relationships
    for (const relation of marketInternetProducts) {
      await sql`
        INSERT INTO market_internet_product (market_id, internet_product_id)
        VALUES (${relation.market_id}, ${relation.internet_product_id})
      `;
    }
    console.log('✓ Market-Internet Product relationships seeded');

    // Seed TV products
    for (const product of tvProducts) {
      await sql`
        INSERT INTO tv_products (
          id, name, type, channels, features,
          promo_banner, promo_months, monthly_price
        )
        VALUES (
          ${product.id}, ${product.name}, ${product.type}, ${product.channels},
          ${product.features}, ${product.promo_banner}, ${product.promo_months},
          ${product.monthly_price}
        )
      `;
    }
    console.log('✓ TV products seeded');

    // Seed market-TV product relationships
    for (const relation of marketTvProducts) {
      await sql`
        INSERT INTO market_tv_product (market_id, tv_product_id)
        VALUES (${relation.market_id}, ${relation.tv_product_id})
      `;
    }
    console.log('✓ Market-TV Product relationships seeded');

    // Seed Voice products
    for (const product of voiceProducts) {
      await sql`
        INSERT INTO voice_products (
          id, name, type, features,
          promo_banner, promo_months, monthly_price
        )
        VALUES (
          ${product.id}, ${product.name}, ${product.type}, ${product.features},
          ${product.promo_banner}, ${product.promo_months},
          ${product.monthly_price}
        )
      `;
    }
    console.log('✓ Voice products seeded');

    // Seed market-Voice product relationships
    for (const relation of marketVoiceProducts) {
      await sql`
        INSERT INTO market_voice_product (market_id, voice_product_id)
        VALUES (${relation.market_id}, ${relation.voice_product_id})
      `;
    }
    console.log('✓ Market-Voice Product relationships seeded');

    // Seed UI elements
    for (const element of uiElements) {
      await sql`
        INSERT INTO ui_elements (key, description, type)
        VALUES (${element.key}, ${element.description}, ${element.type})
      `;
    }
    console.log('✓ UI elements seeded');

    // Seed promotions
    for (const promotion of promotions) {
      await sql`
        INSERT INTO promotions (
          id, key, name, start_date, end_date, triggers, products, markets, ui_elements
        )
        VALUES (
          ${promotion.id},
          ${promotion.key},
          ${promotion.name},
          ${promotion.start_date},
          ${promotion.end_date},
          ${promotion.triggers},
          ${promotion.products},
          ${promotion.markets},
          ${promotion.ui_elements}
        )
      `;
    }
    console.log('✓ Promotions seeded');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();