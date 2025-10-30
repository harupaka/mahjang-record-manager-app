import Initialization from "@/components/mypage/initialization"
import { fetchUser } from "@/lib/api/server/auth"
import { fetchProfile } from "@/lib/api/client/profile"

async function getProfile() {
  try {
    const user = await fetchUser()
    if(!user){
      console.error('Not Login')
      return
    }

    const profile = await fetchProfile(user);

    return {
            user, 
            profile
          }
  } catch (error) {
    const err = error as Error
    console.error('Get profile error:', err.message)
    return null
  }
}

export default async function InitalizationPage() {
  const userInfo = await getProfile()

  if (!userInfo) {
    return <div>ログインしてください</div>
  }

  return(
    <div>
      <Initialization userInfo={userInfo}/>
    </div>
  )
}