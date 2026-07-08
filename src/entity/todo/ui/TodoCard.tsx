"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
} from "@/src/shared/ui"
import { Todo } from "../model/schemas/todo.schema"
import { CalendarDays, EllipsisVertical } from "lucide-react"

interface TodoCardProps {
  todo: Todo
}

export const TodoCard = ({ todo }: TodoCardProps) => {
  return (
    <Card
      className="relative flex h-42.5 justify-between"
      key={todo.id}
      size="sm"
    >
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle>{todo.title}</CardTitle>

        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            className="absolute top-1 right-1 z-10"
            asChild
          >
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground">{todo.description}</p>
      </CardContent>

      <CardFooter className="mt-auto">
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Europe/Kyiv",
          }).format(new Date(todo.createdAt))}
        </p>
      </CardFooter>
    </Card>
  )
}
