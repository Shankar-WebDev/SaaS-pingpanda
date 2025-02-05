import { cn } from "@/utils"
import { HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  contentClassName?: string
}

export const Card = ({
  className,
  contentClassName,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn("relative bg-gray-50 text-card-foreground", className)}
      {...props}
    >
      <div className={cn("realative z-10 p-6", contentClassName)}>
        {children}
      </div>
      <div className="abosolute z-0 inset-px rounded-lg bg-white">
        <div className="pointer-events-none z-0 absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
      </div>
    </div>
  )
}
