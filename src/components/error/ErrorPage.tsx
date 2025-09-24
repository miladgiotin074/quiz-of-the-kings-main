import { useEffect } from 'react';
import { useDelayedAction } from '@/hooks/useDelayedAction';

export function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
  const executeWithDelay = useDelayedAction(200);

  const handleReset = () => {
    if (reset) {
      executeWithDelay(reset);
    }
  };
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>An unhandled error occurred!</h2>
      <blockquote>
        <code>
          {error.message}
        </code>
      </blockquote>
      {reset && <button onClick={handleReset}>Try again</button>}
    </div>
  );
}