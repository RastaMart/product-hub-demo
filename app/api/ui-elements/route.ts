import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const elements = await sql`SELECT * FROM ui_elements ORDER BY key`;
    return NextResponse.json(elements);
  } catch (error) {
    console.error('Failed to fetch UI elements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch UI elements' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, description, type } = body;
    // Validate input
    if (!key || !description || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if type is valid
    if (!['text', 'image'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "text" or "image"' },
        { status: 400 }
      );
    }

    // Check if key already exists
    const existing = await sql`
      SELECT key FROM ui_elements WHERE key = ${key}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'UI element with this key already exists' },
        { status: 409 }
      );
    }

    // Insert new UI element
    await sql`
      INSERT INTO ui_elements (key, description, type)
      VALUES (${key}, ${description}, ${type})
    `;

    return NextResponse.json({
      success: true,
      data: { key, description, type },
    });
  } catch (error) {
    console.error('Failed to create UI element:', error);
    return NextResponse.json(
      { error: 'Failed to create UI element' },
      { status: 500 }
    );
  }
}
