import { PropsWithChildren } from "react"

interface ShowProps extends PropsWithChildren {
  when: boolean
}

export const Show = ({ children, when }: ShowProps) => {
  return when ? <>{children}</> : null
}
