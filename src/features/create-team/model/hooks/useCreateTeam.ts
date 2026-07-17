import {
  createTeamAction,
  CreateTeamInput,
  createTeamSchema,
} from "@/src/entity/team"
import { zodResolver } from "@/src/shared/lib/zod-resolver"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const useCreateTeam = () => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const form = useForm<CreateTeamInput>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (data: CreateTeamInput) => {
    try {
      await createTeamAction(data)
      setIsOpen(false)
      form.reset()
      router.refresh()
    } catch (error) {
      console.error("Failed to create team:", error)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      form.reset()
    }
  }

  const isDisabled = form.formState.isSubmitting

  return {
    isOpen,
    setIsOpen,
    handleOpenChange,
    onSubmit,
    isDisabled,
    ...form,
  }
}
