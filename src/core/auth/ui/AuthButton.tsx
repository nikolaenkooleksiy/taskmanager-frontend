import { PAGES_CONFIG } from "@/src/shared/configs/pages"
import { Button } from "@/src/shared/ui"
import Link from "next/link"
import { FiGithub } from "react-icons/fi"

interface AuthButtonProps {
  className?: string
}

export const AuthButton = ({ className }: AuthButtonProps) => {
  return (
    <Button asChild className={` ${className}`}>
      <Link href={PAGES_CONFIG.AUTH.GITHUB_OAUTH}>
        <span>Sign in</span> <FiGithub />
      </Link>
    </Button>
  )
}
