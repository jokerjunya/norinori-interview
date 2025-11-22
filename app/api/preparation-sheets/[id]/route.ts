import { NextResponse } from 'next/server';
import { localDb } from '@/lib/db/local-db';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET: 面接準備シート取得
export async function GET(request: Request, context: Params) {
  try {
    const { id } = await context.params;

    const sheet = await localDb.preparationSheets.findById(id);
    if (!sheet) {
      return NextResponse.json(
        { error: 'Preparation sheet not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(sheet);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT: 面接準備シート更新
export async function PUT(request: Request, context: Params) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const { summary, strengths, concerns, questions } = body;

    // バリデーション
    if (!summary && !strengths && !concerns && !questions) {
      return NextResponse.json(
        { error: 'At least one field must be provided' },
        { status: 400 }
      );
    }

    const updatedSheet = await localDb.preparationSheets.update(id, {
      summary: summary ?? null,
      strengths: strengths ?? null,
      concerns: concerns ?? null,
      questions_json: questions ?? null,
    });

    if (!updatedSheet) {
      return NextResponse.json(
        { error: 'Preparation sheet not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSheet);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

