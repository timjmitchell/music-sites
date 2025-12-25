# Session Notes: 2025-12-25 - Initial Setup

## Summary

Set up the `club-business` Next.js app in the monorepo with audio player. Ran into Vercel deployment issues that need resolution.

## Completed

- [x] Read and reviewed CLAUDE.md and architecture decisions
- [x] Cloned Lovable design repo, extracted design patterns
- [x] Created `apps/club-business` Next.js 15 app
- [x] Ported design system (Tailwind config, CSS variables, fonts)
- [x] Ported UI components (Button, Card)
- [x] Built page sections (Navbar, Hero, Music, Tour, About, Footer)
- [x] Built custom audio player with:
  - `useAudioPlayer` hook (play, pause, seek, volume, next/prev)
  - `AudioPlayer` component (controls, progress bar, volume)
  - `TrackList` component (clickable tracks with playing indicators)
- [x] Configured R2 integration in `next.config.ts`
- [x] Set up R2 public bucket URL in `.env.local`
- [x] Pushed all code to GitHub

## Blocked

### Vercel Deployment Not Recognizing Monorepo Root Directory

**Issue:** Vercel's monorepo project creation UI does not show `apps/club-business` as a selectable directory. Only shows `docs` and `packages`.

**Attempted:**
1. Set Root Directory to `apps/club-business` in project settings → "does not exist" error
2. Added `vercel.json` with `"framework": "nextjs"` → no change
3. Enabled "include files outside root directory" → no change
4. Added `public/.gitkeep` to ensure directory exists → no change
5. Multiple redeploys and empty commits → same error
6. Deleted and recreated project → monorepo picker still doesn't show `apps/`

**Possible causes:**
- Vercel's framework detection not recognizing the Next.js app structure
- Monorepo detection looking for specific config (turborepo not detecting apps?)
- Caching issue on Vercel's side

**Next steps to try:**
1. Use Vercel CLI from dev machine: `cd apps/club-business && npx vercel`
2. Create project, let it fail, then manually configure settings
3. Check if `turbo.json` needs additional config for Vercel
4. Contact Vercel support if persists

## Files Created

```
apps/club-business/
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── public/.gitkeep
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── audio-player/
    │   │   ├── audio-player.tsx
    │   │   ├── index.ts
    │   │   ├── track-list.tsx
    │   │   └── use-audio-player.ts
    │   ├── sections/
    │   │   ├── about-section.tsx
    │   │   ├── footer.tsx
    │   │   ├── hero-section.tsx
    │   │   ├── music-section.tsx
    │   │   ├── navbar.tsx
    │   │   └── tour-section.tsx
    │   └── ui/
    │       ├── button.tsx
    │       └── card.tsx
    └── lib/
        └── utils.ts
```

## Environment

- R2 Public URL: `https://pub-5c42135ba19f42c8bf2be18a72dda052.r2.dev`
- Could not run `npm install` locally due to npm cache permissions issue (`sudo chown -R 501:20 "/Users/timmacbook/.npm"` needed)

## Next Session

1. Fix npm permissions on dev machine
2. Run `npm install` and test locally
3. Deploy via Vercel CLI or resolve UI issue
4. Upload test audio files to R2
5. Connect audio player to real R2 URLs
