const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

const markets = [
  { label: 'Ohio Fiber Equal Speed', code: '1001', active: true, key: 'ohio-fiber-equal-speed' },
  { label: 'Florida Fiber', code: '1002', active: true, key: 'florida-fiber' },
  { label: 'South Carolina Fiber', code: '1003', active: true, key: 'fragile-fiber-sc' },
  { label: 'Competitive Fiber', code: '1004', active: false, key: 'fiber-competitive' },
  { label: 'West Virginia Prime Fiber', code: '1005', active: true, key: 'prime-fiber-wv' },
  { label: 'Maryland/Delaware Fiber', code: '1006', active: true, key: 'fragile-fiber-md-de' },
  { label: 'Standard Fiber', code: '1007', active: true, key: 'fiber' },
  { label: 'Maryland Equal Speed Fiber', code: '1008', active: false, key: 'fragile-fiber-equal-speed-md' },
  { label: 'Equal Speed Fiber', code: '1009', active: true, key: 'fiber-equal-speed' },
  { label: 'Connecticut Equal Speed Fiber', code: '1010', active: true, key: 'fragile-fiber-equal-speed-ct' },
  { label: 'Florida Equal Speed Fiber', code: '1011', active: true, key: 'florida-fiber-equal-speed' },
  { label: 'Competitive Equal Speed Fiber', code: '1012', active: true, key: 'fiber-competitive-equal-speed' },
  { label: 'Ohio', code: '1013', active: false, key: 'ohio' },
  { label: 'West Virginia Prime', code: '1014', active: true, key: 'prime-wv' },
  { label: 'Maryland/Delaware', code: '1015', active: true, key: 'fragile-md-de' },
  { label: 'Standard', code: '1016', active: true, key: 'default' },
  { label: 'Maryland Limited', code: '1017', active: true, key: 'fragile-limited-md' },
  { label: 'Limited', code: '1018', active: false, key: 'limited' },
  { label: 'Connecticut', code: '1019', active: true, key: 'fragile-ct' },
  { label: 'Florida Coax', code: '1020', active: true, key: 'florida-coax' },
  { label: 'Western PA', code: '1021', active: true, key: 'fragile-wpa' },
  { label: 'South Carolina', code: '1022', active: true, key: 'fragile-sc' },
  { label: 'Competitive', code: '1023', active: false, key: 'competitive' }
];

const internetProducts = [
  {
    key: 'P100',
    name: 'Basic Internet',
    download_speed: 100,
    upload_speed: 10,
    technology: ['coax'],
    market_keys: ['ohio-fiber-equal-speed', 'florida-fiber', 'fragile-fiber-sc'],
    ideal_for: 'Up to 3 devices',
    promo_banner: 'Free Equipment and Wifi Your Way For 12 Months',
    promo_months: 12,
    banner_text: 'Best Value',
    banner_color: 'salmon'
  },
  {
    key: 'P200',
    name: 'Fast Internet',
    download_speed: 200,
    upload_speed: 20,
    technology: ['coax', 'Fiber G'],
    market_keys: ['ohio-fiber-equal-speed', 'florida-fiber', 'fiber-competitive'],
    ideal_for: 'Up to 5 devices',
    promo_banner: 'Free Installation',
    promo_months: 6,
    banner_text: 'Popular Choice',
    banner_color: 'blue'
  },
  {
    key: 'P400',
    name: 'Ultra Internet',
    download_speed: 500,
    upload_speed: 50,
    technology: ['Fiber G'],
    market_keys: ['florida-fiber', 'fragile-fiber-sc', 'fiber-competitive'],
    ideal_for: 'Up to 8 devices',
    promo_banner: 'First Month Free',
    promo_months: 1,
    banner_text: 'Ultra Fast',
    banner_color: 'purple'
  },
  {
    key: 'P1GB',
    name: 'Gigabit Pro',
    download_speed: 1000,
    upload_speed: 1000,
    technology: ['Fiber P'],
    market_keys: ['ohio-fiber-equal-speed', 'fragile-fiber-sc', 'fiber-competitive'],
    ideal_for: 'Up to 12+ devices',
    promo_banner: 'Free Professional Installation',
    promo_months: 3,
    banner_text: 'Ultimate Speed',
    banner_color: 'gold'
  }
];


const tvProducts = [
  {
    key: 'Stream TV Box'.toLowerCase(),
    name: 'Stream TV Box',
    type: 'Stream',
    channels: [],
    features: [],
    promo_banner: null,
    promo_months: null,
    monthly_price: 59.99
  }
];

const voiceProducts = [
  {
    key: 'Unlimited Voice Service'.toLowerCase(),
    name: 'Unlimited Voice Service',
    type: 'VoIP',
    features: [ 'Caller ID', 'Call Waiting', 'Voicemail' ],
    promo_banner: null,
    promo_months: null,
    monthly_price: 29.99
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
        product_key: 'P1GB',
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
    markets: ['ohio-fiber-equal-speed', 'florida-fiber', 'fragile-fiber-sc'],
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
        product_key: 'P1GB',
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
        product_key: 'P400',
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
    markets: ['ohio-fiber-equal-speed', 'fiber-competitive'],
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

// Generate market-product relations based on audienceValue to key mapping
const marketAudienceMapping = {};
markets.forEach(market => {
  marketAudienceMapping[market.key] = market.key;
});

async function seed() {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await sql`TRUNCATE promotion_product_internet, promotion_product_tv, promotion_product_voice, promotion_product_equipment, promotion_market, markets, internet_products, channels, tv_products, voice_products, equipment, promotions, ui_elements, market_internet_product, market_tv_product, market_voice_product CASCADE`;
    console.log('✓ Existing data cleared');

    // Seed markets
    for (const market of markets) {
      await sql`
        INSERT INTO markets (key, label, code, active)
        VALUES (${market.key}, ${market.label}, ${market.code}, ${market.active})
      `;
    }
    console.log('✓ Markets seeded');

    // Seed internet products
    for (const product of internetProducts) {
      await sql`
        INSERT INTO internet_products (
          key, name, download_speed, upload_speed, technology,
          ideal_for, promo_banner, promo_months, banner_text, banner_color
        )
        VALUES (
          ${product.key}, ${product.name}, ${product.download_speed},
          ${product.upload_speed}, ${product.technology},
          ${product.ideal_for}, ${product.promo_banner}, ${product.promo_months},
          ${product.banner_text}, ${product.banner_color}
        )
      `;
    }
    console.log('✓ Internet products seeded');

    // Seed TV products
    for (const product of tvProducts) {
      await sql`
        INSERT INTO tv_products (
          key, name, type, channels, features,
          promo_banner, promo_months, monthly_price
        )
        VALUES (
          ${product.key}, ${product.name}, ${product.type}, ${product.channels},
          ${product.features}, ${product.promo_banner}, ${product.promo_months},
          ${product.monthly_price}
        )
      `;
    }
    console.log('✓ TV products seeded');

    // Seed Voice products
    for (const product of voiceProducts) {
      await sql`
        INSERT INTO voice_products (
          key, name, type, features,
          promo_banner, promo_months, monthly_price
        )
        VALUES (
          ${product.key}, ${product.name}, ${product.type}, ${product.features},
          ${product.promo_banner}, ${product.promo_months},
          ${product.monthly_price}
        )
      `;
    }
    console.log('✓ Voice products seeded');

    // Seed UI elements
    for (const element of uiElements) {
      await sql`
        INSERT INTO ui_elements (key, description, type)
        VALUES (${element.key}, ${element.description}, ${element.type})
      `;
    }
    console.log('✓ UI elements seeded');

    // Seed promotions with relationships
    for (const promotion of promotions) {
      // Insert base promotion
      await sql`
        INSERT INTO promotions (
          key, name, start_date, end_date, triggers, ui_elements, display_order
        )
        VALUES (
          ${promotion.key},
          ${promotion.name},
          ${promotion.start_date},
          ${promotion.end_date},
          ${promotion.triggers},
          ${promotion.ui_elements},
          ${promotions.indexOf(promotion)}
        )
      `;
      
      // Insert market associations
      if (promotion.markets && promotion.markets.length > 0) {
        for (const marketKey of promotion.markets) {
          await sql`
            INSERT INTO promotion_market (promotion_key, market_key)
            VALUES (${promotion.key}, ${marketKey})
          `;
        }
      }
      
      // Insert product associations
      if (promotion.products && promotion.products.length > 0) {
        for (const product of promotion.products) {
          // Determine product type and insert into appropriate join table
          if (product.product_key.startsWith('P')) {
            // Assuming P prefix indicates internet product
            await sql`
              INSERT INTO promotion_product_internet (promotion_key, product_key, ui_elements)
              VALUES (${promotion.key}, ${product.product_key}, ${product.ui_elements || []})
            `;
          } else if (product.product_key.toLowerCase().includes('stream')) {
            // Assuming TV product
            await sql`
              INSERT INTO promotion_product_tv (promotion_key, product_key, ui_elements)
              VALUES (${promotion.key}, ${product.product_key}, ${product.ui_elements || []})
            `;
          } else if (product.product_key.toLowerCase().includes('voice')) {
            // Assuming Voice product
            await sql`
              INSERT INTO promotion_product_voice (promotion_key, product_key, ui_elements)
              VALUES (${promotion.key}, ${product.product_key}, ${product.ui_elements || []})
            `;
          }
          // If there were equipment associations, would handle those similarly
        }
      }
    }
    console.log('✓ Promotions and relationships seeded');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();