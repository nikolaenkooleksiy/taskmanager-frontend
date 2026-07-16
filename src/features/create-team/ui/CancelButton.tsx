import { Button } from "@/src/shared/ui"

interface CancelButtonProps {
  handleClose: () => void
  isDisabled: boolean
}

export const CancelButton = ({
  handleClose,
  isDisabled,
}: CancelButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClose}
      disabled={isDisabled}
    >
      Cancel
    </Button>
  )
}
