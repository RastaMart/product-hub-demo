const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  try {
    console.log('Starting database migration...');

    // Create markets table
    await sql`
      CREATE TABLE IF NOT EXISTS markets (
        id TEXT PRIMARY KEY,
        key TEXT,
        label TEXT NOT NULL,
        code TEXT NOT NULL UNIQUE,
        active BOOLEAN NOT NULL DEFAULT true,
        snapshot_id TEXT,
        product_keys TEXT[]
      )
    `;
    console.log('✓ Markets table created');

    // Create internet_products table
    await sql`
      CREATE TABLE IF NOT EXISTS internet_products (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        download_speed INTEGER NOT NULL,
        upload_speed INTEGER NOT NULL,
        technology TEXT[],
        snapshot_id TEXT,
        market_ids TEXT[],
        ideal_for TEXT,
        promo_banner TEXT,
        promo_months INTEGER,
        banner_text TEXT,
        banner_color TEXT
      )
    `;
    console.log('✓ Internet products table created');

    // Create channels table
    await sql`
      CREATE TABLE IF NOT EXISTS channels (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        channel_number INTEGER NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        icon TEXT,
        categories TEXT[],
        sub_category TEXT,
        types TEXT[],
        iptv_types TEXT[]
      )
    `;
    console.log('✓ Channels table created');

    // Create tv_products table
    await sql`
      CREATE TABLE IF NOT EXISTS tv_products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        channels TEXT[],
        features TEXT[],
        market_ids TEXT[],
        promo_banner TEXT,
        promo_months INTEGER,
        monthly_price DECIMAL(10,2) NOT NULL
      )
    `;
    console.log('✓ TV products table created');

    // Create voice_products table
    await sql`
      CREATE TABLE IF NOT EXISTS voice_products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        features TEXT[],
        market_ids TEXT[],
        promo_banner TEXT,
        promo_months INTEGER,
        monthly_price DECIMAL(10,2) NOT NULL
      )
    `;
    console.log('✓ Voice products table created');

    // Create equipment table
    await sql`
      CREATE TABLE IF NOT EXISTS equipment (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        features TEXT[],
        compatibility JSONB,
        market_ids TEXT[],
        monthly_price DECIMAL(10,2) NOT NULL,
        promo_banner TEXT,
        promo_months INTEGER
      )
    `;
    console.log('✓ Equipment table created');

    // Create promotions table
    await sql`
      CREATE TABLE IF NOT EXISTS promotions (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL,
        name TEXT NOT NULL,
        start_date TIMESTAMPTZ NOT NULL,
        end_date TIMESTAMPTZ NOT NULL,
        triggers JSONB[] NOT NULL DEFAULT '{}',
        products JSONB[] NOT NULL DEFAULT '{}',
        markets TEXT[] NOT NULL DEFAULT '{}',
        ui_elements JSONB[] NOT NULL DEFAULT '{}'
      )
    `;
    console.log('✓ Promotions table created');

    // Create ui_elements table
    await sql`
      CREATE TABLE IF NOT EXISTS ui_elements (
        key TEXT PRIMARY KEY,
        description TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('text', 'image'))
      )
    `;
    console.log('✓ UI elements table created');

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();