export type ViewMode = "list" | "board" | "table"

export interface TodoViewOption {
  id: ViewMode
  label: string
  icon: string
}
