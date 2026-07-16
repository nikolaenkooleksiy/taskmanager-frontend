"use client"

import { Button } from "@/src/shared/ui"

interface SubmitButtonProps {
  isDisabled: boolean
}

export const SubmitButton = ({ isDisabled }: SubmitButtonProps) => {
  return (
    <Button isLoading={isDisabled} type="submit">
      Create
    </Button>
  )
}
