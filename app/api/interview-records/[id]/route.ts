import { NextResponse } from 'next/server';
import { localDb } from '@/lib/db/local-db';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET: 面接記録取得
export async function GET(request: Request, context: Params) {
  try {
    const { id } = await context.params;

    const record = await localDb.interviewRecords.findById(id);
    if (!record) {
      return NextResponse.json(
        { error: 'Interview record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT: 面接記録更新
export async function PUT(request: Request, context: Params) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const { transcript, handover_notes } = body;

    // バリデーション
    if (!transcript && handover_notes === undefined) {
      return NextResponse.json(
        { error: 'At least one field must be provided' },
        { status: 400 }
      );
    }

    if (transcript !== undefined && !transcript.trim()) {
      return NextResponse.json(
        { error: 'Transcript cannot be empty' },
        { status: 400 }
      );
    }

    const updatedRecord = await localDb.interviewRecords.update(id, {
      transcript: transcript ?? undefined,
      handover_notes: handover_notes ?? null,
    });

    if (!updatedRecord) {
      return NextResponse.json(
        { error: 'Interview record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

