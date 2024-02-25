"use client"

import { useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { loreleiNeutral } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"

import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  const avatar = useMemo(() => {
    return createAvatar(loreleiNeutral, {
      size: 128,
      seed: "Angel",
      flip: true,
      backgroundColor: [],
    }).toDataUriSync()
  }, [])
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* Вынести пути */}
            {pathname !== "/auth" && pathname !== "/reg" && (
              <Avatar className="bg-gray-100">
                <AvatarImage src={avatar} alt="@shadcn" />
                <AvatarFallback>ИИ</AvatarFallback>
              </Avatar>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
