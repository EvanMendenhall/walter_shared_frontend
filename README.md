# Walter Customer Portal

Customer onboarding frontend for **Walter**, by [Professional AI Agents LLC](https://www.professionalaiagents.com/).

This repository is the page customers use to get started with Walter. Walter’s service lives in the separate `ai_scheduler` repository. This repo is the static frontend only.

The merged onboarding pages were converted off Next.js and back onto Vite. `npm run build` writes a `dist/` folder of static files. Nothing has to keep running after that build, and the folder can be published on Netlify.

## Stack

React 19, TypeScript, and Vite.

## Local development

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build      # typecheck and write dist/
npm run preview    # serve dist/ locally
```

## Publish

Upload the contents of `dist/` to Netlify, or connect the repo. `netlify.toml` builds with `npm run build` and publishes `dist`.

| Path | What it is |
|------|------------|
| `/` | The packaged Walter screens: Landing, Your details, Setup, Ready, and Support. `vite.config.ts` serves `public/walter-experience.html` as the homepage. |
| `/plans` | Plan preview. Checkout buttons stay disabled. |
| `/plans/returned` | Note that returning from checkout is not an active subscription. |
| `/sign-in`, `/sign-up` | Account placeholders. Clerk is not loaded. |

`public/_redirects` gives those paths to Netlify without a server.

## Placeholders

Stripe and Clerk are not installed. Two flags keep the doors closed:

- `src/billing.ts` — `checkoutAvailable` is `false`. Plan buttons cannot charge, and a `?billing=` visit says no charge was made.
- `src/accounts.ts` — `accountsAvailable` is `false`. Sign-in and sign-up say accounts are being prepared.

Do not add payment credentials or a Clerk secret to this static build. A price id is not a checkout link, and the Clerk secret does not belong in `dist/`.

## Layout

```
public/walter-experience.html   packaged screens, published as /
plans/index.html                plan preview
plans/returned/index.html       checkout-return note
sign-in/index.html              account placeholder
sign-up/index.html              account placeholder
src/App.tsx                     React pages for the routes above
src/billing.ts                  checkout flag
src/accounts.ts                 account flag
netlify.toml                    static publish of dist/
```
