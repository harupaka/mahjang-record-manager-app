import { SignInForm, SignUpForm } from "@/lib/types"
import { supabase } from "@/lib/supabase/client"
import z from "zod"
type SignUpType = z.infer<typeof SignUpForm>
type SignInType = z.infer<typeof SignInForm>

export const signUpUser = async ({email, password}: SignUpType) => {
  const {data, error} = await supabase.auth.signUp({email, password})

  if(error) throw error

  return data
}

export const signInUser = async({email, password}: SignInType) => {
  const { data, error } = await supabase.auth.signInWithPassword({email, password})

  if(error) throw error

  return data
}