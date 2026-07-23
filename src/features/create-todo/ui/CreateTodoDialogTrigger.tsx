import { Button, DialogTrigger } from "@/src/shared/ui"
import { Icon } from "@iconify/react"

export const CreateTodoDialogTrigger = () => {
  return (
    <DialogTrigger asChild>
      <Button>
        <Icon icon="lucide:plus" className="size-4" />
        Create Task
      </Button>
    </DialogTrigger>
  )
}
