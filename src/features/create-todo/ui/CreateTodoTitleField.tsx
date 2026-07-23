import { CreateTodoInput } from "@/src/entity/todo"
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Input,
} from "@/src/shared/ui"
import { Control, Controller } from "react-hook-form"

export const CreateTodoTitleField = ({
  control,
}: {
  control: Control<CreateTodoInput>
}) => {
  return (
    <Controller
      control={control}
      name="title"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor="title">
            Title <span className="text-destructive">*</span>
          </FieldLabel>

          <FieldContent>
            <Input id="title" placeholder="Enter task title" {...field} />
          </FieldContent>

          <FieldError errors={[{ message: fieldState.error?.message }]} />
        </Field>
      )}
    />
  )
}
