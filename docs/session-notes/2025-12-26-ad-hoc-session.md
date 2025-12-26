# Session: Club Business Site Build-out

> **Date:** 2025-12-26
> **Type:** Ad-hoc exploration

## Context

Continuing from 2025-12-25 session. Building out the Club Business band website with audio player, syncing designs from Lovable, and deploying to Vercel.

## Work Done

### Vercel Deployment
- Ran `npm install` at repo root - succeeded (no permissions issues on Linux)
- Used Vercel CLI to deploy: `vercel --prod --yes` from `apps/club-business`
- CLI auto-detected Next.js, linked project, and deployed successfully
- Created `docs/VERCEL_RUNBOOK.md` documenting CLI workaround for monorepo UI issue
- Copied runbook to `sites-pr` repo as well

### Audio Player Connected to R2
- Connected custom HTML5 audio player to R2 bucket
- Three tracks streaming from R2:
  1. L'appel Du Vide
  2. The Savior
  3. Everything
- R2 URL: `https://pub-5c42135ba19f42c8bf2be18a72dda052.r2.dev`

### Synced Lovable Designs
Pulled updates from `github.com/timjmitchell/club-business-band`:
- Added hero image (`hero-image.png`) - full-width band image
- Added album cover (`club-business-cover.jpg`) to music section
- Created `EmailSignupSection` component with styled card
- Removed `TourSection` (not in Lovable design)
- Updated navbar links (Music, About only)
- Layout order: Hero → Music → EmailSignup → About → Footer

### ShadCN UI Components
- Copied 46 UI components from Lovable repo
- Added hooks: `use-toast.ts`, `use-mobile.tsx`
- Installed all Radix UI dependencies
- Fixed type issues (calendar, resizable)
- Removed incompatible: chart, resizable, sidebar

### New Bar-Style Audio Player
Built a new `BarPlayer` component inspired by professional playlist players:

**Layout:**
- Bar-style header with album art, track info, and controls
- Full-width progress bar with seek functionality
- Playlist below with track numbers, titles, durations
- Current track highlighted with animated playing indicator

**Keyboard Controls (added to `useAudioPlayer` hook):**
- `Space` - Play/Pause
- `←` - Previous track (or restart if >3 seconds in)
- `→` - Next track
- `↑` / `↓` - Volume up/down (10% increments)
- `M` - Mute/Unmute

**Mobile Responsive:**
- Smaller album art and buttons on mobile
- Volume slider hidden on mobile (touch devices use system volume)
- Keyboard hints hidden on mobile
- Touch-friendly playlist items

**Files created/modified:**
- `src/components/audio-player/bar-player.tsx` - New component
- `src/components/audio-player/use-audio-player.ts` - Added keyboard controls
- `src/components/sections/music-section.tsx` - Simplified to use BarPlayer

### Research: AmplitudeJS
Evaluated `serversideup/amplitudejs` as reference:
- Zero dependencies, ~45kb
- 100% customizable via HTML/CSS + data attributes
- Built-in keyboard bindings
- Waveform visualization via Web Audio API

Decided to build our own implementation instead, taking inspiration from the patterns but keeping it React-native with our existing hook architecture.

## Outcomes

- **Site live at:** https://club-business.vercel.app
- New bar-style audio player with keyboard controls
- Audio streaming working from R2
- Design synced with Lovable prototype
- Full ShadCN UI component library available

## Follow-up

- [ ] Connect email signup to Resend API
- [ ] Set up custom domain when ready
- [ ] Consider adding waveform visualization (Web Audio API)
- [ ] Add shuffle/repeat functionality if needed
