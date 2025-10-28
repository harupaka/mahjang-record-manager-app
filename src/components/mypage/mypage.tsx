"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Mail, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Profile } from '@/lib/types'
import { User } from '@supabase/supabase-js'
import { fetchUser } from "@/lib/api/auth";
import { fetchProfile } from "@/lib/api/profile";

export default function MyPage() {
  const [clientUser, setClientUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  
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
    
        setProfile(data)
      } catch (error) {
        const err = error as Error
        console.error('Get profile error:', err.message)
        return null
      }
    }

    getProfile()
  }, [])

  const handleCopyId = async() => {
    try {
      if(profile?.["public-id"]){
        await navigator.clipboard.writeText(profile["public-id"])
      }
    } catch(error){
      const err = error as Error
      console.log('Copy error:', err.message)
    }
  }

  return(
    <>
      <header className="flex justify-between items-center">
        <div className="text-4xl font-bold">
          マイページ
        </div>
        <div className="flex items-center">
          <Button variant="outline"><Mail /></Button>
          <Button variant="outline">ログアウト</Button>
        </div>
      </header>
      <div>
        <div>
          <div className="text-3xl font-bold">
            {profile?.name}
          </div>
          <div className="text-2xl text-gray-500">
            ID:{profile?.["public-id"]}
            <Button size="sm" variant="outline" onClick={handleCopyId}><Copy /></Button>
          </div>
        </div>
        <div>
          累計スコア
        </div>
        <div>
          所属しているコミュニティ
        </div>
        <div>
          直近の対戦
        </div>
      </div>
    </>
  )
}