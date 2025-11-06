import { supabase } from "@/lib/supabase/client"
import { User } from '@supabase/supabase-js'

export const fetchProfile = async (user: User) => {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('fixed-id', user.id)
    .single()
  
  if (error) throw error
  return data
}

export const searchSameId = async (id: string) => {
  const { data, error } = await supabase
    .from('profile')
    .select('public-id')
    .eq('public-id', id)
    .maybeSingle()

  if(error) throw error

  return data
}

export const registerProfile = async ({name, publicId, fixedId}: {name: string, publicId: string, fixedId: string | undefined}) => {
  const newData = {
    name: name,
    'public-id': publicId
  }

  const { error } = await supabase
    .from('profile')
    .update(newData)
    .eq('fixed-id', fixedId)

  if(error) throw error
}