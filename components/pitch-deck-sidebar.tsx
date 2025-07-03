"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Atom } from "lucide-react"
import { slides, type SlideData } from "@/lib/pitch-deck-data"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar" // Assuming these are correctly exported from shadcn/ui

export function PitchDeckSidebar() {
  const pathname = usePathname()
  const { open, setOpen, isMobile, state } = useSidebar()

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="justify-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:h-12"
              asChild
              size="lg"
              tooltip={{
                children: "Qdaria Home",
                side: "right",
                align: "center",
              }}
            >
              <Link href="/pitch/cover" className="flex items-center gap-2">
                <Atom className="h-7 w-7 text-primary shrink-0" />
                <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">Qdaria</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {slides.map((slide: SlideData) => (
            <SidebarMenuItem key={slide.slug}>
              <SidebarMenuButton
                asChild
                isActive={pathname === `/pitch/${slide.slug}`}
                tooltip={{
                  children: slide.navTitle,
                  side: "right",
                  align: "center",
                }}
                className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:h-12"
              >
                <Link href={`/pitch/${slide.slug}`} className="flex items-center gap-3">
                  <slide.icon className="h-5 w-5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">{slide.navTitle}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* Optional: Footer or toggle button if SidebarRail is not used/visible enough */}
      {/* <SidebarFooter className="p-2 border-t border-sidebar-border">
        <Button variant="ghost" onClick={() => setOpen(!open)} className="w-full group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:h-12 justify-center">
          {state === 'expanded' ? <ChevronsLeft className="h-5 w-5"/> : <ChevronsRight className="h-5 w-5"/>}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarFooter> */}
    </Sidebar>
  )
}
