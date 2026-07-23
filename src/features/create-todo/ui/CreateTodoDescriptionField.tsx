import { CreateTodoInput } from "@/src/entity/todo"
import { Field, FieldContent, FieldLabel, Textarea } from "@/src/shared/ui"
import { Control, Controller } from "react-hook-form"

export const CreateTodoDescriptionField = ({
  control,
}: {
  control: Control<CreateTodoInput>
}) => {
  return (
    <Controller
      control={control}
      name="description"
      render={({ field }) => (
        <Field>
          <FieldLabel className="" htmlFor="description">
            Description
          </FieldLabel>

          <FieldContent>
            <Textarea
              id="description"
              placeholder="Enter task description (optional)"
              className="min-h-20 resize-none"
              {...field}
              value={field.value || ""}
            />
          </FieldContent>
        </Field>
      )}
    />
  )
}
