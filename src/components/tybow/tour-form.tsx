"use client"

import * as React from "react"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowButton } from "@/components/tybow/arrow-button"

export type TourFormOption = {
  slug: string
  name: string
}

export type TourFormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  homeType: string
  community: string
  lot: string
  plan: string
  message: string
}

export type TourFormProps = {
  communities: TourFormOption[]
  plans?: TourFormOption[]
  lots?: TourFormOption[]
  homeTypes?: TourFormOption[]
  defaultCommunity?: string
  onSubmit?: (values: TourFormValues) => void
}

const defaultHomeTypes: TourFormOption[] = [
  { slug: "detached", name: "Single detached" },
  { slug: "semi", name: "Semi-detached" },
  { slug: "town", name: "Townhome" },
]

const defaultLots: TourFormOption[] = [
  { slug: "undecided", name: "Undecided / help me choose" },
]

export function TourForm({
  communities,
  plans = [],
  lots = defaultLots,
  homeTypes = defaultHomeTypes,
  defaultCommunity = "",
  onSubmit,
}: TourFormProps) {
  const [community, setCommunity] = React.useState(defaultCommunity)
  const [plan, setPlan] = React.useState("")
  const [lot, setLot] = React.useState(lots[0]?.slug ?? "")
  const [homeType, setHomeType] = React.useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: TourFormValues = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      homeType,
      community,
      lot,
      plan,
      message: String(data.get("message") ?? ""),
    }
    onSubmit?.(values)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="tour-home-type">Home type</FieldLabel>
            <Select
              value={homeType || null}
              onValueChange={(value) => setHomeType(value ?? "")}
            >
              <SelectTrigger id="tour-home-type" className="w-full">
                <SelectValue placeholder="Home type" />
              </SelectTrigger>
              <SelectContent>
                {homeTypes.map((item) => (
                  <SelectItem key={item.slug} value={item.slug}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="tour-community">Community</FieldLabel>
            <Select
              value={community || null}
              onValueChange={(value) => setCommunity(value ?? "")}
            >
              <SelectTrigger id="tour-community" className="w-full">
                <SelectValue placeholder="Choose a community" />
              </SelectTrigger>
              <SelectContent>
                {communities.map((item) => (
                  <SelectItem key={item.slug} value={item.slug}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="tour-lot">Lot of interest</FieldLabel>
            <Select
              value={lot || null}
              onValueChange={(value) => setLot(value ?? "")}
            >
              <SelectTrigger id="tour-lot" className="w-full">
                <SelectValue placeholder="Lot of interest" />
              </SelectTrigger>
              <SelectContent>
                {lots.map((item) => (
                  <SelectItem key={item.slug} value={item.slug}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          {plans.length > 0 ? (
            <Field>
              <FieldLabel htmlFor="tour-plan">Home model</FieldLabel>
              <Select
                value={plan || null}
                onValueChange={(value) => setPlan(value ?? "")}
              >
                <SelectTrigger id="tour-plan" className="w-full">
                  <SelectValue placeholder="Home model" />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((item) => (
                    <SelectItem key={item.slug} value={item.slug}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="tour-first">First name</FieldLabel>
            <Input
              id="tour-first"
              name="firstName"
              autoComplete="given-name"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="tour-last">Last name</FieldLabel>
            <Input
              id="tour-last"
              name="lastName"
              autoComplete="family-name"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="tour-phone">Phone</FieldLabel>
            <Input
              id="tour-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="tour-email">Email</FieldLabel>
            <Input
              id="tour-email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="tour-message">Additional details</FieldLabel>
          <Textarea id="tour-message" name="message" rows={4} />
        </Field>
        <ArrowButton type="submit" variant="inverse">
          Book a private tour
        </ArrowButton>
      </FieldGroup>
    </form>
  )
}
