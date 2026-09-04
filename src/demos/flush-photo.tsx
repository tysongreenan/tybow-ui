import { FlushPhoto } from "@/components/tybow/flush-photo"
import { cedar } from "@/demos/sample"

export default function FlushPhotoDemo() {
  return (
    <div className="bg-background px-[7vw] py-section">
      <div className="relative aspect-[16/9] overflow-hidden">
        <FlushPhoto
          src={cedar.hero?.src}
          alt={cedar.hero?.alt ?? "replace with client photo"}
          className="absolute inset-0 size-full"
        />
      </div>
    </div>
  )
}
