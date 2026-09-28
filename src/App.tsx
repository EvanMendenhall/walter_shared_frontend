const phoneHref = 'tel:+14154633415'
const phoneLabel = '415-463-3415'

function pageKind(pathname: string) {
  const path = pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/'
  if (path.endsWith('/plans/returned')) return 'returned'
  if (path.endsWith('/sign-in')) return 'sign-in'
  if (path.endsWith('/sign-up')) return 'sign-up'
  return 'plans'
}

export function App() {
  const page = pageKind(window.location.pathname)
  document.title = 'Walter'
  const screen = page === 'returned' ? <ReturnedPage /> : page === 'sign-in' || page === 'sign-up' ? <CallPage /> : <PlansPage />
  return (
    <>
      {screen}
      <CompanyFooter />
    </>
  )
}

function CompanyFooter() {
  return (
    <footer className="company-footer">
      <p className="company-name">Professional AI Agents LLC</p>
      <p>© 2026 Professional AI Agents LLC. All rights reserved.</p>
      <p>This page and its images are copyrighted by Professional AI Agents LLC.</p>
      <p className="company-links">
        <a href="https://www.professionalaiagents.com/">professionalaiagents.com</a>
        <a href="mailto:sales@professionalaiagents.com">sales@professionalaiagents.com</a>
      </p>
    </footer>
  )
}

function PlansPage() {
  return (
    <main className="folio-page">
      <section className="folio">
        <header className="folio-head">
          <span>WALTER</span>
          <a href="/">← Back to Walter</a>
        </header>
        <h1>Monthly or annual.</h1>
        <p>Call Walter and ask him to schedule a meeting. You can choose the pace that suits you when you talk.</p>
        <div className="plans">
          <article className="plan">
            <h2>Monthly</h2>
            <p>Walter, month by month.</p>
            <a className="walter-action primary" href={phoneHref}>
              Call {phoneLabel}
            </a>
          </article>
          <article className="plan">
            <h2>Annual</h2>
            <p>Walter, for the year.</p>
            <a className="walter-action primary" href={phoneHref}>
              Call {phoneLabel}
            </a>
          </article>
        </div>
        <p className="note">
          <a href={phoneHref}>{phoneLabel}</a>
          {' · '}
          Ask Walter to set the meeting.
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
          <a href="/">← Back to Walter</a>
        </header>
        <h1>Welcome back.</h1>
        <p>Call Walter and ask him to schedule a meeting whenever you are ready for your own.</p>
        <a className="walter-action primary" href={phoneHref}>
          Call {phoneLabel}
        </a>
      </section>
    </main>
  )
}

function CallPage() {
  return (
    <main className="folio-page">
      <section className="folio">
        <header className="folio-head">
          <span>WALTER</span>
          <a href="/">← Back to Walter</a>
        </header>
        <h1>Walter answers the phone.</h1>
        <p>Call him, try a booking, and ask him to schedule a meeting for your own Walter.</p>
        <a className="walter-action primary" href={phoneHref}>
          Call {phoneLabel}
        </a>
      </section>
    </main>
  )
}
