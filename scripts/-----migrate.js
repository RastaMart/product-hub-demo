const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  try {
    console.log('Starting database migration...');

    // Drop tables in reverse order of dependency (to avoid foreign key conflicts)
    console.log('Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS promotion_product_internet CASCADE`;
    await sql`DROP TABLE IF EXISTS promotion_product_tv CASCADE`;
    await sql`DROP TABLE IF EXISTS promotion_product_voice CASCADE`;
    await sql`DROP TABLE IF EXISTS promotion_market CASCADE`;
    await sql`DROP TABLE IF EXISTS market_voice_product CASCADE`;
    await sql`DROP TABLE IF EXISTS market_tv_product CASCADE`;
    await sql`DROP TABLE IF EXISTS market_internet_product CASCADE`;
    await sql`DROP TABLE IF EXISTS promotion_ui_elements CASCADE`;
    await sql`DROP TABLE IF EXISTS product_association_ui_elements CASCADE`;
    await sql`DROP TABLE IF EXISTS ui_elements CASCADE`;
    await sql`DROP TABLE IF EXISTS promotions CASCADE`;
    await sql`DROP TABLE IF EXISTS ui_element_types CASCADE`;
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

    // Create promotions table - remove ui_elements JSONB array as it will now be in a join table
    await sql`
      CREATE TABLE IF NOT EXISTS promotions (
        key TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        start_date TIMESTAMPTZ NOT NULL,
        end_date TIMESTAMPTZ NOT NULL,
        triggers JSONB[] NOT NULL DEFAULT '{}',
        display_order INTEGER NOT NULL DEFAULT 0
      )
    `;
    console.log('✓ Promotions table created');

    // Create promotion_market join table
    await sql`
      CREATE TABLE IF NOT EXISTS promotion_market (
        promotion_key TEXT NOT NULL,
        market_key TEXT NOT NULL,
        PRIMARY KEY (promotion_key, market_key),
        FOREIGN KEY (promotion_key) REFERENCES promotions(key) ON DELETE CASCADE,
        FOREIGN KEY (market_key) REFERENCES markets(key) ON DELETE CASCADE
      )
    `;
    console.log('✓ Promotion-Market join table created');

    // Create promotion-product join tables for each product type
    await sql`
      CREATE TABLE IF NOT EXISTS promotion_product_internet (
        id SERIAL PRIMARY KEY,
        promotion_key TEXT NOT NULL,
        product_key TEXT NOT NULL,
        ui_elements JSONB[] NOT NULL DEFAULT '{}',
        FOREIGN KEY (promotion_key) REFERENCES promotions(key) ON DELETE CASCADE,
        FOREIGN KEY (product_key) REFERENCES internet_products(key) ON DELETE CASCADE,
        UNIQUE(promotion_key, product_key)
      )
    `;
    console.log('✓ Promotion-Internet Product join table created');

    await sql`
      CREATE TABLE IF NOT EXISTS promotion_product_tv (
        id SERIAL PRIMARY KEY,
        promotion_key TEXT NOT NULL,
        product_key TEXT NOT NULL,
        ui_elements JSONB[] NOT NULL DEFAULT '{}',
        FOREIGN KEY (promotion_key) REFERENCES promotions(key) ON DELETE CASCADE,
        FOREIGN KEY (product_key) REFERENCES tv_products(key) ON DELETE CASCADE,
        UNIQUE(promotion_key, product_key)
      )
    `;
    console.log('✓ Promotion-TV Product join table created');

    await sql`
      CREATE TABLE IF NOT EXISTS promotion_product_voice (
        id SERIAL PRIMARY KEY,
        promotion_key TEXT NOT NULL,
        product_key TEXT NOT NULL,
        ui_elements JSONB[] NOT NULL DEFAULT '{}',
        FOREIGN KEY (promotion_key) REFERENCES promotions(key) ON DELETE CASCADE,
        FOREIGN KEY (product_key) REFERENCES voice_products(key) ON DELETE CASCADE,
        UNIQUE(promotion_key, product_key)
      )
    `;
    console.log('✓ Promotion-Voice Product join table created');

    await sql`
      CREATE TABLE IF NOT EXISTS promotion_product_equipment (
        id SERIAL PRIMARY KEY,
        promotion_key TEXT NOT NULL,
        product_key TEXT NOT NULL,
        ui_elements JSONB[] NOT NULL DEFAULT '{}',
        FOREIGN KEY (promotion_key) REFERENCES promotions(key) ON DELETE CASCADE,
        FOREIGN KEY (product_key) REFERENCES equipment(key) ON DELETE CASCADE,
        UNIQUE(promotion_key, product_key)
      )
    `;
    console.log('✓ Promotion-Equipment join table created');

    // Create ui_element_types table
    await sql`
      CREATE TABLE IF NOT EXISTS ui_element_types (
        key TEXT UNIQUE PRIMARY KEY,
        description TEXT,
        type TEXT NOT NULL
      )
    `;
    console.log('✓ UI element types table created');

    // Create ui_elements table
    await sql`
      CREATE TABLE IF NOT EXISTS ui_elements (
        id SERIAL PRIMARY KEY,
        element_type TEXT NOT NULL,
        element_type_type TEXT NOT NULL,
        txt_text TEXT,
        img_desktopImgUrl TEXT,
        img_mobileImgUrl TEXT,
        img_alt TEXT,
        FOREIGN KEY (element_type) REFERENCES ui_element_types(key) ON DELETE CASCADE
      )
    `;
    console.log('✓ UI elements table created');

    // Create promotion_ui_elements join table
    await sql`
      CREATE TABLE IF NOT EXISTS promotion_ui_elements (
        promotion_key TEXT NOT NULL,
        ui_element_id INTEGER NOT NULL,
        PRIMARY KEY (promotion_key, ui_element_id),
        FOREIGN KEY (promotion_key) REFERENCES promotions(key) ON DELETE CASCADE,
        FOREIGN KEY (ui_element_id) REFERENCES ui_elements(id) ON DELETE CASCADE
      )
    `;
    console.log('✓ Promotion-UI Element join table created');

    // Modify product association tables to remove JSONB arrays for ui_elements
    // Create product_association_ui_elements join table
    await sql`
      CREATE TABLE IF NOT EXISTS product_association_ui_elements (
        product_association_id INTEGER NOT NULL,
        product_association_table TEXT NOT NULL,
        ui_element_id INTEGER NOT NULL,
        PRIMARY KEY (product_association_id, product_association_table, ui_element_id),
        FOREIGN KEY (ui_element_id) REFERENCES ui_elements(id) ON DELETE CASCADE
      )
    `;
    console.log('✓ Product Association-UI Element join table created');

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();