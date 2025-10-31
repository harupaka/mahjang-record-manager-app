import React from "react";
import {
  Card,
} from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm relative">
        <main>{children}</main>
      </Card>
    </div>
  )
}