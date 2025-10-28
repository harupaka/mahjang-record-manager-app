import { supabase } from "@/lib/supabase"
import { SignInParams, SignUpParams } from "@/lib/types"

export const signUpUser = async ({email, password}: SignUpParams) => {
  const {data, error} = await supabase.auth.signUp({email, password})

  if(error) throw error
  return data
}

export const signInUser = async({email, password}: SignInParams) => {
  const { data, error } = await supabase.auth.signInWithPassword({email, password})

  if(error) throw error
  return data
}

export const fetchUser = async () => {
  const { data: { user }} = await supabase.auth.getUser()

  return user
}