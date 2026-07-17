import { CreateProjectInput } from "@/src/entity/projects"
import { IconPicker } from "@/src/shared/components"
import { devIcons } from "@/src/shared/constants"
import { Control, Controller } from "react-hook-form"

export const ProjectIconPicker = ({
  control,
}: {
  control: Control<CreateProjectInput>
}) => {
  return (
    <Controller
      control={control}
      name="icon"
      render={({ field }) => (
        <IconPicker
          icons={devIcons}
          value={field.value}
          onChange={field.onChange}
          className="size-20"
        />
      )}
    />
  )
}
