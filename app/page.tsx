import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect to the first slide of the pitch deck
  redirect("/pitch/cover")
  // Return null or a loading component if needed, but redirect is usually fast enough
  return null
}
