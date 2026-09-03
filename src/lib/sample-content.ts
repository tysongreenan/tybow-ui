import type { SiteContent } from "@/lib/schema"

const photo = (seed: string, label: string) => ({
  src: `https://picsum.photos/seed/${seed}/1600/1066`,
  alt: `replace with client photo: ${label}`,
})

export const sampleContent: SiteContent = {
  builderName: "Mill & Grove",
  phone: "555-0100",
  email: "hello@example.com",
  communities: [
    {
      slug: "cedar-ridge",
      name: "Cedar Ridge",
      town: "Millfield",
      status: "available",
      oneLiner: "A wooded edge of town, with room to walk.",
      modelAddress: "12 Ridge Road, Millfield",
      hours: "Thursday–Sunday, 12–5",
      lotLine: "Lots from 50 to 65 feet.",
      hero: photo("cedar-ridge", "Cedar Ridge street"),
      sitePlan: photo("cedar-ridge-plan", "Cedar Ridge site plan"),
    },
    {
      slug: "millbrook",
      name: "Millbrook",
      town: "Ashford",
      status: "selling",
      oneLiner: "A small collection beside the mill race.",
      modelAddress: "8 Brook Lane, Ashford",
      hours: "By appointment",
      lotLine: "Twenty-four lots in phase one.",
      hero: photo("millbrook", "Millbrook model"),
      sitePlan: photo("millbrook-plan", "Millbrook site plan"),
    },
    {
      slug: "north-pasture",
      name: "North Pasture",
      town: "Ashford",
      status: "coming-soon",
      oneLiner: "Open land at the north end of the concession.",
      hours: "Not open yet",
      lotLine: "Release date to follow.",
      hero: photo("north-pasture", "North Pasture fields"),
    },
  ],
  plans: [
    {
      slug: "the-willow",
      communitySlug: "cedar-ridge",
      name: "The Willow",
      beds: 3,
      baths: 2.5,
      sqft: 2140,
      image: photo("willow-plan", "The Willow"),
    },
    {
      slug: "the-ash",
      communitySlug: "millbrook",
      name: "The Ash",
      beds: 4,
      baths: 3,
      sqft: 2680,
      image: photo("ash-plan", "The Ash"),
    },
  ],
  readyHomes: [
    {
      slug: "14-elm-court",
      name: "14 Elm Court",
      communitySlug: "cedar-ridge",
      specLine: "3 bed · 2.5 bath · 2,140 sq ft",
      summary:
        "A finished home on a quiet court. Walk the model this weekend and ask about closing.",
      photo: photo("14-elm", "14 Elm Court"),
    },
    {
      slug: "8-birch-lane",
      name: "8 Birch Lane",
      communitySlug: "millbrook",
      specLine: "4 bed · 3 bath · 2,680 sq ft",
      summary:
        "A larger plan with a south garden. Ready when the current owner’s work is complete.",
      photo: photo("8-birch", "8 Birch Lane"),
    },
  ],
}
