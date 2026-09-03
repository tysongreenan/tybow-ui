export type FactsStripProps = {
  modelAddress?: string
  hours?: string
  lotLine?: string
}

export function FactsStrip({
  modelAddress,
  hours,
  lotLine,
}: FactsStripProps) {
  const facts = [
    { term: "Model", value: modelAddress },
    { term: "Hours", value: hours },
    { term: "Lots", value: lotLine },
  ].filter((fact) => Boolean(fact.value))

  if (facts.length === 0) {
    return null
  }

  return (
    <dl className="grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.term}>
          <dt className="text-xs font-bold tracking-[0.04em] text-muted-foreground uppercase">
            {fact.term}
          </dt>
          <dd className="mt-2 font-display text-xl text-foreground">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
