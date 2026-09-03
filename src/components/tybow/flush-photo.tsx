import { cn } from "@/lib/utils"

export type FlushPhotoProps = {
  src?: string
  alt: string
  label?: string
  fit?: "cover" | "contain"
  className?: string
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
