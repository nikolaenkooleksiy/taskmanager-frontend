"use client"
import { PAGES_CONFIG } from "@/src/shared/configs/pages"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Spinner,
} from "@/src/shared/ui"
import { Icon } from "@iconify/react"
import { ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { AUTH_METHODS, AuthMethod } from "../model/const"

export const AuthButton = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [activeMethod, setActiveMethod] = useState<AuthMethod | null>(null)

  const handleSignIn = (type: AuthMethod) => {
    setActiveMethod(type)

    startTransition(() => {
      router.push(PAGES_CONFIG.AUTH[type])
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-30! justify-between!" variant="ghost" size="lg">
          Sign In
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-52 rounded-lg"
        align="center"
        side="bottom"
        sideOffset={4}
      >
        {AUTH_METHODS.map((method) => {
          const isCurrentLoading = isPending && activeMethod === method.id

          return (
            <DropdownMenuItem
              onSelect={() => handleSignIn(method.id)}
              key={method.id}
              className="relative cursor-pointer gap-2.5 pr-8"
              disabled={isPending}
            >
              <Icon icon={method.icon} className="size-4 shrink-0 opacity-70" />
              <span className="text-sm font-medium">{method.name}</span>

              {isCurrentLoading && (
                <Spinner className="absolute top-1/2 right-2.5 size-4 -translate-y-1/2" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
