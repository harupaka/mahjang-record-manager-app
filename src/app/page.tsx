"use client"

import { useState } from "react"
import { ChevronLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignIn from "@/components/home/sign-in"
import SignUp from "@/components/home/sign-up"
import { cn } from "@/lib/utils"

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
        <Button onClick={transitionStartPage} variant="secondary" size="icon" className={cn(!startPage ? "absolute top-4 left-4 size-8" : "hidden")}>
          <ChevronLeftIcon />
        </Button>
        <div className={cn(startPage ? "" : "hidden")}>
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
        <div className={cn(signInPage ? "" : "hidden")}>
          <SignIn />
        </div>
        <div className={cn(signUpPage ? "" : "hidden")}>
          <SignUp />
        </div>
      </Card>
    </div>
  );
}
