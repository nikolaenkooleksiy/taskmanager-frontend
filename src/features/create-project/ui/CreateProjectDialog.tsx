"use client"

import {
  createProjectAction,
  CreateProjectInput,
  createProjectSchema,
} from "@/src/entity/projects"
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
  Textarea,
} from "@/src/shared/ui"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

export const CreateProjectDialog = () => {
  const { teamId } = useParams()

  const [isOpen, setIsOpen] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onSubmit",
  })

  const onSubmit = async (data: CreateProjectInput) => {
    await createProjectAction(teamId as string, data)
    setIsOpen(false)
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Plus className="size-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </FieldLabel>
                <Input id="name" placeholder="Enter project name" {...field} />
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
                  placeholder="Enter project description (optional)"
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
            <Button type="submit" disabled={isSubmitting}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
