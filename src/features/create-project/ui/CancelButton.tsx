import { Button } from "@/src/shared/ui"

export const CancelButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button type="button" variant="outline" onClick={onClick}>
      Cancel
    </Button>
  )
}
