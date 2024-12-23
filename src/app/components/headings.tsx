import { cn } from "@/utils"
import { HTMLAttributes, ReactNode } from "react"

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1
      className={cn(
        "text-4xl sm:text-5xl text-pretty font-heading font-semibold tracking-tight text-zinc-800",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}