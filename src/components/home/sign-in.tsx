"use client"

import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { ChevronLeftIcon } from "lucide-react"
import { signInUser } from "@/lib/api/client/auth"
import { useForm } from 'react-hook-form'
import { SignInForm } from "@/lib/types"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type FormData = z.infer<typeof SignInForm>

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(SignInForm)
  })

  const [signInError, setSignInError] = useState<boolean>(false)

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    try{
      await signInUser(data)

      router.push('/mypage')
    } catch(error){
      setSignInError(true)
      const err = error as Error
      console.error('SignIn Error:', err.message)
    }
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button variant="secondary" size="icon" className="absolute top-4 left-4 size-8" onClick={() => router.push('/')}>
        <ChevronLeftIcon />
      </Button>
      <CardHeader>
        <CardTitle className="flex justify-center items-center">
          ログインする
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="mt-4 mb-2" >メールアドレス</Label>
          <Input {...register('email')}/>
          <CardDescription className="mb-2">
            {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
          </CardDescription>
        </div>
        <div>
          <Label className="mt-4 mb-2">パスワード</Label>
          <Input type="password" {...register('password')}/>
        </div>
        <CardDescription className={cn(signInError ? 'text-red-500':'hidden')}>
          メールアドレスかパスワードが間違っています。
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full mt-6 mb-2">ログイン</Button>
      </CardFooter>
    </form>
  )
}