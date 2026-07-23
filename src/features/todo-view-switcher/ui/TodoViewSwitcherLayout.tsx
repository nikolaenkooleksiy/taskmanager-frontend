import { cn } from "@/src/shared/lib"
import { ComponentProps, PropsWithChildren } from "react"

import { Show } from "@/src/shared/ui"
import { motion } from "motion/react"

interface TodoViewSwitcherListItemProps extends ComponentProps<"button"> {
  isActive: boolean
}

export const TodoViewSwitcherLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {children}
    </div>
  )
}

export const TodoViewSwitcherList = ({ children }: PropsWithChildren) => {
  return (
    <ul className="flex items-center gap-1 self-start rounded-lg border bg-muted/40 p-1 sm:self-auto">
      {children}
    </ul>
  )
}

export const TodoViewSwitcherListItem = ({
  children,
  className,
  isActive,
  ...props
}: PropsWithChildren<TodoViewSwitcherListItemProps>) => {
  return (
    <li className="relative">
      <button
        type="button"
        className={cn(
          "relative z-10 flex h-8 w-30 items-center justify-center gap-1.5 rounded-md font-medium transition-colors duration-200",
          isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </button>

      <Show when={isActive}>
        {" "}
        <motion.div
          layoutId="todo-view-switcher-active-bg"
          className="absolute inset-0 z-0 rounded-md bg-neutral-200"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      </Show>
    </li>
  )
}
