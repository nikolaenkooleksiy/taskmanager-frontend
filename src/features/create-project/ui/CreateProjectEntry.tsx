"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/ui"
import { useCreateProject } from "../model/hooks/useCreateProject"
import { CancelButton } from "./CancelButton"
import { CreateProjectDialogTrigger } from "./CreateProjectDialogTrigger"
import { ProjectDescriptionField } from "./ProjectDescriptionField"
import { ProjectIconPicker } from "./ProjectIconPicker"
import { ProjectTitleField } from "./ProjectTitleField"
import { SubmitButton } from "./SubmitButton"

export const CreateProjectEntry = () => {
  const { control, formState, handleSubmit, isOpen, onSubmit, setIsOpen } =
    useCreateProject()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectDialogTrigger />

      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col items-center sm:items-start gap-5 sm:flex-row">
            <ProjectIconPicker control={control} />
            <div className="flex flex-1 flex-col gap-4">
              <ProjectTitleField control={control} />

              <ProjectDescriptionField control={control} />
            </div>
          </div>

          <DialogFooter>
            <CancelButton onClick={() => setIsOpen(false)} />
            <SubmitButton isLoading={formState.isSubmitting} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
