"use client"

import { Icon as IconifyIcon, IconProps } from "@iconify/react"
import { useState } from "react"

interface SmartIconProps extends IconProps {
  size?: number
}

export function Icon({
  icon,
  size = 12,
  className = "",
  ...props
}: SmartIconProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      {!isLoaded && (
        <span className="absolute inset-0 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      )}

      <IconifyIcon
        icon={icon}
        width={size}
        height={size}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-200 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
        {...props}
      />
    </span>
  )
}
