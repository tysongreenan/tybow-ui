import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export type PreviewStep = {
  title: string
  copy: string
}

export type PreviewStepsProps = {
  id?: string
  eyebrow: string
  title: string
  copy: string
  steps: PreviewStep[]
  cta?: { href: string; label: string }
}

export function PreviewSteps({
  id,
  eyebrow,
  title,
  copy,
  steps,
  cta,
}: PreviewStepsProps) {
  return (
    <section id={id} className="bg-background px-[7vw] py-section">
      <div className="mx-auto max-w-[40rem] text-center">
        <p className="text-[0.7rem] font-medium tracking-[0.26em] text-primary uppercase">
          {eyebrow}
        </p>
        <h2 className="mx-auto mt-3 max-w-[18ch] font-display text-[length:clamp(2rem,3.5vw,2.85rem)] font-medium tracking-[-0.02em] text-foreground">
          {title}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-10 bg-primary/50"
        />
        <p className="mt-5 text-pretty text-foreground">{copy}</p>
      </div>
      <ol className="mx-auto mt-12 grid max-w-[900px] gap-8 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="text-center">
            <p className="font-display text-4xl font-light text-primary">
              {index + 1}
            </p>
            <h3 className="mt-3 font-display text-xl text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.copy}</p>
          </li>
        ))}
      </ol>
      {cta ? (
        <p className="mt-10 text-center">
          <Link href={cta.href} className={buttonVariants({ size: "lg" })}>
            {cta.label}
          </Link>
        </p>
      ) : null}
    </section>
  )
}
