// AI Provider共通インターフェース
export interface AIProvider {
  generateText(prompt: string, systemPrompt?: string): Promise<string>;
  generatePreparationSheet(resumeText: string): Promise<PreparationSheetResult>;
  generateHandoverNotes(
    transcript: string,
    previousContext?: string
  ): Promise<HandoverNotesResult>;
}

// 準備シート生成結果
export interface PreparationSheetResult {
  summary: string;
  strengths: string;
  concerns: string;
  questions: string[];
}

// 申し送り生成結果
export interface HandoverNotesResult {
  ambiguousPoints: string[];
  unresolvedQuestions: string[];
  nextInterviewPoints: string[];
  notes: string;
}

