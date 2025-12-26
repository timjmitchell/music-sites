# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Bounded Context:** Artist/Musician Websites

Monorepo for artist portfolio sites featuring:
- Audio streaming and downloads
- Image galleries
- Press/news content (MDX)
- Email capture for fan acquisition

## Quick Reference

```bash
# Development (from repo root)
npm run dev                    # Start all apps via Turborepo
npm run build                  # Production build all apps
npm run lint                   # ESLint check all apps

# Single app development
npm run dev --workspace=@music/[artist-name]
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Monorepo | npm workspaces + Turborepo |
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, ShadCN UI |
| Content | MDX (press releases, artist bios) |
| Media Storage | Cloudflare R2 (zero egress fees) |
| Email | Resend (audience management + transactional) |
| Hosting | Vercel |

## Project Structure

```text
music-sites/
├── apps/
│   └── [artist-name]/          # One app per artist
│       ├── src/
│       │   ├── app/            # Next.js App Router pages
│       │   ├── components/     # React components
│       │   └── lib/            # Utilities
│       ├── content/            # MDX content (press, bio)
│       └── public/             # Static assets
├── packages/
│   └── shared/                 # Shared components, utils
├── docs/
│   ├── decisions/              # Architecture Decision Records
│   └── session-notes/          # Session logs by issue
├── turbo.json                  # Turborepo config
└── package.json                # Workspace root
```

## Key Patterns

### R2 Media Integration

```typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '*.r2.dev' },
    { protocol: 'https', hostname: 'pub-*.r2.dev' },
  ],
}

// Usage
<Image src={`${process.env.NEXT_PUBLIC_R2_URL}/gallery/artwork.webp`} />
```

### Audio Player

Start with `react-h5-audio-player` for MVP, upgrade to WaveSurfer.js for waveform visualization.

### Email Capture (Resend)

```typescript
// API route adds to audience + sends welcome email with download link
await resend.contacts.create({ email, audienceId: AUDIENCE_ID });
await resend.emails.send({ to: email, react: WelcomeEmail({ downloadUrl }) });
```

### MDX Press Releases

```mdx
---
title: "New Single Release"
date: "2025-01-15"
category: "Release"
---

Content here...
```

## Environment Variables

Each app needs:
```bash
# .env.local
NEXT_PUBLIC_R2_URL=https://pub-xxx.r2.dev
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_AUDIENCE_ID=aud_xxxxxxxxxxxx
```

## Adding a New Artist Site

1. Copy an existing app as template
2. Update `package.json` name to `@music/[artist-name]`
3. Adapt design system (fonts, colors in `globals.css`)
4. Configure R2 bucket paths
5. Set up Resend audience
6. Add dev script to root `package.json`
7. Deploy via Vercel CLI (see [docs/VERCEL_RUNBOOK.md](docs/VERCEL_RUNBOOK.md))

## Deployment

See [docs/VERCEL_RUNBOOK.md](docs/VERCEL_RUNBOOK.md) for deployment patterns.

**Quick deploy:**

```bash
cd apps/[artist-name]
vercel --prod --yes
```

Note: Use CLI for initial deploys - the Vercel web UI has issues detecting monorepo app directories.

## Session Notes

Document work sessions tied to GitHub Issues in `docs/session-notes/`:

- **Format:** `ISSUE-NN-description.md` (one file per issue, append-forever)
- **Structure:** Date sections within file for chronological tracking
- **Index:** Update `docs/SESSION_NOTES.md` with new entries

## Key Files

- [docs/decisions/](docs/decisions/) - Architecture Decision Records
- [docs/session-notes/](docs/session-notes/) - Session logs by issue
