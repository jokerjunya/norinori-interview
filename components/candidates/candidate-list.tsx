'use client';

import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';
import type { Candidate } from '@/lib/db/types';

interface CandidateListProps {
  candidates: Candidate[];
}

export function CandidateList({ candidates }: CandidateListProps) {
  if (candidates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">候補者がまだ登録されていません</p>
        <p className="text-sm text-gray-400 mt-2">
          右上のボタンから候補者を登録してください
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {candidates.map((candidate) => (
        <Link
          key={candidate.id}
          href={`/candidates/${candidate.id}`}
          className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {candidate.name}
          </h3>
          {candidate.email && (
            <p className="mt-1 text-sm text-gray-600">{candidate.email}</p>
          )}
          <p className="mt-3 text-xs text-gray-400">
            登録日: {formatDateTime(candidate.created_at)}
          </p>
        </Link>
      ))}
    </div>
  );
}

