import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const resources = await query(
      `SELECT r.*, s.name as subject_name, c.name as category_name 
       FROM resources r 
       JOIN subjects s ON r.subject_id = s.id 
       JOIN categories c ON r.category_id = c.id 
       ORDER BY r.download_count DESC 
       LIMIT 8`
    );
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}