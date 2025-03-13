const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

const markets = [
  { id: '1', label: 'Ohio Fiber Equal Speed', code: '1001', active: true, audience_value: 'ohio-fiber-equal-speed' },
  { id: '2', label: 'Florida Fiber', code: '1002', active: true, audience_value: 'florida-fiber' },
  { id: '3', label: 'South Carolina Fiber', code: '1003', active: true, audience_value: 'fragile-fiber-sc' },
  { id: '4', label: 'Competitive Fiber', code: '1004', active: false, audience_value: 'fiber-competitive' },
  { id: '5', label: 'West Virginia Prime Fiber', code: '1005', active: true, audience_value: 'prime-fiber-wv' },
  { id: '6', label: 'Maryland/Delaware Fiber', code: '1006', active: true, audience_value: 'fragile-fiber-md-de' },
  { id: '7', label: 'Standard Fiber', code: '1007', active: true, audience_value: 'fiber' },
  { id: '8', label: 'Maryland Equal Speed Fiber', code: '1008', active: false, audience_value: 'fragile-fiber-equal-speed-md' },
  { id: '9', label: 'Equal Speed Fiber', code: '1009', active: true, audience_value: 'fiber-equal-speed' },
  { id: '10', label: 'Connecticut Equal Speed Fiber', code: '1010', active: true, audience_value: 'fragile-fiber-equal-speed-ct' },
  { id: '11', label: 'Florida Equal Speed Fiber', code: '1011', active: true, audience_value: 'florida-fiber-equal-speed' },
  { id: '12', label: 'Competitive Equal Speed Fiber', code: '1012', active: true, audience_value: 'fiber-competitive-equal-speed' },
  { id: '13', label: 'Ohio', code: '1013', active: false, audience_value: 'ohio' },
  { id: '14', label: 'West Virginia Prime', code: '1014', active: true, audience_value: 'prime-wv' },
  { id: '15', label: 'Maryland/Delaware', code: '1015', active: true, audience_value: 'fragile-md-de' },
  { id: '16', label: 'Standard', code: '1016', active: true, audience_value: 'default' },
  { id: '17', label: 'Maryland Limited', code: '1017', active: true, audience_value: 'fragile-limited-md' },
  { id: '18', label: 'Limited', code: '1018', active: false, audience_value: 'limited' },
  { id: '19', label: 'Connecticut', code: '1019', active: true, audience_value: 'fragile-ct' },
  { id: '20', label: 'Florida Coax', code: '1020', active: true, audience_value: 'florida-coax' },
  { id: '21', label: 'Western PA', code: '1021', active: true, audience_value: 'fragile-wpa' },
  { id: '22', label: 'South Carolina', code: '1022', active: true, audience_value: 'fragile-sc' },
  { id: '23', label: 'Competitive', code: '1023', active: false, audience_value: 'competitive' }
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

async function seed() {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await sql`TRUNCATE markets, internet_products, channels, tv_products, voice_products, equipment, promotions, ui_elements CASCADE`;
    console.log('✓ Existing data cleared');

    // Seed markets
    for (const market of markets) {
      await sql`
        INSERT INTO markets (id, label, code, active, audience_value)
        VALUES (${market.id}, ${market.label}, ${market.code}, ${market.active}, ${market.audience_value})
      `;
    }
    console.log('✓ Markets seeded');

    // Seed internet products
    for (const product of internetProducts) {
      await sql`
        INSERT INTO internet_products (
          id, key, name, download_speed, upload_speed, technology, market_ids,
          ideal_for, promo_banner, promo_months, banner_text, banner_color
        )
        VALUES (
          ${product.id}, ${product.key}, ${product.name}, ${product.download_speed},
          ${product.upload_speed}, ${product.technology}, ${product.market_ids},
          ${product.ideal_for}, ${product.promo_banner}, ${product.promo_months},
          ${product.banner_text}, ${product.banner_color}
        )
      `;
    }
    console.log('✓ Internet products seeded');

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