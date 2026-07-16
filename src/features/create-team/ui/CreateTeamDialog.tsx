"use client"

import {
  createTeamAction,
  CreateTeamInput,
  createTeamSchema,
} from "@/src/entity/team"
import { zodResolver } from "@/src/shared/lib/zod-resolver"
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Spinner,
} from "@/src/shared/ui"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

export const CreateTeamDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateTeamInput>({
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
      reset()
    } catch (error) {
      console.error("Failed to create team:", error)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group flex w-full items-center gap-2 rounded-lg p-2 text-left transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <div className="flex size-6 items-center justify-center rounded-md border bg-background transition-colors group-hover:border-foreground">
            <Plus className="size-4" />
          </div>
          <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            Add team
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
          <DialogDescription>
            Create a new team to collaborate with your team members
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </FieldLabel>
                <Input id="name" placeholder="Enter team name" {...field} />
                {fieldState.error && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false)
                reset()
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && <Spinner className="size-4" />}
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
