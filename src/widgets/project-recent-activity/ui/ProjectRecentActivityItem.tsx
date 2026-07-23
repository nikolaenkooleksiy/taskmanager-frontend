import { cn } from "@/src/shared/lib"
import { Icon } from "@iconify/react"
import { ActivityItem } from "../../../entity/projects/model/types/types"
import { activityIcons, activityLabels } from "../model/const/ACTIVITY"

export const ProjectRecentActivityItem = ({ item }: { item: ActivityItem }) => {
  const config = activityIcons[item.type]

  return (
    <li
      key={item.id}
      className="flex flex-col justify-between gap-1 text-base sm:flex-row sm:items-start"
    >
      <div className="flex items-center gap-2.5">
        <Icon icon={config.icon} className={cn("size-4", config.color)} />

        <div className="flex flex-col">
          <p className="text-foreground">
            <span className="font-medium">{item.user.name}</span>{" "}
            {activityLabels[item.type]}
            <span className="font-medium">{item.target.name}</span>
          </p>

          {item.target.projectName && (
            <span className="text-xs text-muted-foreground">
              in {item.target.projectName}
            </span>
          )}
        </div>
      </div>

      <span className="shrink-0 text-sm text-muted-foreground sm:self-auto">
        {item.createdAt}
      </span>
    </li>
  )
}
