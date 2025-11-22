'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { InterviewRecord } from '@/lib/db/types';

interface PageProps {
  params: Promise<{ id: string; recordId: string }>;
}

export default function EditInterviewRecordPage({ params }: PageProps) {
  const router = useRouter();
  const [candidateId, setCandidateId] = useState<string>('');
  const [recordId, setRecordId] = useState<string>('');
  const [record, setRecord] = useState<InterviewRecord | null>(null);
  const [transcript, setTranscript] = useState('');
  const [handoverNotes, setHandoverNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    params.then((p) => {
      setCandidateId(p.id);
      setRecordId(p.recordId);
    });
  }, [params]);

  useEffect(() => {
    if (!recordId) return;

    const fetchRecord = async () => {
      try {
        const response = await fetch(`/api/interview-records/${recordId}`);
        if (!response.ok) {
          throw new Error('面接記録の取得に失敗しました');
        }
        const data: InterviewRecord = await response.json();
        setRecord(data);
        setTranscript(data.transcript || '');
        setHandoverNotes(data.handover_notes || '');
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecord();
  }, [recordId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transcript.trim()) {
      setError('文字起こしを入力してください');
      return;
    }

    setError('');
    setIsSaving(true);

    try {
      const response = await fetch(`/api/interview-records/${recordId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: transcript.trim(),
          handover_notes: handoverNotes.trim() || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '更新に失敗しました');
      }

      router.push(`/candidates/${candidateId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (error && !record) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            href={`/candidates/${candidateId}`}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            候補者詳細に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href={`/candidates/${candidateId}`}
            className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← 候補者詳細に戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">面接記録を編集</h1>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="transcript" className="block text-sm font-medium text-gray-700 mb-2">
                面接の文字起こし <span className="text-red-500">*</span>
              </label>
              <textarea
                id="transcript"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                required
                rows={15}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 font-mono text-sm"
                placeholder="面接官: 本日はお時間いただきありがとうございます。&#10;候補者: よろしくお願いします。&#10;面接官: まず、志望動機について教えていただけますか？&#10;候補者: ..."
              />
              <p className="mt-1 text-xs text-gray-500">
                面接の内容をテキスト形式で入力してください
              </p>
            </div>

            <div>
              <label htmlFor="handoverNotes" className="block text-sm font-medium text-gray-700 mb-2">
                次回面接への申し送り
              </label>
              <textarea
                id="handoverNotes"
                value={handoverNotes}
                onChange={(e) => setHandoverNotes(e.target.value)}
                rows={10}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
                placeholder="【総合評価】&#10;...&#10;&#10;【次回確認事項】&#10;...&#10;&#10;【懸念点】&#10;..."
              />
              <p className="mt-1 text-xs text-gray-500">
                総合評価、次回確認事項、懸念点などを記載してください
              </p>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 rounded-md bg-green-600 px-4 py-3 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSaving ? '保存中...' : '更新する'}
              </button>
              <Link
                href={`/candidates/${candidateId}`}
                className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                キャンセル
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

