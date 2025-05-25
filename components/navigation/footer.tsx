"use client"
import Link from 'next/link'
import { ExternalLink, Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-card py-8 text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-8">
          <FooterLink href="https://github.com/armsves/GeoGuard" external>
            <Github className="h-5 w-5 mr-2" />
            GitHub
          </FooterLink>
          <FooterLink href="https://twitter.com/armsves" external>
            <Twitter className="h-5 w-5 mr-2" />
            Twitter
          </FooterLink>
        </div>
        <div className="text-center mt-4 text-sm text-secondary-foreground/60">
          © {new Date().getFullYear()} GeoGuard. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
}

function FooterLink({ href, children, external = false }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm text-secondary-foreground hover:text-primary transition-colors duration-200 inline-flex items-center"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external && <ExternalLink className="ml-1 h-3 w-3" />}
    </Link>
  )
}