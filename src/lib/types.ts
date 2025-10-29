import * as z from "zod"

export interface SignUpParams {
  email: string
  password: string
}

export interface SignInParams {
  email: string
  password: string
}

export const InitializingForm = z.object({
  name: z.string()
          .min(1, "入力してください")
          .max(20, "20字以内で入力してください"),
  id: z.string()
        .min(1, "入力してください")
        .max(20, "20字以内で入力してください")
        .regex(/^[A-Za-z0-9]+$/, "英数字のみ使用可能です"),
})

export interface Profile {
  'fixed-id': string
  'public-id': string
  name: string
  'total-score': number
}