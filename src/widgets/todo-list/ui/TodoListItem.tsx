"use client"

import {
  Todo,
  TodoCard,
  UpdateTodoInput,
  updateTodoSchema,
} from "@/src/entity/todo"
import { zodResolver } from "@/src/shared/lib/zod-resolver"
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Textarea,
} from "@/src/shared/ui"
import { CalendarDays, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { deleteTodoAction } from "@/src/entity/todo/api/delete-todo.action"
import { API_URL } from "@/src/shared/constants"
import { cn, useDebounce } from "@/src/shared/lib"
import { useCompletion } from "@ai-sdk/react"
import { toast } from "sonner"

export const TodoListItem = ({ todo }: { todo: Todo }) => {
  const [isOpen, setIsOpen] = useState(false)

  const formattedDate = new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(todo.createdAt))

  const { control, watch, setValue } = useForm<UpdateTodoInput>({
    defaultValues: {
      description: todo.description,
      title: todo.title,
    },
    resolver: zodResolver(updateTodoSchema),
    mode: "onSubmit",
  })

  const [todoTitle, todoDescription] = watch(["title", "description"])

  const isInitialRender = useRef(true)
  const watchedValues = watch()
  const debouncedJson = useDebounce(JSON.stringify(watchedValues), 500)

  useEffect(() => {
    if (!isInitialRender.current) {
      const save = async () => {
        toast.success("Todo updated successfully", { id: "update-todo" })
      }
      save()
    }
    isInitialRender.current = false
  }, [debouncedJson, todo.id])

  const { completion, complete, isLoading } = useCompletion({
    api: `${API_URL}/todo/generate-description/${todo.id}`,

    credentials: "include",
    streamProtocol: "text",
  })

  useEffect(() => {
    if (completion) {
      setValue("description", completion, {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }, [completion, setValue])

  return (
    <li>
      <Drawer direction="bottom" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <div className="cursor-pointer">
            <TodoCard onDelete={deleteTodoAction} todo={todo} />
          </div>
        </DrawerTrigger>

        <DrawerContent className="mx-auto h-full! max-h-max! w-full! overflow-y-auto rounded-none sm:max-h-125! lg:max-h-150! lg:max-w-205!">
          <DrawerHeader className="flex flex-row justify-between border-b p-2">
            <ul className="flex flex-col gap-4 text-muted-foreground sm:flex-row">
              <li className="flex items-center gap-1 text-sm">
                <CalendarDays className="size-4" /> {formattedDate}
              </li>

              {/*<li className="flex text-sm items-center gap-1">
                  <CalendarClock  className="size-4" /> {formattedDate}
                </li>*/}
            </ul>

            <div>
              <DrawerClose>
                <X size={16} />
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="p-2">
            <form action="">
              <FieldSet>
                <FieldGroup>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <FieldContent>
                          <Input {...field} />
                        </FieldContent>
                      </Field>
                    )}
                  />

                  <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <Field>
                        <div className="flex items-center justify-between">
                          <FieldLabel htmlFor="description">
                            Description
                          </FieldLabel>

                          <Button
                            onClick={async (e) => {
                              e.preventDefault()
                              await complete("xD", {
                                body: {
                                  title: todoTitle,
                                  description: todoDescription,
                                },
                              })
                            }}
                            variant="link"
                            type="button"
                            className={cn(isLoading && "animate-pulse")}
                          >
                            Generate via AI
                          </Button>
                        </div>
                        <FieldContent>
                          <Textarea
                            className="h-40 overflow-y-auto"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FieldContent>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldSet>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </li>
  )
}
