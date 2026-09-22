# Magnifier Design

Website for an interior design company.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Vercel-ready deployment

Additional dependencies such as Motion, Sanity, Zod, React Hook Form, Vitest, and Playwright are added only when a feature requires them.

## Requirements

- Node.js 20.9+ (Node 22 LTS recommended)
- npm

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Structure

```text
src/
├── app/                 # routes, root layout, global styles
├── components/
│   ├── layout/          # site-wide layout components
│   ├── sections/        # reusable page sections, grouped by section
│   │   └── <section>/
│   │       ├── index.ts
│   │       ├── <section>.tsx / <section>-section.tsx
│   │       ├── <section>.module.css
│   │       └── section-only components, hooks and types
│   └── ui/              # reusable UI primitives
├── data/                # typed shared/static content before CMS integration
├── features/            # non-visual domain features spanning sections/routes
├── hooks/               # hooks shared across multiple features
├── lib/                 # shared utilities
├── styles/              # design tokens and shared CSS
└── types/               # shared TypeScript models
```

## Architecture rules

- Prefer Server Components. Add `"use client"` only for actual browser interaction.
- Keep route/page files compositional; page sections live under `components/sections/<section>/`.
- Treat each section folder as an ownership boundary: colocate its root component, CSS Module, private subcomponents, hooks and local types.
- Give each section a small `index.ts` public API. Consumers outside the section should import from the section folder, not its implementation files.
- Promote code to `ui/`, `hooks/`, `types/` or `lib/` only when it is genuinely shared by multiple features.
- Keep shared/domain content in `data/`; do not move one-off component styling or behavior there.
- Do not introduce global state or service layers without a concrete need.
- Store reusable design values in shared tokens and frequently tuned component values in explicit config rather than scattering magic values.
- Keep content typed so migration to a CMS is straightforward.
- One cohesive feature or fix should normally map to one cohesive commit.

## Project documentation

- [Route transitions](docs/route-transitions.md) — reusable navigation animation and asset-loading strategy.

## Deployment

The project is structured for Vercel. Deployment configuration will be added when the first deploy target is connected.
