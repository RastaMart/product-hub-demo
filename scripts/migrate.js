const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  try {
    console.log('Starting database migration...');

    // Drop tables in reverse order of dependency (to avoid foreign key conflicts)
    console.log('Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS market_voice_product CASCADE`;
    await sql`DROP TABLE IF EXISTS market_tv_product CASCADE`;
    await sql`DROP TABLE IF EXISTS market_internet_product CASCADE`;
    await sql`DROP TABLE IF EXISTS promotions CASCADE`;
    await sql`DROP TABLE IF EXISTS ui_elements CASCADE`;
    await sql`DROP TABLE IF EXISTS equipment CASCADE`;
    await sql`DROP TABLE IF EXISTS voice_products CASCADE`;
    await sql`DROP TABLE IF EXISTS tv_products CASCADE`;
    await sql`DROP TABLE IF EXISTS channels CASCADE`;
    await sql`DROP TABLE IF EXISTS internet_products CASCADE`;
    await sql`DROP TABLE IF EXISTS markets CASCADE`;
    console.log('✓ Existing tables dropped');

    // Create markets table - use key as primary key instead of id
    await sql`
      CREATE TABLE IF NOT EXISTS markets (
        key TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        code TEXT NOT NULL UNIQUE,
        active BOOLEAN NOT NULL DEFAULT true,
        snapshot_id TEXT
      )
    `;
    console.log('✓ Markets table created');

    // Create internet_products table - use key as primary key instead of id
    await sql`
      CREATE TABLE IF NOT EXISTS internet_products (
        key TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        download_speed INTEGER NOT NULL,
        upload_speed INTEGER NOT NULL,
        technology TEXT[],
        snapshot_id TEXT,
        ideal_for TEXT,
        promo_banner TEXT,
        promo_months INTEGER,
        banner_text TEXT,
        banner_color TEXT
      )
    `;
    console.log('✓ Internet products table created');

    // Create market_internet_product join table - use key fields for foreign keys
    await sql`
      CREATE TABLE IF NOT EXISTS market_internet_product (
        market_key TEXT NOT NULL,
        internet_product_key TEXT NOT NULL,
        PRIMARY KEY (market_key, internet_product_key),
        FOREIGN KEY (market_key) REFERENCES markets(key) ON DELETE CASCADE,
        FOREIGN KEY (internet_product_key) REFERENCES internet_products(key) ON DELETE CASCADE
      )
    `;
    console.log('✓ Market-Internet Product join table created');

    // Create channels table - keep id as primary key since no changes needed
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

    // Create tv_products table - use key as primary key instead of id
    await sql`
      CREATE TABLE IF NOT EXISTS tv_products (
        key TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        channels TEXT[],
        features TEXT[],
        promo_banner TEXT,
        promo_months INTEGER,
        monthly_price DECIMAL(10,2) NOT NULL
      )
    `;
    console.log('✓ TV products table created');

    // Create market_tv_product join table - use key fields for foreign keys
    await sql`
      CREATE TABLE IF NOT EXISTS market_tv_product (
        market_key TEXT NOT NULL,
        tv_product_key TEXT NOT NULL,
        PRIMARY KEY (market_key, tv_product_key),
        FOREIGN KEY (market_key) REFERENCES markets(key) ON DELETE CASCADE,
        FOREIGN KEY (tv_product_key) REFERENCES tv_products(key) ON DELETE CASCADE
      )
    `;
    console.log('✓ Market-TV Product join table created');

    // Create voice_products table - use key as primary key instead of id
    await sql`
      CREATE TABLE IF NOT EXISTS voice_products (
        key TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        features TEXT[],
        promo_banner TEXT,
        promo_months INTEGER,
        monthly_price DECIMAL(10,2) NOT NULL
      )
    `;
    console.log('✓ Voice products table created');

    // Create market_voice_product join table - use key fields for foreign keys
    await sql`
      CREATE TABLE IF NOT EXISTS market_voice_product (
        market_key TEXT NOT NULL,
        voice_product_key TEXT NOT NULL,
        PRIMARY KEY (market_key, voice_product_key),
        FOREIGN KEY (market_key) REFERENCES markets(key) ON DELETE CASCADE,
        FOREIGN KEY (voice_product_key) REFERENCES voice_products(key) ON DELETE CASCADE
      )
    `;
    console.log('✓ Market-Voice Product join table created');

    // Create equipment table
    await sql`
      CREATE TABLE IF NOT EXISTS equipment (
        key TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        features TEXT[],
        compatibility JSONB,
        market_keys TEXT[],
        monthly_price DECIMAL(10,2) NOT NULL,
        promo_banner TEXT,
        promo_months INTEGER
      )
    `;
    console.log('✓ Equipment table created');

    // Create promotions table
    await sql`
      CREATE TABLE IF NOT EXISTS promotions (
        key TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        start_date TIMESTAMPTZ NOT NULL,
        end_date TIMESTAMPTZ NOT NULL,
        triggers JSONB[] NOT NULL DEFAULT '{}',
        products JSONB[] NOT NULL DEFAULT '{}',
        markets TEXT[] NOT NULL DEFAULT '{}',
        ui_elements JSONB[] NOT NULL DEFAULT '{}',
        display_order INTEGER NOT NULL DEFAULT 0
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