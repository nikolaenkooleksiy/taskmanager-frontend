"use client"

import { Icon } from "@iconify/react"
import { TODO_VIEW_OPTIONS } from "../model/const/TODO_VIEW_OPTIONS"
import { useTodoViewSwitch } from "../model/hooks/useTodoViewSwitch"
import {
  TodoViewSwitcherLayout,
  TodoViewSwitcherList,
  TodoViewSwitcherListItem,
} from "./TodoViewSwitcherLayout"

export const TodoViewSwitcherEntry = () => {
  const { selectedView, handleViewChange } = useTodoViewSwitch()

  return (
    <TodoViewSwitcherLayout>
      <TodoViewSwitcherList>
        {TODO_VIEW_OPTIONS.map((option) => {
          const isActive = selectedView === option.id

          return (
            <TodoViewSwitcherListItem
              onClick={() => handleViewChange(option.id)}
              isActive={isActive}
              key={option.id}
            >
              <Icon icon={option.icon} className="size-4" />
              {option.label}
            </TodoViewSwitcherListItem>
          )
        })}
      </TodoViewSwitcherList>
    </TodoViewSwitcherLayout>
  )
}
