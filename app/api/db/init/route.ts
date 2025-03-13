import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const createdTables = [];
    const existingTables = [];

    // Create markets table if not exists
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS markets (
          id TEXT PRIMARY KEY,
          label TEXT NOT NULL,
          code TEXT NOT NULL UNIQUE,
          active BOOLEAN NOT NULL DEFAULT true,
          snapshot_id TEXT,
          product_keys TEXT[],
          audience_value TEXT
        )
      `;
      createdTables.push('markets');
    } catch (e) {
      existingTables.push('markets');
    }

    // Create internet_products table if not exists
    try {
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
      createdTables.push('internet_products');
    } catch (e) {
      existingTables.push('internet_products');
    }

    // Create channels table if not exists
    try {
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
      createdTables.push('channels');
    } catch (e) {
      existingTables.push('channels');
    }

    // Create tv_products table if not exists
    try {
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
      createdTables.push('tv_products');
    } catch (e) {
      existingTables.push('tv_products');
    }

    // Create voice_products table if not exists
    try {
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
      createdTables.push('voice_products');
    } catch (e) {
      existingTables.push('voice_products');
    }

    // Create equipment table if not exists
    try {
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
      createdTables.push('equipment');
    } catch (e) {
      existingTables.push('equipment');
    }

    // Create promotions table if not exists
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS promotions (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          start_date TIMESTAMPTZ NOT NULL,
          end_date TIMESTAMPTZ NOT NULL,
          types JSONB[] NOT NULL DEFAULT '{}',
          product_packages JSONB[] NOT NULL DEFAULT '{}',
          markets TEXT[] NOT NULL DEFAULT '{}',
          ui_elements JSONB[] NOT NULL DEFAULT '{}'
        )
      `;
      createdTables.push('promotions');
    } catch (e) {
      existingTables.push('promotions');
    }

    // Create ui_elements table if not exists
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS ui_elements (
          key TEXT PRIMARY KEY,
          description TEXT NOT NULL,
          type TEXT NOT NULL CHECK (type IN ('text', 'image'))
        )
      `;
      createdTables.push('ui_elements');
    } catch (e) {
      existingTables.push('ui_elements');
    }

    // Prepare response message
    let message = '';
    if (createdTables.length > 0) {
      message += `Created tables: ${createdTables.join(', ')}. `;
    }
    if (existingTables.length > 0) {
      message += `Skipped existing tables: ${existingTables.join(', ')}.`;
    }

    return NextResponse.json({ 
      success: true, 
      message: message.trim() || 'No tables were created or modified.',
      created: createdTables,
      existing: existingTables
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to initialize database',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}