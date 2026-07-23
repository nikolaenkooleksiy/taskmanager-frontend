import { ActivityItem } from "@/src/entity/projects"
import { useState } from "react"

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    type: "task_completed",
    user: { name: "Alexey" },
    target: { name: "Fix JWT refresh token flow", projectName: "Auth Service" },
    createdAt: "10 mins ago",
  },
  {
    id: "act-2",
    type: "project_created",
    user: { name: "Anna" },
    target: { name: "Mobile App Redesign" },
    createdAt: "2 hours ago",
  },
  {
    id: "act-3",
    type: "task_created",
    user: { name: "Devon" },
    target: {
      name: "Setup Prisma migrations",
      projectName: "Interview Trainer",
    },
    createdAt: "5 hours ago",
  },
  {
    id: "act-4",
    type: "task_created",
    user: { name: "Devon" },
    target: {
      name: "Setup Prisma migrations",
      projectName: "Interview Trainer",
    },
    createdAt: "5 hours ago",
  },
  {
    id: "act-5",
    type: "task_created",
    user: { name: "Devon" },
    target: {
      name: "Setup Prisma migrations",
      projectName: "Interview Trainer",
    },
    createdAt: "5 hours ago",
  },
  {
    id: "act-6",
    type: "task_created",
    user: { name: "Devon" },
    target: {
      name: "Setup Prisma migrations",
      projectName: "Interview Trainer",
    },
    createdAt: "5 hours ago",
  },
]

export const useProjectRecentActivities = () => {
  const [activities, setActivities] = useState(MOCK_ACTIVITIES)

  return {
    activities,
  }
}
