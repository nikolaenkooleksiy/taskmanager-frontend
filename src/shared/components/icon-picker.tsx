"use client"

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/shared/ui"
import { Icon } from "@iconify/react"
import { useState } from "react"
import { cn } from "../lib"

interface IconPickerProps {
  value: string
  onChange: (value: string) => void
  icons: string[]
  className?: string
}

export const IconPicker = ({
  value,
  onChange,
  icons,
  className = "",
}: IconPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn("size-10 shrink-0 p-0", className)}
        >
          <Icon icon={!value ? icons[0] : value} className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 p-2"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div
          className="grid max-h-60 grid-cols-6 gap-1 overflow-y-auto pr-1"
          onWheel={(e) => e.stopPropagation()}
        >
          {icons.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => {
                onChange(icon)
                setIsOpen(false)
              }}
              className="flex aspect-square items-center justify-center rounded hover:bg-muted"
            >
              <Icon icon={icon} className="size-5" />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
