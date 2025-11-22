import { NextResponse } from 'next/server';
import { localDb } from '@/lib/db/local-db';

// GET: 候補者一覧取得
export async function GET() {
  try {
    const data = await localDb.candidates.findAll();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: 新規候補者登録
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const data = await localDb.candidates.create({
      name,
      email: email || null,
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

