"use client"

import { signOutAction } from "@/src/entity/user"
import { LogOut } from "lucide-react"
import { ComponentProps } from "react"

export const SignOutButton = ({ ...props }: ComponentProps<"button">) => {
  return (
    <button {...props} onClick={() => signOutAction()}>
      <LogOut />
      Sign Out
    </button>
  )
}
