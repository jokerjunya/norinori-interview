import { NextResponse } from 'next/server';
import { localDb } from '@/lib/db/local-db';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET: 候補者詳細取得（準備シートと面接記録も含む）
export async function GET(request: Request, context: Params) {
  try {
    const { id } = await context.params;

    const candidate = await localDb.candidates.findById(id);
    if (!candidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const preparationSheets = await localDb.preparationSheets.findByCandidateId(id);
    const interviewRecords = await localDb.interviewRecords.findByCandidateId(id);

    return NextResponse.json({
      candidate,
      preparationSheets,
      interviewRecords,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE: 候補者削除
export async function DELETE(request: Request, context: Params) {
  try {
    const { id } = await context.params;
    const success = await localDb.candidates.delete(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

