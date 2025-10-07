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
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function InitalizationPage() {
  const [clientUser, setClientUser] = useState<any>(null)
  const [name, setName] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [validName, setValidName] = useState<boolean>(true)
  const [validId, setValidId] = useState<boolean>(true)
  const [errorIdMessage, setErrorIdMessage] = useState<string>('')

  const router = useRouter()

  const getProfile = async () => {
  try {
    const { data: { user }} = await supabase.auth.getUser()
    if(!user){
      console.error('Not Login')
      return
    }
    setClientUser(user)

    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('fixed-id', user.id)
      .single()
    
    if (error) throw error

    setName(data['name'])
    setId(data['public-id'])
  } catch (error) {
    const err = error as Error
    console.error('Get profile error:', err.message)
    return null
  }
}

  useEffect(() => {
    getProfile()
  }, [])

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)

    if(newName.length < 1 || newName.length > 20){
      setValidName(false)
    }
    else{
      setValidName(true)
    }
  }

  const changeId = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const newId = e.target.value
    setId(newId)

    if(!/^[a-zA-Z0-9]+$/.test(newId)){
      setErrorIdMessage('英数字のみです')
      setValidId(false)
      return
    }
    if(newId.length < 1 || newId.length > 20){
      setErrorIdMessage('20字以内です')
      setValidId(false)
      return
    }
    try{
      const { data, error } = await supabase
        .from('profile')
        .select('public-id')
        .eq('public-id', id)
        .maybeSingle()

      if(error) throw error

      if(data) {
        setErrorIdMessage('既に存在しています')
        setValidId(false)
        return
      }
      else{
        setValidId(true)
        return
      }
    } catch(error){
      const err = error as Error
      console.error('Get all profiles error:', err.message)
      return null
    }
  }

  const handleRegister = async () => {
    const newData = {
      name: name,
      'public-id': id
    }

    try{
      const { error } = await supabase
        .from('profile')
        .update(newData)
        .eq('fixed-id', clientUser.id)

      if(error) throw error

      router.push('/mypage')
    } catch(error){
      const err = error as Error
      console.error('Profile Update Error:', err.message)
    }
    
  }

  return(
    <div className="flex justify-center items-center min-h-screen">
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
            <Input value={name} onChange={changeName}/>
            <CardDescription className={cn(!validName ? 'text-red-500':'hidden')}>
              20字以内
            </CardDescription>
          </div>
          <div>
            <Label className="mt-4 mb-2">ID（英数字20字以内）</Label>
            <Input value={id} onChange={changeId}/>
            <CardDescription className={cn(!validId ? 'text-red-500':'hidden')}>
              {errorIdMessage}
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full mt-6 mb-2" onClick={handleRegister} disabled={!validId || !validName}>登録</Button>
        </CardFooter>
      </Card>
    </div>
  )
}