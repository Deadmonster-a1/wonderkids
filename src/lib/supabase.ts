import { createClient } from '@supabase/supabase-js';

// @ts-expect-error
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bsaagkhfiiwnehjazrbb.supabase.co';
// @ts-expect-error
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
