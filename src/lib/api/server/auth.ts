import { createClient } from '@/lib/supabase/server'

export const fetchUser = async () => {
  const supabase = await createClient()
  const { data: { user }} = await supabase.auth.getUser()

  return user
}