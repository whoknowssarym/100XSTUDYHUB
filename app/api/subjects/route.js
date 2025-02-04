import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const subjects = await query(`
      SELECT 
        s.*,
        COUNT(r.id) as resource_count
      FROM subjects s
      LEFT JOIN resources r ON s.id = r.subject_id
      GROUP BY s.id
      ORDER BY s.name ASC
    `);
    return NextResponse.json(subjects);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}