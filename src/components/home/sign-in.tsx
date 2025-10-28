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
import { signInUser } from "@/lib/api/auth"

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [signInError, setSignInError] = useState<boolean>(false)

  const router = useRouter()

  const handleSignIn = async () => {
    try{
      const data = await signInUser({email, password})

      router.push('/mypage')

      return data
    } catch(error){
      setEmail('')
      setPassword('')
      setSignInError(true)
      const err = error as Error
      console.error('Sign In error:', err.message)
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
          ログインする
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="mt-4 mb-2" >メールアドレス</Label>
          <Input onChange={(e) => {setEmail(e.target.value)}}/>
        </div>
        <div>
          <Label className="mt-4 mb-2">パスワード</Label>
          <Input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <CardDescription className={cn(signInError ? 'text-red-500':'hidden')}>
          メールアドレスかパスワードが間違っています。
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-6 mb-2" onClick={handleSignIn}>ログイン</Button>
      </CardFooter>
    </div>
  )
}