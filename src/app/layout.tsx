import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GAGAN.C.V — Full-Stack Software Engineer & AI Specialist',
  description: 'Portfolio of GAGAN.C.V, a Full-Stack Software Engineer specializing in Next.js, AI implementations, and robust web architectures.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
