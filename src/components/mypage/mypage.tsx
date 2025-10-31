"use client"

import { Mail, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Profile } from '@/lib/types'

type ProfileProps = {
  profile: Profile
}

export default function MyPage({ profile }: ProfileProps) {
  const profileData = profile
  
  const handleCopyId = async() => {
    try {
      if(profileData["public-id"]){
        await navigator.clipboard.writeText(profileData["public-id"])
      }
    } catch(error){
      const err = error as Error
      console.log('Copy error:', err.message)
    }
  }

  return(
    <div>
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
            {profileData['name']}
          </div>
          <div className="text-2xl text-gray-500">
            ID:{profileData["public-id"]}
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
    </div>
  )
}