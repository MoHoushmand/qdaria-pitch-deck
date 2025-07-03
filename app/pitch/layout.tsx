import type * as React from "react"
import { cookies } from "next/headers"
import { PitchDeckSidebar } from "@/components/pitch-deck-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar" // Assuming these are correctly exported

export default async function PitchDeckLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  // Persist sidebar state [^2]
  const defaultOpen = cookieStore.get("sidebar:state")?.value !== "false" // Default to open if not set or true

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen bg-background">
        <PitchDeckSidebar />
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          {/* SidebarRail provides a draggable handle to resize or toggle the sidebar */}
          {/* It's often placed inside the Sidebar component itself or just outside it */}
          {/* For an inset variant, it might be less common unless the sidebar is floating. */}
          {/* Let's try placing it within the main layout structure if needed, or rely on icon mode toggle */}
          {children}
        </SidebarInset>
        {/* <SidebarRail />  This is usually part of the <Sidebar> component itself or positioned absolutely by it.
                            The shadcn/ui sidebar component structure might handle this internally or expect it within <Sidebar>.
                            For `variant="inset"`, the rail might not be standard.
                            Let's assume the icon mode toggle is sufficient.
        */}
      </div>
    </SidebarProvider>
  )
}
