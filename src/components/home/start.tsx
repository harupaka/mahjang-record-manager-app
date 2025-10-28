"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'

export default function StartPage() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm relative">
        <div>
          <CardHeader>
            <CardTitle className="flex justify-center items-center">ようこそ</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex justify-center mt-4 mb-2">
              アカウントをお持ちでない方はこちら
            </CardDescription>
            <Button className="w-full" onClick={() => router.push('/sign-up')}>
              新規登録
            </Button>
            <CardDescription className="flex justify-center mt-4 mb-2">
              既にアカウントをお持ちの方はこちら
            </CardDescription>
            <Button className="w-full" onClick={() => router.push('/sign-in')}>
              ログイン
            </Button>
          </CardContent>
          <CardFooter className="flex-col gap-2">
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}