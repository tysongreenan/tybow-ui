import { cn } from "@/lib/utils"

export type FlushPhotoProps = {
  src?: string
  alt: string
  label?: string
  fit?: "cover" | "contain"
  className?: string
}

export type MediaFrame = { src?: string; alt: string }

export function MediaStack({
  frames,
  on,
  slideClassName,
  className,
  objectPosition,
}: {
  frames: MediaFrame[]
  on: number
  slideClassName: string
  className?: string
  objectPosition?: string
}) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {frames.map((frame, index) =>
        frame.src ? (
          // Parent owns crop. Animation classes must land on the img.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${frame.src}-${index}`}
            src={frame.src}
            alt={index === on ? frame.alt : ""}
            decoding="async"
            className={cn(slideClassName, index === on && "is-on")}
            style={objectPosition ? { objectPosition } : undefined}
          />
        ) : (
          <div
            key={`${frame.alt}-${index}`}
            className={cn(
              slideClassName,
              index === on && "is-on",
              "flex items-center justify-center bg-muted",
            )}
            role="img"
            aria-label={frame.alt}
          />
        ),
      )}
    </div>
  )
}

export function FlushPhoto({
  src,
  alt,
  label = "replace with client photo",
  fit = "cover",
  className,
}: FlushPhotoProps) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {src ? (
        // Parent owns crop and radius. No inner mat.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={cn(
            "absolute inset-0 size-full",
            fit === "contain" ? "object-contain" : "object-cover",
          )}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center bg-muted px-6 text-center"
          role="img"
          aria-label={alt}
        >
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      )}
    </div>
  )
}
