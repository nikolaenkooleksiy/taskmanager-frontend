import { Project } from "@/src/entity/projects"
import { ActionResult } from "@/src/shared/types"
import { useSidebar } from "@/src/shared/ui"
import { useParams } from "next/navigation"
import { use } from "react"

export const useProjectNavigation = (
  projectsPromise: Promise<ActionResult<Project[]>>
) => {
  const { isMobile } = useSidebar()
  const { teamId } = useParams()

  const result = use(projectsPromise)
  const projects = result.success ? (result.data ?? []) : []

  return {
    isMobile,
    teamId: teamId as string,
    projects,
  }
}
