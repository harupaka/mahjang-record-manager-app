import MyPage from "@/components/mypage/mypage"
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

    return profile
  } catch (error) {
    const err = error as Error
    console.error('Get profile error:', err.message)
    return null
  }
}

export default async function Page() {
  const profile = await getProfile()
  console.log(profile)

  if (!profile) {
    return <div>ログインしてください</div>
  }

  return(
    <div>
      <MyPage profile={profile}/>
    </div>
  )
}