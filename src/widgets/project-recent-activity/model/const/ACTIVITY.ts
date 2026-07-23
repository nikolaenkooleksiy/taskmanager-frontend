import { ActivityType } from "../../../../entity/projects/model/types/types"

export const activityIcons: Record<
  ActivityType,
  { icon: string; color: string }
> = {
  task_completed: { icon: "lucide:check-circle-2", color: "text-emerald-500" },
  task_created: { icon: "lucide:plus-circle", color: "text-blue-500" },
  project_created: { icon: "lucide:folder-plus", color: "text-purple-500" },
  member_joined: { icon: "lucide:user-plus", color: "text-amber-500" },
}

export const activityLabels: Record<ActivityType, string> = {
  task_completed: "completed task",
  task_created: "created task",
  project_created: "created project",
  member_joined: "joined",
}
