"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/ui"
import { useCreateTodo } from "../model/hooks/useCreateTodo"
import { CancelButton } from "./CancelButton"
import { CreateTodoDescriptionField } from "./CreateTodoDescriptionField"
import { CreateTodoDialogTrigger } from "./CreateTodoDialogTrigger"
import { CreateTodoTitleField } from "./CreateTodoTitleField"
import { SubmitButton } from "./SubmitButton"

export const CreateTodoDialogEntry = () => {
  const {
    isOpen,
    setIsOpen,
    handleSubmit,
    onSubmit,
    control,
    isButtonNotAvailable,
  } = useCreateTodo()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <CreateTodoDialogTrigger />

      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <CreateTodoTitleField control={control} />

          <CreateTodoDescriptionField control={control} />

          <DialogFooter>
            <CancelButton
              handleClose={() => setIsOpen(false)}
              isDisabled={isButtonNotAvailable}
            />
            <SubmitButton isDisabled={isButtonNotAvailable} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
