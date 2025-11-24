"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, Loader2 } from "lucide-react";
import { signUpUser } from "@/lib/api/client/auth";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormSchema } from "@/lib/types";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof FormSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      await signUpUser(data);

      router.push("/mypage/initialization");
    } catch (error) {
      setIsLoading(false);

      const err = error as Error;
      console.error("SignUp Error:", err.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 size-8"
        asChild
      >
        <Link href="/">
          <ChevronLeftIcon />
        </Link>
      </Button>
      <CardHeader>
        <CardTitle className="flex justify-center items-center">
          新規登録をする
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="mt-4 mb-2">メールアドレス</Label>
          <Input {...register("email")} />
          <CardDescription className="mb-2">
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </CardDescription>
        </div>
        <div>
          <Label className="mt-4 mb-2">パスワード</Label>
          <Input type="password" {...register("password")} />
          <CardDescription className="mb-2">
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
            ※8字以上20字以下
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full mt-6 mb-2" disabled={isLoading}>
          新規登録
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        </Button>
      </CardFooter>
    </form>
  );
}
