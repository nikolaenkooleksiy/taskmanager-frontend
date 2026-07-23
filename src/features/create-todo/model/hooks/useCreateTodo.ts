import {
  createTodoAction,
  CreateTodoInput,
  createTodoSchema,
} from "@/src/entity/todo"
import { zodResolver } from "@/src/shared/lib/zod-resolver"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const useCreateTodo = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { projectId } = useParams()

  const form = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onSubmit",
  })

  const onSubmit = async (data: CreateTodoInput) => {
    await createTodoAction(projectId as string, data)
    setIsOpen(false)
    form.reset()
  }

  const isButtonNotAvailable = form.formState.isSubmitting

  return {
    isOpen,
    setIsOpen,
    onSubmit,
    isButtonNotAvailable,
    ...form,
  }
}
