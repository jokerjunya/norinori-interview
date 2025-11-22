'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { PreparationSheet } from '@/lib/db/types';

interface PageProps {
  params: Promise<{ id: string; sheetId: string }>;
}

export default function EditPreparationSheetPage({ params }: PageProps) {
  const router = useRouter();
  const [candidateId, setCandidateId] = useState<string>('');
  const [sheetId, setSheetId] = useState<string>('');
  const [sheet, setSheet] = useState<PreparationSheet | null>(null);
  const [summary, setSummary] = useState('');
  const [strengths, setStrengths] = useState('');
  const [concerns, setConcerns] = useState('');
  const [questions, setQuestions] = useState<string[]>(['', '', '']);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    params.then((p) => {
      setCandidateId(p.id);
      setSheetId(p.sheetId);
    });
  }, [params]);

  useEffect(() => {
    if (!sheetId) return;

    const fetchSheet = async () => {
      try {
        const response = await fetch(`/api/preparation-sheets/${sheetId}`);
        if (!response.ok) {
          throw new Error('面接準備シートの取得に失敗しました');
        }
        const data: PreparationSheet = await response.json();
        setSheet(data);
        setSummary(data.summary || '');
        setStrengths(data.strengths || '');
        setConcerns(data.concerns || '');
        
        // questions_jsonを配列に変換
        const questionsArray = Array.isArray(data.questions_json) 
          ? data.questions_json 
          : ['', '', ''];
        setQuestions(questionsArray.length >= 3 ? questionsArray : [...questionsArray, '', '', ''].slice(0, 3));
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSheet();
  }, [sheetId]);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      const response = await fetch(`/api/preparation-sheets/${sheetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: summary.trim() || null,
          strengths: strengths.trim() || null,
          concerns: concerns.trim() || null,
          questions: questions.filter(q => q.trim()).length > 0 
            ? questions.filter(q => q.trim()) 
            : null,
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

  if (error && !sheet) {
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
          <h1 className="text-3xl font-bold text-gray-900">面接準備シートを編集</h1>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                概要
              </label>
              <textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
                placeholder="候補者の経歴や特徴の概要"
              />
            </div>

            <div>
              <label htmlFor="strengths" className="block text-sm font-medium text-gray-700 mb-2">
                強み
              </label>
              <textarea
                id="strengths"
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                rows={4}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
                placeholder="- 技術スキル&#10;- 経験&#10;- 強みのポイント"
              />
            </div>

            <div>
              <label htmlFor="concerns" className="block text-sm font-medium text-gray-700 mb-2">
                懸念点
              </label>
              <textarea
                id="concerns"
                value={concerns}
                onChange={(e) => setConcerns(e.target.value)}
                rows={4}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
                placeholder="- 経験不足の領域&#10;- 確認が必要な点&#10;- 懸念事項"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                確認すべき質問
              </label>
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <input
                    key={index}
                    type="text"
                    value={question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
                    placeholder={`質問 ${index + 1}`}
                  />
                ))}
              </div>
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
                className="flex-1 rounded-md bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSaving ? '保存中...' : '更新する'}
              </button>
              <Link
                href={`/candidates/${candidateId}`}
                className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

