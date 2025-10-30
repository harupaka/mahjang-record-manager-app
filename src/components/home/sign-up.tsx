"use client"

import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { ChevronLeftIcon } from "lucide-react"
import { signUpUser } from "@/lib/api/client/auth"

export default function SignUp() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [checkEmail, setCheckEmail] = useState<boolean>(false)
  const [checkPw, setCheckPw] = useState<boolean>(false)

  const router = useRouter()

  const checkValidEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(newEmail !== '' && emailPattern.test(newEmail)){
      setCheckEmail(true)
    }
    else{
      setCheckEmail(false)
    }
  }

  const checkValidPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)

    if(newPassword.length >= 8 && newPassword.length <= 20){
      setCheckPw(true)
    }
    else{
      setCheckPw(false)
    }
  }

  const handleSignUp = async () => {
    try {
      const data = await signUpUser({email, password})

      await new Promise(resolve => setTimeout(resolve, 100))

      router.push('/mypage/initialization')

      return data
    } catch(error){
      const err = error as Error
      console.error('Sign Up error:', err.message)
      return null
    }
  }

  return(
    <div>
      <Button variant="secondary" size="icon" className="absolute top-4 left-4 size-8" onClick={() => router.push('/')}>
        <ChevronLeftIcon />
      </Button>
      <CardHeader>
        <CardTitle className="flex justify-center items-center">
          新規登録をする
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="mt-4 mb-2">メールアドレス</Label>
          <Input onChange={checkValidEmail} className={cn(email === '' ? 'border-gray-300 bg-white' : checkEmail ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')}/>
        </div>
        <div>
          <Label className="mt-4 mb-2">パスワード</Label>
          <Input type="password" onChange={checkValidPw} className={cn(password === '' ? 'border-gray-300 bg-white' : checkPw ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')}/>
          <CardDescription className="mb-2">
            ※8字以上20字以下
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-6 mb-2" onClick={handleSignUp} disabled={!checkEmail || !checkPw}>新規登録</Button>
      </CardFooter>
    </div>
  )
}