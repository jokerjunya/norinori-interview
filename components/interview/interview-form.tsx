'use client';

import { useState } from 'react';

interface InterviewFormProps {
  candidateId: string;
  onSuccess: () => void;
}

export function InterviewForm({ candidateId, onSuccess }: InterviewFormProps) {
  const [transcript, setTranscript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transcript.trim()) {
      setError('文字起こしを入力してください');
      return;
    }

    setError('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-handover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateId,
          transcript,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '申し送りの生成に失敗しました');
      }

      setTranscript('');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isGenerating}
        className="w-full rounded-md bg-green-600 px-4 py-3 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'AI で申し送り生成中...' : '申し送りを生成して保存'}
      </button>

      {isGenerating && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
          <p className="font-semibold mb-1">AI で分析中です...</p>
          <p className="text-xs">
            面接内容を分析し、次回面接への申し送り事項を生成しています。
            <br />
            この処理には30秒〜1分程度かかる場合があります。
          </p>
        </div>
      )}
    </form>
  );
}

