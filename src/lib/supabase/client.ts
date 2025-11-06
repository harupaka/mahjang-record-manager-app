// lib/supabase.js

import { createBrowserClient } from '@supabase/ssr'

// クライアント用（ブラウザで使用、RLS適用）
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)