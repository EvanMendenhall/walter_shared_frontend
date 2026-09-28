import WalterFrame from './walter-frame'

export default function HomePage() {
  const accountsAvailable = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  )
  return <WalterFrame accountsAvailable={accountsAvailable} />
}
