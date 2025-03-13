import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    // Check if tables exist
    const tablesExist = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'markets'
      );
    `;

    if (!tablesExist[0].exists) {
      return NextResponse.json({ 
        success: false, 
        message: 'Database tables do not exist. Initialize the database first.'
      }, { status: 400 });
    }

    // Clear existing data from all tables
    await sql`TRUNCATE markets, internet_products, channels, tv_products, voice_products, equipment, promotions, ui_elements CASCADE`;

    // Seed markets
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

    for (const market of markets) {
      await sql`
        INSERT INTO markets (id, label, code, active, audience_value)
        VALUES (${market.id}, ${market.label}, ${market.code}, ${market.active}, ${market.audience_value})
      `;
    }

    // Seed internet products with market associations
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
        download_speed: 400,
        upload_speed: 40,
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

    // Seed UI elements
    await sql`
      INSERT INTO ui_elements (key, description, type) VALUES
      ('cart-onetime-label', 'text added to one time bill section of the cart', 'text'),
      ('cart-onetime-price', 'text display to one time bill section of the cart', 'text'),
      ('cart-footer-note', 'disclaimer added to cart footer', 'text'),
      ('cart-footer-note-legal', 'legal disclaimer added to a modal when clicking to "i" icon', 'text'),
      ('package-card-top-banner', 'Banner display on top of package cards', 'image')
    `;

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully'
    });
  } catch (error) {
    console.error('Database seeding error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to seed database',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}