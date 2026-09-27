# Agent rules

These rules apply to every AI agent working in this repository.

## What this repo is

This is the customer onboarding frontend for Walter, by Professional AI Agents LLC. Walter’s service is the separate `ai_scheduler` repository. Stay inside this frontend. Do not copy service internals, private APIs, credentials, or other proprietary detail into code, comments, docs, or commits.

## Working here

- Read the surrounding code before editing. Match the existing React, TypeScript, and Vite style.
- Keep changes scoped to the task. Do not add dependencies, files, or refactors the task does not need.
- Do not commit secrets or local-only files (`.env`, credentials, `*.local`).
- For UI, layout, routing, client state, or rendered data, verify the changed flow in the browser before calling the work done.
- Create a git commit only when the user asks. Do not push unless they ask.
- Do not change git config. Do not skip hooks. Do not force-push.

## Commit signature

Every commit an agent authors starts with `AI:` and ends with an `Agent:` trailer that names the model that authored that commit. Use the name you give when asked who you are. Do not use a shared label such as `AI`, `Cursor`, or `Assistant`.

```
AI: Add the onboarding placeholder page

Customers need a front door before provisioning exists.

Agent: Grok 4.7
```

The subject stays one or two sentences and says why the change exists. The `Agent:` line is the last line of the message. A different model writes its own name, so history shows which AI made each commit.
