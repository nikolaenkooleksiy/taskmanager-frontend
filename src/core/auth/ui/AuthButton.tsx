"use client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { PAGES_CONFIG } from "@/src/shared/configs/pages"
import { Button, Spinner } from "@/src/shared/ui"
import { FiGithub } from "react-icons/fi"
import { Loader2 } from "lucide-react"
interface AuthButtonProps {
  className?: string
}

export const AuthButton = ({ className }: AuthButtonProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSignIn = () => {
    startTransition(() => {
      router.push(PAGES_CONFIG.AUTH.GITHUB_OAUTH)
    })
  }

  return (
    <Button onClick={handleSignIn} disabled={isPending} className={className}>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <span>Sign in</span> <FiGithub />
        </>
      )}
    </Button>
  )
}
