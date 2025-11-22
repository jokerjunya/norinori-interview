import { NextResponse } from 'next/server';
import { localDb } from '@/lib/db/local-db';
import { getAIProvider } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { candidateId, transcript } = body;

    if (!candidateId || !transcript) {
      return NextResponse.json(
        { error: 'candidateId and transcript are required' },
        { status: 400 }
      );
    }

    // 前回までの準備シートと面接記録を取得（文脈として利用）
    const preparationSheets = await localDb.preparationSheets.findByCandidateId(candidateId);
    const previousRecords = await localDb.interviewRecords.findByCandidateId(candidateId);

    // 前回までの文脈を構築
    let previousContext = '';
    if (preparationSheets.length > 0) {
      const sheet = preparationSheets[0];
      previousContext += `【候補者概要】\n${sheet.summary || ''}\n\n`;
      if (sheet.strengths) {
        previousContext += `【強み】\n${sheet.strengths}\n\n`;
      }
      if (sheet.concerns) {
        previousContext += `【懸念点】\n${sheet.concerns}\n\n`;
      }
    }
    if (previousRecords.length > 0 && previousRecords[0].handover_notes) {
      previousContext += `【前回の申し送り】\n${previousRecords[0].handover_notes}\n`;
    }

    // AIで申し送りを生成
    const aiProvider = getAIProvider();
    const result = await aiProvider.generateHandoverNotes(
      transcript,
      previousContext || undefined
    );

    // 申し送りを整形
    const handoverNotes = `【曖昧だった点・矛盾】
${result.ambiguousPoints.map((point, idx) => `${idx + 1}. ${point}`).join('\n')}

【未解消の質問】
${result.unresolvedQuestions.map((q, idx) => `${idx + 1}. ${q}`).join('\n')}

【次回深掘るべき論点】
${result.nextInterviewPoints.map((point, idx) => `${idx + 1}. ${point}`).join('\n')}

【その他の申し送り】
${result.notes}`;

    // データベースに保存
    const data = await localDb.interviewRecords.create({
      candidate_id: candidateId,
      transcript,
      handover_notes: handoverNotes,
    });

    return NextResponse.json({
      success: true,
      interviewRecord: data,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

