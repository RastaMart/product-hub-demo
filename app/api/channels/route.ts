import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const channels = await sql`SELECT * FROM channels ORDER BY channel_number`;
    return NextResponse.json(channels);
  } catch (error) {
    console.error('Failed to fetch channels:', error);
    return NextResponse.json({ error: 'Failed to fetch channels' }, { status: 500 });
  }
}