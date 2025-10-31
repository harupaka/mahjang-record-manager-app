import * as z from "zod"

export const SignUpForm = z.object({
  email: z
    .string()
    .min(1, "入力してください")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "有効なメールアドレスを入力して下さい"),
  password: z
    .string()
    .min(8, "8字以上で入力してください")
    .max(20, "20字以内で入力してください")
    .regex(/^[A-Za-z0-9]+$/, "英数字のみ使用可能です")
})

export const SignInForm = z.object({
  email: z
    .string()
    .min(1, "入力してください")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "有効なメールアドレスを入力して下さい"),
  password: z
    .string()
    .min(8, "8字以上で入力してください")
    .max(20, "20字以内で入力してください")
    .regex(/^[A-Za-z0-9]+$/, "英数字のみ使用可能です")
})

export const InitializingForm = z.object({
  name: z
    .string()
    .min(1, "入力してください")
    .max(20, "20字以内で入力してください"),
  id: z
    .string()
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