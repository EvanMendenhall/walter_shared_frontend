import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'Walter — Your AI scheduling concierge',
  description: 'A helping hand for your calls and calendar.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const accountsAvailable = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  )
  return (
    <html lang="en">
      <body>
        {accountsAvailable ? <ClerkProvider>{children}</ClerkProvider> : children}
      </body>
    </html>
  )
}
