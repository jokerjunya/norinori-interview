import type { AIProvider, PreparationSheetResult, HandoverNotesResult } from './types';

export class LocalLLMProvider implements AIProvider {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://127.0.0.1:1234') {
    this.baseUrl = baseUrl;
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  async generatePreparationSheet(resumeText: string): Promise<PreparationSheetResult> {
    const systemPrompt = `あなたは新卒採用の面接官をサポートするAIアシスタントです。
候補者のレジュメを分析し、面接準備に役立つ情報を提供してください。
結果はJSON形式で返してください。`;

    const prompt = `以下のレジュメを分析して、面接準備シートを作成してください。

【レジュメ】
${resumeText}

【出力形式】
以下のJSON形式で出力してください：
{
  "summary": "候補者の概要（200-300字程度）",
  "strengths": "強みと注目ポイント（箇条書き、改行区切り）",
  "concerns": "懸念点や確認が必要な点（箇条書き、改行区切り）",
  "questions": ["面接で確認すべき質問1", "質問2", "質問3"]
}`;

    const response = await this.generateText(prompt, systemPrompt);
    
    try {
      const jsonMatch = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) || 
                       response.match(/(\{[\s\S]*\})/);
      
      if (!jsonMatch) {
        throw new Error('JSON形式の応答が見つかりませんでした');
      }
      
      const parsed = JSON.parse(jsonMatch[1]);
      return {
        summary: parsed.summary || '',
        strengths: parsed.strengths || '',
        concerns: parsed.concerns || '',
        questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('AI応答の解析に失敗しました');
    }
  }

  async generateHandoverNotes(
    transcript: string,
    previousContext?: string
  ): Promise<HandoverNotesResult> {
    const systemPrompt = `あなたは新卒採用の面接官をサポートするAIアシスタントです。
面接の文字起こしを分析し、次回面接への申し送り事項を整理してください。
結果はJSON形式で返してください。`;

    const contextSection = previousContext 
      ? `【前回までの情報】\n${previousContext}\n\n` 
      : '';

    const prompt = `${contextSection}【今回の面接文字起こし】
${transcript}

上記の面接内容を分析し、次回面接への申し送り事項を作成してください。

【出力形式】
以下のJSON形式で出力してください：
{
  "ambiguousPoints": ["曖昧だった点や矛盾1", "曖昧だった点2"],
  "unresolvedQuestions": ["未解消の質問1", "未解消の質問2"],
  "nextInterviewPoints": ["次回深掘るべき論点1", "論点2"],
  "notes": "その他の申し送り事項（自由記述）"
}`;

    const response = await this.generateText(prompt, systemPrompt);
    
    try {
      const jsonMatch = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) || 
                       response.match(/(\{[\s\S]*\})/);
      
      if (!jsonMatch) {
        throw new Error('JSON形式の応答が見つかりませんでした');
      }
      
      const parsed = JSON.parse(jsonMatch[1]);
      return {
        ambiguousPoints: Array.isArray(parsed.ambiguousPoints) ? parsed.ambiguousPoints : [],
        unresolvedQuestions: Array.isArray(parsed.unresolvedQuestions) ? parsed.unresolvedQuestions : [],
        nextInterviewPoints: Array.isArray(parsed.nextInterviewPoints) ? parsed.nextInterviewPoints : [],
        notes: parsed.notes || '',
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('AI応答の解析に失敗しました');
    }
  }
}

