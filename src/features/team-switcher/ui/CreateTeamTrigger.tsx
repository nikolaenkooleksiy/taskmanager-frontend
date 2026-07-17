import { DropdownMenuItem } from "@/src/shared/ui"
import { PropsWithChildren } from "react"

export const CreateTeamTrigger = ({ children }: PropsWithChildren) => {
  return (
    <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
      {children}
    </DropdownMenuItem>
  )
}
