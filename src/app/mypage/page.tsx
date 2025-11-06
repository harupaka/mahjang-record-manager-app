import MyPage from "@/components/mypage/mypage"
import { getProfile } from "@/lib/queries"

export default async function Page() {
  const userInfo = await getProfile()

  if (!userInfo) {
    return <div>ログインしてください</div>
  }

  return(
    <div>
      <MyPage userInfo={userInfo}/>
    </div>
  )
}