import { Button, Input } from "@/src/shared/ui"
import { Icon } from "@iconify/react"
import { ComponentProps, PropsWithChildren } from "react"

export const ProjectRecentFiltersLayoutRoot = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
      {children}
    </div>
  )
}

export const ProjectRecentSearchBar = ({
  ...props
}: ComponentProps<typeof Input>) => {
  return (
    <div className="relative w-full sm:w-auto lg:w-50">
      <Icon
        icon="lucide:search"
        className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="text"
        placeholder="Search activity..."
        className="w-full pl-8"
        {...props}
      />
    </div>
  )
}

export const ProjectRecentFilterList = ({ children }: PropsWithChildren) => {
  return (
    <ul className="flex max-w-full items-center gap-1 overflow-x-auto p-1">
      {children}
    </ul>
  )
}

export const FilterItem = ({ children }: PropsWithChildren) => {
  return (
    <Button className="shrink-0" type="button" variant="ghost">
      {children}
    </Button>
  )
}

export const ProjectRecentFiltersLayout = Object.assign(
  ProjectRecentFiltersLayoutRoot,
  {
    ProjectRecentSearchBar,
    ProjectRecentFilterList,
    FilterItem,
  }
)
