# Walter customer onboarding frontend

Public customer-facing Walter website for Professional AI Agents LLC. Walter's service and customer provisioning live elsewhere; this repository contains the website only.

## What this release includes

- The approved Walter visual experience, with public Landing, Your details, Setup, Ready, and Support screens. The artwork and button controller are carried from the reviewed source without alteration (source SHA-256 `2e0b577f84c0d8331cbc77d3aa7b8a9c779a932f8f21959f35419b5eaf3144ce`; packaged page SHA-256 `91d33430eff6c4aef48f8dbe6783e79ab58e8e2509b6a7158444c120c39a91c5`).
- Public Plans and checkout-return information pages. **Checkout is disabled in code** and `/api/checkout` returns 503. No Stripe credentials or price IDs are required or used.
- Optional Clerk sign-in and sign-up. No public page requires an account. If Clerk keys are not configured, the website remains public and account controls are hidden.

The page is a design and information experience. Its form fields and Ready screen do not provision Walter, connect a calendar, transmit a support request, or confirm a subscription. Keep those limits clear to visitors until the separate service path is approved and connected.

## Run locally

Requires Node.js 20.9 or newer. Use `npm ci`, then `npm run dev` for local development or `npm run build` and `npm start` for the production build.

To repeat the anonymous browser checks, start the built site and run `npm run test:public` in another terminal. The check uses a local Edge or Chrome installation when present; otherwise install Playwright Chromium. Set `WALTER_BASE_URL` to a test URL and `WALTER_BROWSER_PATH` to a browser executable if needed. `WALTER_SCREENSHOTS=1` saves local desktop and phone-size captures under the ignored `test-artifacts/` folder.

Copy `.env.example` to an untracked `.env.local` only when testing Clerk. Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` from the same Clerk application. Never commit either key. The public flows can be built and tested without keys. Configure the keys in the deployment environment before building if account buttons must appear.

## Deployment handoff

The receiving owner reviews and merges this PR, configures any Clerk keys in their own host, builds this Next.js app, and deploys through their existing website process. The prior `main` revision is the rollback point. This PR does not change any live site, service, private internal console, or payment account.

Before sharing the deployed URL, check the exact production revision and all seven public destinations anonymously on desktop and phone: Landing, Your details, Setup, Ready, Support, Plans, and the checkout-return information page. Confirm Get Walter opens Your details without an auth prompt, optional Clerk sign-in works only on request if keys are supplied, `/api/checkout` remains disabled, and the public link cannot open any private internal console. Record the URL, revision, and rollback in the deployment receipt. Do not infer live readiness from a local build or preview.
