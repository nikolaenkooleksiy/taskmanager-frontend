import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ViewMode } from "../types/types"

export const useTodoViewSwitch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selectedView, setSelectedView] = useState<ViewMode>(() => {
    const viewParam = searchParams.get("view") as ViewMode

    return viewParam ?? "list"
  })

  const handleViewChange = (view: ViewMode) => {
    if (view === selectedView) return

    const params = new URLSearchParams(searchParams.toString())

    if (view !== "list") {
      params.set("view", view)
    } else {
      params.delete("view")
    }

    setSelectedView(view)

    router.push(`${pathname}?${params.toString()}`)
  }

  return {
    selectedView,
    handleViewChange,
  }
}
