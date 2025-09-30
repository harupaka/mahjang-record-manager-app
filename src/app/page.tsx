"use client"

import { useState } from "react"
import { ChevronLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import SignIn from "@/components/home/SignIn"
import SignUp from "@/components/home/SignUp"

export default function Home() {
  const [startPage, setStartPage] = useState(true)
  const [signUpPage, setSignUpPage] = useState(false)
  const [signInPage, setSignInPage] = useState(false)

  const transitionSignUp = () => {
    setStartPage(false)
    setSignUpPage(true)
  }

  const transitionSignIn = () => {
    setStartPage(false)
    setSignInPage(true)
  }

  const transitionStartPage = () => {
    setStartPage(true)
    setSignUpPage(false)
    setSignInPage(false)
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm relative">
        <Button style={{display: !startPage ? '' : 'none'}} onClick={transitionStartPage} variant="secondary" size="icon" className="absolute top-4 left-4 size-8">
          <ChevronLeftIcon />
        </Button>
        <div style={{display: startPage ? 'block' : 'none'}}>
          <CardHeader>
            <CardTitle className="flex justify-center items-center">ようこそ</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex justify-center mt-4 mb-2">
              アカウントをお持ちでない方はこちら
            </CardDescription>
            <Button onClick={transitionSignUp} className="w-full">
              新規登録
            </Button>
            <CardDescription className="flex justify-center mt-4 mb-2">
              既にアカウントをお持ちの方はこちら
            </CardDescription>
            <Button onClick={transitionSignIn} className="w-full">
              ログイン
            </Button>
          </CardContent>
          <CardFooter className="flex-col gap-2">
          </CardFooter>
        </div>
        <div style={{display: signInPage ? 'block' : 'none'}}>
          <SignIn />
        </div>
        <div style={{display: signUpPage ? 'block' : 'none'}}>
          <SignUp />
        </div>
      </Card>
    </div>
  );
}
