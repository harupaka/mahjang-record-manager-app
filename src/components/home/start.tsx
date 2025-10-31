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
import Link from 'next/link'

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
            <Button className="w-full" asChild>
              <Link href='/sign-up'>
                新規登録
              </Link>
            </Button>
            <CardDescription className="flex justify-center mt-4 mb-2">
              既にアカウントをお持ちの方はこちら
            </CardDescription>
            <Button className="w-full" asChild>
              <Link href='sign-in'>
                ログイン
              </Link>
            </Button>
          </CardContent>
          <CardFooter className="flex-col gap-2">
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}