import { redirect } from "next/navigation"
import Link from "next/link"
import { slides, type SlideData } from "@/lib/pitch-deck-data"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export async function generateStaticParams() {
  return slides.map((slide) => ({
    slideSlug: slide.slug,
  }))
}

export default function SlidePage({ params }: { params: { slideSlug: string } }) {
  const { slideSlug } = params
  const slideIndex = slides.findIndex((s) => s.slug === slideSlug)

  if (slideIndex === -1) {
    redirect("/pitch/cover") // Or a 404 page
    return null
  }

  const currentSlide: SlideData = slides[slideIndex]
  const prevSlide = slideIndex > 0 ? slides[slideIndex - 1] : null
  const nextSlide = slideIndex < slides.length - 1 ? slides[slideIndex + 1] : null

  return (
    <main className="flex-1 flex flex-col h-full relative">
      <div className="flex-grow h-full overflow-y-auto">
        {" "}
        {/* Ensure content can scroll if it overflows slide area */}
        {currentSlide.content}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center p-4 space-x-4">
        {prevSlide ? (
          <Button variant="outline" asChild className="bg-background/80 hover:bg-accent text-foreground">
            <Link href={`/pitch/${prevSlide.slug}`} className="flex items-center">
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled className="bg-background/80 text-muted-foreground">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </Button>
        )}
        <span className="text-sm text-muted-foreground">
          {slideIndex + 1} / {slides.length}
        </span>
        {nextSlide ? (
          <Button variant="outline" asChild className="bg-background/80 hover:bg-accent text-foreground">
            <Link href={`/pitch/${nextSlide.slug}`} className="flex items-center">
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled className="bg-background/80 text-muted-foreground">
            Next
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        )}
      </div>
    </main>
  )
}
