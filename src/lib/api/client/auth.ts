import { SignInForm, SignUpForm } from "@/lib/types"
import { supabase } from "@/lib/supabase/client"
import * as z from "zod"

export type SignUpParams = z.infer<typeof SignUpForm>
export type SignInParams = z.infer<typeof SignInForm>

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