import { Button } from "@/src/shared/ui"

export const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button type="submit" isLoading={isLoading}>
      Create
    </Button>
  )
}
