import type { Resolver } from "react-hook-form"
import type { ZodType } from "zod/v4"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function zodResolver<T extends Record<string, any>>(
  schema: ZodType<T>
): Resolver<T> {
  return async (values) => {
    const result = schema.safeParse(values)

    if (result.success) {
      return { values: result.data, errors: {} }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: any = {}

    for (const issue of result.error.issues) {
      const path = issue.path.join(".")
      if (!errors[path]) {
        errors[path] = { type: "validation", message: issue.message }
      }
    }

    return { values: {}, errors }
  }
}
