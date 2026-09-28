import { accountsAvailable } from './accounts.ts'
import { billingNotice, checkoutAvailable } from './billing.ts'

function pageKind(pathname: string) {
  const path = pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/'
  if (path.endsWith('/plans/returned')) return 'returned'
  if (path.endsWith('/sign-in')) return 'sign-in'
  if (path.endsWith('/sign-up')) return 'sign-up'
  return 'plans'
}

export function App() {
  const page = pageKind(window.location.pathname)
  if (page === 'returned') return <ReturnedPage />
  if (page === 'sign-in') return <AccountPage mode="sign-in" />
  if (page === 'sign-up') return <AccountPage mode="sign-up" />
  return <PlansPage />
}

function PlansPage() {
  const notice = billingNotice()

  return (
    <main className="folio-page">
      <section className="folio">
        <header className="folio-head">
          <span>WALTER</span>
          <a href="/">← Back to Walter</a>
        </header>
        <h1>Choose your Walter plan.</h1>
        <p>Monthly or annual—choose the pace that suits you.</p>
        {notice ? <p role="alert">{notice}</p> : null}
        <div className="plans">
          <article className="plan">
            <h2>Monthly</h2>
            <p>A recurring monthly plan.</p>
            <button className="walter-action primary" type="button" disabled>
              Checkout coming soon
            </button>
          </article>
          <article className="plan">
            <h2>Annual</h2>
            <p>A recurring annual plan.</p>
            <button className="walter-action primary" type="button" disabled>
              Checkout coming soon
            </button>
          </article>
        </div>
        {accountsAvailable ? (
          <a className="walter-action secondary" href="/sign-up">
            Create an account (optional)
          </a>
        ) : null}
        <p className="note">
          {checkoutAvailable
            ? 'Checkout is ready.'
            : 'Checkout is being prepared. These plan choices cannot charge you yet.'}
        </p>
        <p className="note">
          The calendar-connection and Ready screens are design previews, not an active scheduling service.
        </p>
        <p className="note">
          <a href="/sign-in">Account access</a> is not available in this static build.
        </p>
      </section>
    </main>
  )
}

function ReturnedPage() {
  return (
    <main className="folio-page">
      <section className="folio">
        <header className="folio-head">
          <span>WALTER</span>
          <a href="/">Back to Walter</a>
        </header>
        <h1>Thank you.</h1>
        <p>
          Returning from checkout is not proof of an active subscription. Walter will be ready only after
          payment and service activation are confirmed.
        </p>
      </section>
    </main>
  )
}

function AccountPage({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  if (!accountsAvailable) {
    return (
      <main className="auth-shell">
        <p>
          Accounts are being prepared. <a href="/">Return to Walter</a>
        </p>
      </main>
    )
  }

  const label = mode === 'sign-in' ? 'Sign in' : 'Create an account'
  return (
    <main className="auth-shell">
      <p>
        {label} will open here when Clerk is added. <a href="/plans">Back to plans</a>
      </p>
    </main>
  )
}
