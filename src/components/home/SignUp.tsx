import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function SignIn() {
  return(
    <>
      <CardHeader>
        <CardTitle className="flex justify-center items-center">
          新規登録をする
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="mt-4 mb-2">ユーザー名</Label>
          <Input />
        </div>
        <div>
            <Label className="mt-4 mb-2">パスワード</Label>
            <Input type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-6 mb-2">新規登録</Button>
      </CardFooter>
    </>
  )
}