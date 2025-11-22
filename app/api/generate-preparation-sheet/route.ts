import { NextResponse } from 'next/server';
import { localDb } from '@/lib/db/local-db';
import { getAIProvider } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { candidateId, resumeText } = body;

    if (!candidateId || !resumeText) {
      return NextResponse.json(
        { error: 'candidateId and resumeText are required' },
        { status: 400 }
      );
    }

    // AIで準備シートを生成
    const aiProvider = getAIProvider();
    const result = await aiProvider.generatePreparationSheet(resumeText);

    // データベースに保存
    const data = await localDb.preparationSheets.create({
      candidate_id: candidateId,
      summary: result.summary,
      strengths: result.strengths,
      concerns: result.concerns,
      questions_json: result.questions,
    });

    return NextResponse.json({
      success: true,
      preparationSheet: data,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

