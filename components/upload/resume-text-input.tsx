'use client';

import { useState } from 'react';

interface ResumeTextInputProps {
  candidateId: string;
  onSuccess: () => void;
}

export function ResumeTextInput({ candidateId, onSuccess }: ResumeTextInputProps) {
  const [resumeText, setResumeText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!resumeText.trim()) {
      setError('レジュメテキストを入力してください');
      return;
    }

    setError('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-preparation-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateId,
          resumeText,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '準備シートの生成に失敗しました');
      }

      setResumeText('');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="resumeText" className="block mb-2 text-sm font-medium text-gray-900">
          レジュメテキスト
        </label>
        <textarea
          id="resumeText"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="候補者のレジュメをテキストで入力してください

例：
山田太郎
2025年3月卒業予定
〇〇大学 情報工学部
..."
          rows={15}
          className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'AI で準備シート生成中...' : '準備シートを生成'}
      </button>

      {isGenerating && (
        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
          <p className="font-semibold mb-1">AI で分析中です...</p>
          <p className="text-xs">
            レジュメの内容を分析し、面接準備シートを生成しています。
            <br />
            この処理には30秒〜1分程度かかる場合があります。
          </p>
        </div>
      )}
    </div>
  );
}

