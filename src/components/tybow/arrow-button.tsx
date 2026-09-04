import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  )
}

export type ArrowButtonProps = {
  variant?: "cream" | "inverse" | "ghost"
  href?: string
  className?: string
  children: ReactNode
} & Omit<ComponentProps<"button">, "className">

export function ArrowButton({
  variant = "cream",
  href,
  className,
  children,
  type = "button",
  ...props
}: ArrowButtonProps) {
  const classes = cn(
    "inline-flex min-h-[3.25rem] items-center gap-3 pr-1.5 pl-5 font-sans text-[0.92rem] font-semibold tracking-[0.04em] uppercase",
    variant === "cream" &&
      "bg-primary-foreground text-foreground shadow-[0_10px_28px_color-mix(in_oklch,var(--foreground)_32%,transparent)] hover:bg-white",
    variant === "inverse" && "bg-primary text-primary-foreground hover:brightness-90",
    variant === "ghost" &&
      "min-h-[3.25rem] border-[1.5px] border-primary-foreground bg-foreground/60 px-5 text-primary-foreground hover:border-white hover:bg-foreground/80",
    className,
  )

  const iconWrap =
    variant === "ghost" ? null : (
      <span
        className={cn(
          "grid size-9 place-items-center",
          variant === "cream" && "bg-primary text-primary-foreground",
          variant === "inverse" && "bg-primary-foreground text-primary",
        )}
      >
        <ArrowIcon />
      </span>
    )

  const inner = (
    <>
      {children}
      {iconWrap}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {inner}
    </button>
  )
}
