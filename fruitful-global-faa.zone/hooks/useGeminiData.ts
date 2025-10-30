import { useState, useCallback, useEffect } from 'react';

interface UseGeminiDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export const useGeminiData = <T,>(fetcher: () => Promise<T | null>): UseGeminiDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      if (result) {
        setData(result);
      } else {
        setError(`Failed to generate data. The response was empty or invalid.`);
      }
    } catch (e) {
      setError('An error occurred while fetching the data.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
};
