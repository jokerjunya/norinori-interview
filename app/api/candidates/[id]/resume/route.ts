import { NextResponse } from 'next/server';
import { localDb } from '@/lib/db/local-db';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// PATCH: レジュメテキスト更新
export async function PATCH(request: Request, context: Params) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { resumeText } = body;

    if (resumeText === undefined) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    const candidate = await localDb.candidates.findById(id);
    if (!candidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const updated = await localDb.candidates.update(id, {
      resume_text: resumeText,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

