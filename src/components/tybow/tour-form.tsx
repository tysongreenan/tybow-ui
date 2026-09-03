"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
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

export type TourFormOption = {
  slug: string
  name: string
}

export type TourFormValues = {
  name: string
  email: string
  phone: string
  community: string
  plan: string
  message: string
}

export type TourFormProps = {
  communities: TourFormOption[]
  plans?: TourFormOption[]
  defaultCommunity?: string
  onSubmit?: (values: TourFormValues) => void
}

export function TourForm({
  communities,
  plans = [],
  defaultCommunity = "",
  onSubmit,
}: TourFormProps) {
  const [community, setCommunity] = React.useState(defaultCommunity)
  const [plan, setPlan] = React.useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: TourFormValues = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      community,
      plan,
      message: String(data.get("message") ?? ""),
    }
    onSubmit?.(values)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="tour-name">Name</FieldLabel>
          <Input
            id="tour-name"
            name="name"
            autoComplete="name"
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
        {plans.length > 0 ? (
          <Field>
            <FieldLabel htmlFor="tour-plan">Plan of interest</FieldLabel>
            <Select
              value={plan || null}
              onValueChange={(value) => setPlan(value ?? "")}
            >
              <SelectTrigger id="tour-plan" className="w-full">
                <SelectValue placeholder="Choose a plan" />
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
        <Field>
          <FieldLabel htmlFor="tour-message">Message</FieldLabel>
          <Textarea id="tour-message" name="message" rows={4} />
        </Field>
        <Button type="submit">Book a tour</Button>
      </FieldGroup>
    </form>
  )
}
