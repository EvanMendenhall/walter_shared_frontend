import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    return <main className="auth-shell"><p>Accounts are being prepared. <Link href="/">Return to Walter</Link></p></main>
  }
  return <main className="auth-shell"><SignUp fallbackRedirectUrl="/plans" /></main>
}
