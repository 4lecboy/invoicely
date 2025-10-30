"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"


export function Navbar() {

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-black/80">
      <nav className="flex items-center justify-between p-6 mx-[150px] lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-primary">Invoicely</span>
          </Link>
        </div>

        {/* Desktop sign in/up buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}