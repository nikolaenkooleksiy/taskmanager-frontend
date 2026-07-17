import {
  createProjectAction,
  CreateProjectInput,
  createProjectSchema,
} from "@/src/entity/projects"
import { devIcons } from "@/src/shared/constants"
import { zodResolver } from "@/src/shared/lib/zod-resolver"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const useCreateProject = () => {
  const { teamId } = useParams()

  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: devIcons[0],
    },
    mode: "onSubmit",
  })

  const onSubmit = async (data: CreateProjectInput) => {
    await createProjectAction(teamId as string, data)
    setIsOpen(false)
    form.reset()
  }

  return {
    isOpen,
    setIsOpen,
    onSubmit,
    ...form,
  }
}
