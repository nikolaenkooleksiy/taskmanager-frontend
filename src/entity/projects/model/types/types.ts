export type ActivityType =
  "task_completed" | "task_created" | "project_created" | "member_joined"

export interface ActivityItem {
  id: string
  type: ActivityType
  user: { name: string }
  target: { name: string; projectName?: string }
  createdAt: string
}
