"use client"

import {
  CreateTodoInput,
  createTodoAction,
  createTodoSchema,
} from "@/src/entity/todo"
import { zodResolver } from "@/src/shared/lib/zod-resolver"
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Spinner,
  Textarea,
} from "@/src/shared/ui"
import { Plus } from "lucide-react"
import dynamic from "next/dynamic"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

export const CreateTodoDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { projectId } = useParams()

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CreateTodoInput>({
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
    reset()
  }

  const isDisabled = !isValid

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </FieldLabel>
                <Input id="title" placeholder="Enter task title" {...field} />
                {fieldState.error && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Field>
                <FieldLabel className="" htmlFor="description">
                  Description
                </FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Enter task description (optional)"
                  className="min-h-20 resize-none"
                  {...field}
                  value={field.value || ""}
                />
              </Field>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={isDisabled} type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export const CreateTodoDialogLazy = dynamic(
  () =>
    import("@/src/features/create-todo/ui/CreateTodoDialog").then(
      (mod) => mod.CreateTodoDialog
    ),
  {
    ssr: false,
    loading: () => (
      <Button disabled>
        <Spinner className="size-4" />
        Create Task
      </Button>
    ),
  }
)
