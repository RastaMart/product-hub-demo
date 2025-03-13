import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const markets = await sql`SELECT * FROM markets ORDER BY label`;
    return NextResponse.json(markets);
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return NextResponse.json({ error: 'Failed to fetch markets' }, { status: 500 });
  }
}