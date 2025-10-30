"use client"

import { Button } from "@/components/ui/button"
import { FileText, DollarSign, LayoutDashboard, Clock, Send, Shield } from "lucide-react"
import Link from "next/link"
import UserGreetText from "@/components/UserGreetText"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="grow">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center gap-8 px-8 py-24 text-center sm:py-40">
          <div className="flex flex-col gap-6 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl">
              Professional Invoicing for Modern Freelancers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Create, send and track invoices in seconds. Get paid faster with automated reminders
              and professional templates designed for freelancers.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-40">
              <Link href="/signup">Start Free - No Credit Card</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-40">
              <Link href="/login">Sign In to Dashboard</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-white py-24 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
                Everything you need to manage invoices
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Focus on your craft while we handle the paperwork
              </p>
            </div>

            <div className="mx-auto grid max-w-none gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="relative flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Quick Invoice Creation
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Create professional invoices in under 60 seconds with our intuitive templates
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Send className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Automated Payments
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Accept payments online and send automatic payment reminders
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Smart Dashboard
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Track payments, revenue, and business growth all in one place
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
