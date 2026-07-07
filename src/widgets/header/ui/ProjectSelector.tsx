"use client"

import { useState } from "react"

import { ChevronsUpDown, Package, ShoppingCart, FileText } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/src/shared/ui"

const ICONS = {
  package: Package,
  "shopping-cart": ShoppingCart,
  "file-text": FileText,
} as const

const MOCK_PROJECTS = [
  {
    id: "1",
    name: "Task Manager",
    version: "v1.0.0",
    icon: "package" as const,
  },
  {
    id: "2",
    name: "E-commerce",
    version: "v2.1.3",
    icon: "shopping-cart" as const,
  },
  {
    id: "3",
    name: "Blog Platform",
    version: "v0.9.5",
    icon: "file-text" as const,
  },
]

interface ProjectSelectorProps {
  className?: string
}

export const ProjectSelector = ({ className }: ProjectSelectorProps) => {
  const [selectedId, setSelectedId] = useState("1")

  const selectedProject = MOCK_PROJECTS.find((p) => p.id === selectedId)
  const Icon = selectedProject ? ICONS[selectedProject.icon] : Package

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent ${className}`}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted">
          <Icon className="size-4" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-medium">{selectedProject?.name}</span>
          <span className="text-xs text-muted-foreground">
            {selectedProject?.version}
          </span>
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
          {MOCK_PROJECTS.map((project) => (
            <DropdownMenuRadioItem key={project.id} value={project.id}>
              {project.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
