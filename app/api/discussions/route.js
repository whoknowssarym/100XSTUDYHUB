import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const resourceId = searchParams.get('resourceId');

  try {
    const result = await sql`
      SELECT 
        d.*,
        u.name as user_name,
        u.email as user_email
      FROM discussions d
      JOIN users u ON d.user_id = u.id
      WHERE d.resource_id = ${resourceId}
      ORDER BY d.created_at DESC
    `;
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { content, resourceId } = await request.json();
    
    const result = await sql`
      INSERT INTO discussions (content, resource_id, user_id)
      VALUES (${content}, ${resourceId}, ${session.user.id})
      RETURNING *
    `;
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}