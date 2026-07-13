"use client"

import { Project } from "@/src/entity/projects"
import { CreateTodoDialog } from "@/src/features/create-project"
import { cn } from "@/src/shared/lib"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui"
import { ChevronsUpDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ProjectSelectorProps {
  className?: string
  projects: Project[]
}

export const ProjectSelector = ({
  className,
  projects,
}: ProjectSelectorProps) => {
  const pathname = usePathname()

  const selectedId = pathname.replace("/project/", "")

  const selectedProject = projects.find((p) => p.id === selectedId)

  return (
    <>
      {projects.length ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            className={cn(
              "flex w-35 items-center justify-between gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent",
              className
            )}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{selectedProject?.name}</span>
            </div>
            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuSeparator />

            <DropdownMenuRadioGroup value={selectedId}>
              {projects.map((project) => (
                <DropdownMenuRadioItem
                  className="p-0"
                  key={project.id}
                  value={project.id}
                >
                  <Link className="p-2" href={`/project/${project.id}`}>
                    {project.name}
                  </Link>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />

            <CreateTodoDialog className="w-full" buttonVariant="ghost" />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <CreateTodoDialog />
      )}
    </>
  )
}
