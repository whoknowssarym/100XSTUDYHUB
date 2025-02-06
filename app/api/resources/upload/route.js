import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { put } from '@vercel/blob';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const description = formData.get('description');
    const type = formData.get('type');
    const subjectId = formData.get('subjectId');
    const universityId = formData.get('universityId');
    const categoryId = formData.get('categoryId');

    if (!file || !title || !type || !subjectId || !universityId || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upload file to blob storage
    const blob = await put(file.name, file, {
      access: 'public',
    });

    // Create resource in database
    const result = await sql`
      INSERT INTO resources (
        title, description, type, subject_id, 
        university_id, category_id, file_url
      )
      VALUES (
        ${title}, ${description}, ${type}, ${subjectId}, 
        ${universityId}, ${categoryId}, ${blob.url}
      )
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}