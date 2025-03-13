import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const promotions = await sql`SELECT * FROM promotions ORDER BY start_date DESC`;
    return NextResponse.json(promotions);
  } catch (error) {
    console.error('Failed to fetch promotions:', error);
    return NextResponse.json({ error: 'Failed to fetch promotions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, startDate, endDate, triggers, products, markets, ui_elements } = body;

    // Validate required fields
    if (!name || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate a unique key based on name and date
    const key = `${name.replace(/[^a-zA-Z0-9]/g, '')}-${new Date(startDate).getFullYear()}`;

    // Insert new promotion
    const result = await sql`
      INSERT INTO promotions (
        id,
        key,
        name,
        start_date,
        end_date,
        triggers,
        products,
        markets,
        ui_elements
      )
      VALUES (
        ${crypto.randomUUID()},
        ${key},
        ${name},
        ${startDate},
        ${endDate},
        ${triggers || []},
        ${products || []},
        ${markets || []},
        ${ui_elements || []}
      )
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Failed to create promotion:', error);
    return NextResponse.json(
      { error: 'Failed to create promotion' },
      { status: 500 }
    );
  }
}