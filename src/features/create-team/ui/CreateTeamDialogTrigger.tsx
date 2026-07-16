import { DialogTrigger } from "@/src/shared/ui"
import { Plus } from "lucide-react"

export const CreateTeamDialogTrigger = () => {
  return (
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
  )
}
