import { useState, useEffect } from 'react';

const API_URL = '/api';

export function useFetch<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}${endpoint}`, {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json.data);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [endpoint]);

  return { data, loading, error };
}

export async function submitPost(endpoint: string, payload: any) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
}
