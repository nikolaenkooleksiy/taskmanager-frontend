import { Project } from "@/src/entity/projects"
import { useSidebar } from "@/src/shared/ui"
import { useParams } from "next/navigation"
import { use } from "react"

export const useProjectNavigation = (projectsPromise: Promise<Project[]>) => {
  const { isMobile } = useSidebar()
  const { teamId } = useParams()

  const projects = use(projectsPromise)

  return {
    isMobile,
    teamId: teamId as string,
    projects,
  }
}
