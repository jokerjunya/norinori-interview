'use client';

import { useState, useEffect } from 'react';
import { CandidateList } from '@/components/candidates/candidate-list';
import { CandidateForm } from '@/components/candidates/candidate-form';
import type { Candidate } from '@/lib/db/types';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('/api/candidates');
      if (response.ok) {
        const data = await response.json();
        setCandidates(data);
      }
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSuccess = () => {
    setShowForm(false);
    fetchCandidates();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">候補者一覧</h1>
            <p className="mt-2 text-sm text-gray-600">
              面接候補者を管理します
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {showForm ? 'キャンセル' : '新規登録'}
          </button>
        </div>

        {showForm && (
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">候補者登録</h2>
            <CandidateForm onSuccess={handleSuccess} />
          </div>
        )}

        <CandidateList candidates={candidates} />
      </div>
    </div>
  );
}

