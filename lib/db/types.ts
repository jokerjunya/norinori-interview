export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Candidate {
  id: string
  name: string
  email: string | null
  resume_file_url: string | null
  created_at: string
  updated_at: string
}

export interface PreparationSheet {
  id: string
  candidate_id: string
  summary: string | null
  strengths: string | null
  concerns: string | null
  questions_json: Json | null
  created_at: string
}

export interface InterviewRecord {
  id: string
  candidate_id: string
  transcript: string
  handover_notes: string | null
  created_at: string
}

