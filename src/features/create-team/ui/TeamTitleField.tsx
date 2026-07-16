import { CreateTeamInput } from "@/src/entity/team"
import { Field, FieldError, FieldLabel, Input } from "@/src/shared/ui"
import { Control, Controller } from "react-hook-form"

interface TeamTitleFieldProps {
  control: Control<CreateTeamInput>
}

export const TeamTitleField = ({ control }: TeamTitleFieldProps) => {
  return (
    <Controller
      control={control}
      name="name"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor="name">
            Name <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="name" placeholder="Enter team name" {...field} />
          {fieldState.error && (
            <FieldError errors={[{ message: fieldState.error.message }]} />
          )}
        </Field>
      )}
    />
  )
}
