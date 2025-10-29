"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { User } from '@supabase/supabase-js'
import { fetchUser } from "@/lib/api/auth"
import { fetchProfile, searchSameId, registerProfile } from "@/lib/api/profile"
import { InitializingForm } from "@/lib/types"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"

type FormData = z.infer<typeof InitializingForm>

export default function Initialization() {
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(InitializingForm)
  })
  const [clientUser, setClientUser] = useState<User | null>(null)
  const [originalId, setOriginalId] = useState<string>("")

  const router = useRouter()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const user = await fetchUser()
        if(!user){
          console.error('Not Login')
          return
        }
        setClientUser(user)

        const data = await fetchProfile(user);

        const currentId = data['public-id'] || ""
        setOriginalId(currentId)
        
        reset({
          name: data['name'],
          id: data['public-id']
        })
      } catch (error) {
        const err = error as Error
        console.error('Get profile error:', err.message)
        return null
      }
    }

    getProfile()
  }, [])

  const onSubmit = async (data: FormData) => {
    if (data.id !== originalId) {
      const exists = await searchSameId(data.id)
      if (exists) {
        setError('id', {
          type: 'manual',
          message: 'このIDは既に使用されています'
        })
        return
      }
    }
    try{
      await registerProfile({name: data.name, publicId: data.id, fixedId: clientUser?.id})

      router.push('/mypage')
    } catch(error){
      const err = error as Error
      console.error('Profile Update Error:', err.message)
    }
    
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm relative">
        <CardHeader>
          <CardTitle className="flex justify-center items-center">
            初期設定
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            表示名とIDを変更してください
          </div>
          <CardDescription>
            後からでも変更できます
          </CardDescription>
          <div>
            <Label className="mt-4 mb-2" >表示名（20字以内）</Label>
            <Input {...register('name')}/>
            <CardDescription>
              {errors.name && <div className='text-red-500'>{errors.name.message}</div>}
            </CardDescription>
          </div>
          <div>
            <Label className="mt-4 mb-2">ID（英数字20字以内）</Label>
            <Input {...register('id')}/>
            <CardDescription>
              {errors.id && <div className='text-red-500'>{errors.id.message}</div>}
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full mt-6 mb-2">登録</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
