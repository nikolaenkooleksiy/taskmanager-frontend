import { CreateProjectInput } from "@/src/entity/projects"
import { Field, FieldError, FieldLabel, Input } from "@/src/shared/ui"
import { Control, Controller } from "react-hook-form"

interface ProjectTitleFieldProps {
  control: Control<CreateProjectInput>
}

export const ProjectTitleField = ({ control }: ProjectTitleFieldProps) => {
  return (
    <Controller
      control={control}
      name="name"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor="name">
            Name <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="name" placeholder="Enter project name" {...field} />
          {fieldState.error && (
            <FieldError errors={[{ message: fieldState.error.message }]} />
          )}
        </Field>
      )}
    />
  )
}
