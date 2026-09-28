'use client'

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function WalterFrame({ accountsAvailable }: { accountsAvailable: boolean }) {
  return (
    <main className="walter-app">
      <nav className="account-bar" aria-label="Account">
        <span>WALTER</span>
        <div>
          <Link className="walter-action secondary" href="/plans">Plans</Link>
          {accountsAvailable && <>
            <Show when="signed-out">
              <SignInButton><button className="walter-action secondary">Sign in</button></SignInButton>
              <SignUpButton><button className="walter-action primary">Sign up</button></SignUpButton>
            </Show>
            <Show when="signed-in"><UserButton /></Show>
          </>}
        </div>
      </nav>
      <iframe className="walter-frame" title="Walter website" src="/walter-experience.html" />
    </main>
  )
}
