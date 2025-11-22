'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ResumeTextInput } from '@/components/upload/resume-text-input';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UploadResumePage({ params }: PageProps) {
  const [id, setId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  const handleSuccess = () => {
    if (id) {
      router.push(`/candidates/${id}`);
    }
  };

  if (!id) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">読み込み中...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href={`/candidates/${id}`}
            className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← 候補者詳細に戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">レジュメ入力</h1>
          <p className="mt-2 text-sm text-gray-600">
            候補者のレジュメをテキストで入力すると、AI が自動で面接準備シートを生成します
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <ResumeTextInput candidateId={id} onSuccess={handleSuccess} />
        </div>

        <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <h3 className="text-sm font-semibold text-yellow-900 mb-2">
            📋 準備シートには以下の内容が含まれます
          </h3>
          <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
            <li>候補者の概要サマリー</li>
            <li>強みと注目ポイント</li>
            <li>懸念点や確認が必要な事項</li>
            <li>面接で確認すべき質問リスト</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

