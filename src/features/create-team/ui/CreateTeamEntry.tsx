"use client"

import { Dialog, DialogContent, DialogFooter } from "@/src/shared/ui"
import { useCreateTeam } from "../model/hooks/useCreateTeam"
import { CancelButton } from "./CancelButton"
import { CreateTeamDialogHeader } from "./CreateTeamDialogHeader"
import { CreateTeamDialogTrigger } from "./CreateTeamDialogTrigger"
import { SubmitButton } from "./SubmitButton"
import { TeamTitleField } from "./TeamTitleField"

export const CreateTeamEntry = () => {
  const {
    control,
    handleOpenChange,
    handleSubmit,
    isOpen,
    onSubmit,
    isDisabled,
  } = useCreateTeam()

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <CreateTeamDialogTrigger />

      <DialogContent className="sm:max-w-125">
        <CreateTeamDialogHeader />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <TeamTitleField control={control} />
          <DialogFooter>
            <CancelButton
              handleClose={() => handleOpenChange(false)}
              isDisabled={isDisabled}
            />

            <SubmitButton isDisabled={isDisabled} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
