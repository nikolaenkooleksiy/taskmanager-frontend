import { ProjectRecentActivityListEntry } from "@/src/features/project-recent-activity-list"
import { ProjectRecentFiltersEntry } from "@/src/features/project-recent-filterts"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui"

export const ProjectRecentActivity = () => {
  return (
    <Card className="py-1">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CardTitle>Recent Activity</CardTitle>

        <ProjectRecentFiltersEntry />
      </CardHeader>

      <CardContent>
        <ProjectRecentActivityListEntry />
      </CardContent>
    </Card>
  )
}
