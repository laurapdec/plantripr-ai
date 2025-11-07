## Quick context

This is a small Next.js (App Router) TypeScript project. Key facts an AI coding agent should know up front:

- Uses Next.js 16 with the app directory layout: source entry is `src/app/` (see `src/app/layout.tsx`, `src/app/page.tsx`).
- TypeScript is enabled with `strict` mode and path alias `@/*` mapped to `src/*` (`tsconfig.json`).
- Styling via Tailwind (see `src/app/globals.css` and `postcss.config.mjs`) and custom CSS variables.
- Project depends on Supabase, TanStack React Query, Zustand, Zod, Google Maps loader and other client libs — check `package.json` for exact versions.

## How to run and build (relevant scripts)

- Install dependencies: there is a `pnpm-lock.yaml` in the repo, so prefer pnpm if available: `pnpm install` (npm/yarn also work but use pnpm by default).
- Run dev server: `pnpm dev` (maps to `next dev`).
- Build: `pnpm build` (maps to `next build`).
- Start production server: `pnpm start` (maps to `next start`).
- Lint: `pnpm lint` (runs `eslint`).

Files that implement these behaviors: `package.json`, `next.config.ts`, `tsconfig.json`.

## Architecture & conventions (what to edit and why)

- App router: Add pages, layouts, and server/route handlers under `src/app/`. `layout.tsx` configures global fonts and CSS imports.
- Shared UI/components should live under `src/` and imported with the `@/` alias (see `tsconfig.json` paths).
- Global CSS and Tailwind include are in `src/app/globals.css`. The file uses CSS custom props for theming—respect `--background`, `--foreground` variables.
- Fonts use `next/font/google` in `src/app/layout.tsx` — prefer server-side font loading patterns consistent with that file.

## Data & state patterns

- Remote data and caching: codebase uses `@tanstack/react-query` for server/client data fetching and caching — follow that pattern for data fetching hooks.
- Auth / DB: `@supabase/supabase-js` is installed; if adding server-side secrets, prefer environment variables and Next.js server components or API routes.
- Form validation: `react-hook-form` + `zod` (and `@hookform/resolvers`) is the chosen pattern for form validation.
- Local UI state: `zustand` is available for client stores.

## Notable integration points & configuration

- `next.config.ts` enables `reactCompiler: true` — be mindful of React Compiler-related constraints when adding custom Babel/webpack plugins.
- `postcss.config.mjs` configures `@tailwindcss/postcss` plugin; Tailwind v4 is present in devDependencies.
- No test framework configured (no jest/vitest files found). If tests are added, mention that you'll add appropriate deps and scripts.

## Editing tips & examples (concrete)

- To add a new page that uses server components: create `src/app/<route>/page.tsx` and export a React component (see `src/app/page.tsx`).
- To add a shared component: create `src/components/MyComponent.tsx` and import with `import MyComponent from '@/components/MyComponent'`.
- To use global styles: add Tailwind utility classes or CSS variables to `src/app/globals.css` and reference them in components.

## Linting / PR checklist for changes

- Run `pnpm lint` and fix ESLint errors before opening a PR. The repo uses `eslint-config-next` and `prettier`.
- Keep changes small and focused: update `package.json` only when necessary and run `pnpm install` afterwards.

## What I looked at

- `package.json` — scripts and dependencies
- `tsconfig.json` — path aliases and strict TypeScript settings
- `src/app/layout.tsx` and `src/app/page.tsx` — app structure and styling approach
- `src/app/globals.css`, `postcss.config.mjs` — styling pipeline

## Missing/unknowns worth confirming

- README is empty — if there are org-specific workflows (preview deployments, environment variables for Supabase or Google Maps), document them here.
- No test runner or CI snippets found; let me know preferred test/CI so I can add templates.

If any of the above is inaccurate or you'd like additional rules (component naming, folder layout, state-management patterns), tell me what to include and I will update this file.
