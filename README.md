# music-sites

Monorepo for artist/musician portfolio websites.

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, ShadCN UI
- **Media:** Cloudflare R2 (images, audio, downloads)
- **Email:** Resend (fan acquisition, newsletters)
- **Hosting:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

## Structure

```
music-sites/
├── apps/           # One Next.js app per artist
├── packages/       # Shared components and utilities
└── docs/           # Architecture decisions, session notes
```

## Adding an Artist Site

See [CLAUDE.md](CLAUDE.md) for detailed instructions.
