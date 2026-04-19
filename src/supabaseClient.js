import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or anon key is not configured. Please add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to .env.local.');
}

if (process.env.NODE_ENV === 'development') {
  console.log('Supabase client config:', {
    supabaseUrl,
    anonKeyLoaded: !!supabaseAnonKey,
    anonKeyLength: supabaseAnonKey ? supabaseAnonKey.length : 0,
  });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
