'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';
import type { Candidate, PreparationSheet, InterviewRecord } from '@/lib/db/types';

interface CandidateData {
  candidate: Candidate;
  preparationSheets: PreparationSheet[];
  interviewRecords: InterviewRecord[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CandidateDetailPage({ params }: PageProps) {
  const [id, setId] = useState<string>('');
  const [data, setData] = useState<CandidateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/candidates/${id}`);
        if (!response.ok) {
          throw new Error('候補者情報の取得に失敗しました');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || '候補者が見つかりません'}</p>
          <Link
            href="/candidates"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            候補者一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const { candidate, preparationSheets, interviewRecords } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="mb-6">
          <Link
            href="/candidates"
            className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← 候補者一覧に戻る
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
              {candidate.email && (
                <p className="mt-1 text-gray-600">{candidate.email}</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                登録日: {formatDateTime(candidate.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="mb-8 flex gap-4">
          <Link
            href={`/candidates/${candidate.id}/upload-resume`}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            レジュメを入力
          </Link>
          <Link
            href={`/candidates/${candidate.id}/add-interview`}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            面接記録を追加
          </Link>
        </div>

        {/* 準備シート一覧 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">面接準備シート</h2>
          {preparationSheets.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
              まだ準備シートが作成されていません
            </div>
          ) : (
            <div className="space-y-4">
              {preparationSheets.map((sheet) => (
                <div
                  key={sheet.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs text-gray-500 mb-3">
                    作成日: {formatDateTime(sheet.created_at)}
                  </p>
                  {sheet.summary && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">概要</h3>
                      <p className="text-sm text-gray-600">{sheet.summary}</p>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-4">
                    {sheet.strengths && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">強み</h3>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">
                          {sheet.strengths}
                        </p>
                      </div>
                    )}
                    {sheet.concerns && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">懸念点</h3>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">
                          {sheet.concerns}
                        </p>
                      </div>
                    )}
                  </div>
                  {sheet.questions_json && (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        確認すべき質問
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {(sheet.questions_json as string[]).map((question, idx) => (
                          <li key={idx}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 面接記録一覧 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">面接記録</h2>
          {interviewRecords.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
              まだ面接記録が登録されていません
            </div>
          ) : (
            <div className="space-y-4">
              {interviewRecords.map((record) => (
                <div
                  key={record.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs text-gray-500 mb-3">
                    面接日: {formatDateTime(record.created_at)}
                  </p>
                  {record.handover_notes && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        次回面接への申し送り
                      </h3>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {record.handover_notes}
                      </p>
                    </div>
                  )}
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-semibold text-gray-700">
                      文字起こし全文を見る
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
                      {record.transcript}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
