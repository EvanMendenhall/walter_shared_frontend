import { Show, SignUpButton } from '@clerk/nextjs'
import Link from 'next/link'

type Search = { billing?: string }

export default async function PlansPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { billing } = await searchParams
  const accountsAvailable = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  )

  return (
    <main className="folio-page">
      <section className="folio">
        <header className="folio-head"><span>WALTER</span><Link href="/">← Back to Walter</Link></header>
        <h1>Choose your Walter plan.</h1>
        <p>Monthly or annual—choose the pace that suits you.</p>
        {billing && <p role="alert">Checkout is not available yet. No charge was made.</p>}
        <div className="plans">
          <article className="plan"><h2>Monthly</h2><p>A recurring monthly plan.</p><button className="walter-action primary" disabled>Checkout coming soon</button></article>
          <article className="plan"><h2>Annual</h2><p>A recurring annual plan.</p><button className="walter-action primary" disabled>Checkout coming soon</button></article>
        </div>
        {accountsAvailable && <Show when="signed-out"><SignUpButton><button className="walter-action secondary">Create an account (optional)</button></SignUpButton></Show>}
        <p className="note">Checkout is being prepared. These plan choices cannot charge you yet.</p>
        <p className="note">The existing calendar-connection and Ready screens are design previews, not an active scheduling service.</p>
      </section>
    </main>
  )
}
