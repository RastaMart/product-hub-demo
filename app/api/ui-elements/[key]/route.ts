import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;

    // Check if the UI element exists
    const existing = await sql`
      SELECT key FROM ui_elements WHERE key = ${key}
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'UI element not found' },
        { status: 404 }
      );
    }

    // Delete the UI element
    await sql`
      DELETE FROM ui_elements
      WHERE key = ${key}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete UI element:', error);
    return NextResponse.json(
      { error: 'Failed to delete UI element' },
      { status: 500 }
    );
  }
}