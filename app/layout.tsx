import Link from "next/link"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "practice noticing & writing sentences",
  description: "Thoughts and writings",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-50 backdrop-blur-12 bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-1500 mx-auto px-4vw md:px-6vw py-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold hover:text-felt-blue transition-colors">
                  practice noticing & writing sentences
                </Link>
                <nav className="flex items-center gap-8 text-sm font-medium">
                  <Link href="/about" className="hover:text-felt-blue transition-colors">About</Link>
                  <ModeToggle />
                </nav>
              </div>
            </div>
          </header>
          <main className="max-w-1500 mx-auto px-4vw md:px-6vw">{children}</main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
