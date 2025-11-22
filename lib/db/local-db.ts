import type { Candidate, PreparationSheet, InterviewRecord } from './types';

// インメモリデータストア
const candidates: Map<string, Candidate> = new Map();
const preparationSheets: Map<string, PreparationSheet> = new Map();
const interviewRecords: Map<string, InterviewRecord> = new Map();

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const localDb = {
  // 候補者
  candidates: {
    async findAll(): Promise<Candidate[]> {
      return Array.from(candidates.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
    async findById(id: string): Promise<Candidate | null> {
      return candidates.get(id) || null;
    },
    async create(data: { name: string; email?: string | null }): Promise<Candidate> {
      const now = new Date().toISOString();
      const candidate: Candidate = {
        id: generateId(),
        name: data.name,
        email: data.email || null,
        resume_file_url: null,
        created_at: now,
        updated_at: now,
      };
      candidates.set(candidate.id, candidate);
      return candidate;
    },
    async update(id: string, data: Partial<Candidate>): Promise<Candidate | null> {
      const candidate = candidates.get(id);
      if (!candidate) return null;
      const updated = { ...candidate, ...data, updated_at: new Date().toISOString() };
      candidates.set(id, updated);
      return updated;
    },
    async delete(id: string): Promise<boolean> {
      return candidates.delete(id);
    },
  },

  // 準備シート
  preparationSheets: {
    async findByCandidateId(candidateId: string): Promise<PreparationSheet[]> {
      return Array.from(preparationSheets.values())
        .filter((sheet) => sheet.candidate_id === candidateId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    async create(data: {
      candidate_id: string;
      summary?: string | null;
      strengths?: string | null;
      concerns?: string | null;
      questions_json?: any;
    }): Promise<PreparationSheet> {
      const sheet: PreparationSheet = {
        id: generateId(),
        candidate_id: data.candidate_id,
        summary: data.summary || null,
        strengths: data.strengths || null,
        concerns: data.concerns || null,
        questions_json: data.questions_json || null,
        created_at: new Date().toISOString(),
      };
      preparationSheets.set(sheet.id, sheet);
      return sheet;
    },
  },

  // 面接記録
  interviewRecords: {
    async findByCandidateId(candidateId: string): Promise<InterviewRecord[]> {
      return Array.from(interviewRecords.values())
        .filter((record) => record.candidate_id === candidateId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    async create(data: {
      candidate_id: string;
      transcript: string;
      handover_notes?: string | null;
    }): Promise<InterviewRecord> {
      const record: InterviewRecord = {
        id: generateId(),
        candidate_id: data.candidate_id,
        transcript: data.transcript,
        handover_notes: data.handover_notes || null,
        created_at: new Date().toISOString(),
      };
      interviewRecords.set(record.id, record);
      return record;
    },
  },
};

