import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useFetch<T>(tableName: string, fallbackData: T | null = null) {
  const [data, setData] = useState<T | null>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        const { data: result, error: fetchError } = await supabase.from(tableName).select('*');
        if (fetchError) {
          throw fetchError;
        }
        
        if (isMounted) {
          if (result && result.length > 0) {
            setData(result as T);
          } else {
            setData(fallbackData);
          }
        }
      } catch (err: any) {
        console.warn(`Supabase fetch failed for ${tableName}, falling back to placeholder data.`, err);
        if (isMounted) {
          setError(err);
          setData(fallbackData);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => { isMounted = false; };
  }, [tableName]);

  return { data, loading, error };
}

export async function submitPost(tableName: string, payload: any) {
  try {
    const { data, error } = await supabase.from(tableName).insert([payload]).select();
    if (error) {
      throw error;
    }
    return data;
  } catch (err: any) {
    console.warn(`Supabase submit failed for ${tableName}, simulating success.`, err);
    // Simulate network delay and success if DB is not configured
    await new Promise(resolve => setTimeout(resolve, 800));
    return [payload];
  }
}
