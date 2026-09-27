# Walter Customer Portal

Customer onboarding frontend for **Walter**, by [Professional AI Agents LLC](https://www.professionalaiagents.com/).

This repository is the page customers use to get started with Walter. Walter’s service lives in the separate `ai_scheduler` repository. This repo is the frontend only.

## Stack

- React 19
- TypeScript
- Vite

## Local development

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build    # typecheck and production build
npm run preview  # serve the production build locally
```

## Layout

```
index.html          page shell
src/main.tsx        React entry
src/App.tsx         onboarding page
src/App.css         page styles
src/index.css       global styles
```

Provisioning is not wired up yet. The page is a placeholder until onboarding is implemented here.
