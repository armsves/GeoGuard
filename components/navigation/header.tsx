"use client"
import Link from 'next/link'
import ToolboxMdxWrapper from "@/toolbox/src/components/ToolboxMdxWrapper"

export function Header() {
  return (
    <header className="border-b bg-card text-secondary-foreground">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Logo on the left - now a link to homepage */}
          <div className="flex items-center">
            <Link href="/" aria-label="Go to homepage">
              <img src="/logo.png" alt="Logo" className="h-32 w-32 rounded-md transition-opacity hover:opacity-90" />
            </Link>
          </div>

          {/* Banner in the center */}
          <div className="flex justify-center items-center">
            <img src="/banner.png" alt="GeoGuard Banner" className="h-32 max-w-full rounded-md" />
          </div>

          {/* Wallet on the right */}
          <div className="flex justify-end items-center">
            <ToolboxMdxWrapper walletMode="c-chain" />
          </div>
        </div>
      </div>
    </header>
  )
}