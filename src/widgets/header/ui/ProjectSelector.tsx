"use client"

import { useState } from "react"

import { Project } from "@/src/entity/projects"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui"
import { ChevronsUpDown } from "lucide-react"

interface ProjectSelectorProps {
  className?: string
  projects: Project[]
}

export const ProjectSelector = ({
  className,
  projects,
}: ProjectSelectorProps) => {
  const [selectedId, setSelectedId] = useState("")

  const selectedProject = projects.find((p) => p.id === selectedId)

  return (
    <>
      {projects.length ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent ${className}`}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{selectedProject?.name}</span>
            </div>
            <ChevronsUpDown className="ml-4 size-4 shrink-0 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Projects</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedId}
              onValueChange={setSelectedId}
            >
              {projects.map((project) => (
                <DropdownMenuRadioItem key={project.id} value={project.id}>
                  {project.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button>Create Project </Button>
      )}
    </>
  )
}
