import { Button, DialogTrigger } from "@/src/shared/ui"
import { Plus } from "lucide-react"

export const CreateProjectDialogTrigger = () => {
  return (
    <DialogTrigger asChild>
      <Button size="sm" variant="ghost">
        <Plus className="size-3.5" />
      </Button>
    </DialogTrigger>
  )
}
