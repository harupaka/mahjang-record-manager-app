import Initialization from "@/components/mypage/initialization"
import { getProfile } from "@/lib/queries"

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