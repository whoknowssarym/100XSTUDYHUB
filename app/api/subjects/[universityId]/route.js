import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { universityId } = params;

  try {
    const result = await sql`
      SELECT * FROM subjects 
      WHERE university_id = ${universityId}
      ORDER BY code ASC
    `;
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}