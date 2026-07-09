"use client"

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/ui"
import { CalendarDays, EllipsisVertical, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { Todo } from "../model/schemas/todo.schema"

interface TodoCardProps {
  todo: Todo

  onDelete: (todoId: string) => Promise<void>
}

export const TodoCard = ({ todo, onDelete }: TodoCardProps) => {
  const router = useRouter()

  return (
    <Card
      className="relative flex h-42.5 justify-between"
      key={todo.id}
      size="sm"
    >
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle className="line-clamp-1">{todo.title}</CardTitle>

        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="absolute top-1 right-1 z-10"
            asChild
          >
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              variant="destructive"
              onClick={async (e) => {
                e.stopPropagation()
                await onDelete(todo.id)
                router.refresh()
              }}
            >
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
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
