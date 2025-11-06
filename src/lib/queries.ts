import { fetchUser } from "@/lib/api/server/auth"
import { fetchProfile } from "@/lib/api/client/profile"

export const getProfile = async() => {
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