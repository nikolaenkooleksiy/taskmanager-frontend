"use client"

import { ScrollArea, ScrollBar, Show } from "@/src/shared/ui"
import { ProjectRecentActivityItem } from "@/src/widgets/project-recent-activity/ui/ProjectRecentActivityItem"
import { Icon } from "@iconify/react"
import { useProjectRecentActivities } from "../model/hooks/useProjectRecentActivities"

export const ProjectRecentActivityListEntry = () => {
  const { activities } = useProjectRecentActivities()

  return (
    <ScrollArea className="h-80">
      <Show when={!!activities.length}>
        <ul className="flex flex-col gap-4 pr-3">
          {activities.map((item) => {
            return <ProjectRecentActivityItem key={item.id} item={item} />
          })}
        </ul>
      </Show>

      <Show when={!activities.length}>
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-2 text-muted-foreground">
          <Icon icon="lucide:inbox" className="size-12" />
          <p>No recent activity</p>
        </div>
      </Show>
      <ScrollBar />
    </ScrollArea>
  )
}
