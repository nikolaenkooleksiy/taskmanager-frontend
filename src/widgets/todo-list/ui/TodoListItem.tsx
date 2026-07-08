"use client"

import { Todo, TodoCard } from "@/src/entity/todo"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/shared/ui"
import { useState } from "react"

export const TodoListItem = ({ todo }: { todo: Todo }) => {
  const [isOpen, setIsOpen] = useState(false)


  const formattedDate = new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(todo.createdAt))

  return (
    <li>
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <div className="cursor-pointer">
            <TodoCard todo={todo} />
          </div>
        </DrawerTrigger>

        <DrawerContent className="mx-auto w-full! px-2 pb-4 sm:max-w-120! sm:px-4 md:max-w-170!">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-2xl">{todo.title}</DrawerTitle>
            <DrawerDescription className="mt-4 text-base wrap-break-word whitespace-pre-wrap text-muted-foreground">
              {todo.description || " Опис відсутній"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 py-4 text-sm text-muted-foreground">
            <p>Створено: {formattedDate}</p>
          </div>
        </DrawerContent>
      </Drawer>
    </li>
  )
}
