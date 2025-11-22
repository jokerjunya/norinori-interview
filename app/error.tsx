'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/components/ui/error';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <ErrorPage
      message={error.message || '予期せぬエラーが発生しました'}
      action={{
        label: '再試行',
        onClick: reset,
      }}
    />
  );
}

