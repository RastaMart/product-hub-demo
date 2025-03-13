import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    // Test the connection by running a simple query
    const data = await sql`SELECT NOW()`;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      timestamp: data[0].now 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to connect to database',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}