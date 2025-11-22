'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { InterviewForm } from '@/components/interview/interview-form';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AddInterviewPage({ params }: PageProps) {
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
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href={`/candidates/${id}`}
            className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← 候補者詳細に戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">面接記録の追加</h1>
          <p className="mt-2 text-sm text-gray-600">
            面接の文字起こしを入力すると、AI が次回面接への申し送り事項を自動生成します
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <InterviewForm candidateId={id} onSuccess={handleSuccess} />
        </div>

        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
          <h3 className="text-sm font-semibold text-green-900 mb-2">
            📝 申し送りには以下の内容が含まれます
          </h3>
          <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
            <li>回答の曖昧点や矛盾</li>
            <li>未解消の質問</li>
            <li>次回面接で深掘るべき論点</li>
            <li>その他の引き継ぎ事項</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

