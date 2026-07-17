import { CreateProjectInput } from "@/src/entity/projects"
import { Field, FieldLabel, Textarea } from "@/src/shared/ui"
import { Control, Controller } from "react-hook-form"

interface ProjectDescriptionFieldProps {
  control: Control<CreateProjectInput>
}

export const ProjectDescriptionField = ({
  control,
}: ProjectDescriptionFieldProps) => {
  return (
    <Controller
      control={control}
      name="description"
      render={({ field }) => (
        <Field>
          <FieldLabel className="" htmlFor="description">
            Description
          </FieldLabel>
          <Textarea
            id="description"
            placeholder="Enter project description (optional)"
            className="min-h-20 resize-none"
            {...field}
            value={field.value || ""}
          />
        </Field>
      )}
    />
  )
}
