import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const products = await sql`SELECT * FROM equipment ORDER BY name`;
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch equipment:', error);
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 });
  }
}