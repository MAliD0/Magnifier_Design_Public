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
│   ├── layout/          # header, footer, page shell
│   ├── sections/        # reusable page sections
│   └── ui/              # reusable UI primitives
├── data/                # typed static content before CMS integration
├── features/            # feature-owned code
├── lib/                 # shared utilities
├── styles/              # design tokens and shared CSS
└── types/               # shared TypeScript models

public/
└── images/              # local static imagery
```

## Architecture rules

- Prefer Server Components. Add `"use client"` only for actual browser interaction.
- Keep page components compositional; move reusable sections/components out of routes.
- Keep feature-specific behavior in `features/`.
- Do not introduce global state or service layers without a concrete need.
- Store design values in shared tokens rather than scattering magic values.
- Keep content typed so migration to a CMS is straightforward.
- One cohesive feature or fix should normally map to one cohesive commit.

## Deployment

The project is structured for Vercel. Deployment configuration will be added when the first deploy target is connected.
