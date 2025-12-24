# Evaluation: Artist Stack (Issue #28)

> **Status:** Complete
> **Date:** 2025-12-23
> **Related Issue:** [#28](https://github.com/timjmitchell/sites-pr/issues/28)

## TL;DR

**Verdict: Feasible with modifications**

| Aspect | Assessment |
|--------|------------|
| Core Stack (Next.js + R2 + Resend) | ✅ Sound choices |
| Cloudflare Workers | ⚠️ Skip for MVP, add later if needed |
| Python automation | ⚠️ Use Node.js instead (same ecosystem) |
| sites-pr reuse | ~15 files can be copied directly |

**Recommended MVP Stack:**
- Next.js 16 + Tailwind 4 + ShadCN (from sites-pr)
- Cloudflare R2 (direct public URLs)
- react-h5-audio-player → WaveSurfer.js upgrade path
- yet-another-react-lightbox for gallery
- Resend for email capture

---

## Summary

**Verdict: Feasible with modifications**

The proposed architecture is sound but overly complex for an initial build. I recommend a phased approach that starts simpler and adds complexity as needed.

---

## Proposed Architecture Analysis

### What's Good

| Component | Assessment |
|-----------|------------|
| Next.js + Vercel | ✅ Proven stack, aligns with sites-pr patterns |
| Cloudflare R2 | ✅ Zero egress fees, ideal for media-heavy sites |
| Resend | ✅ Simple email API, good DX, reasonable pricing |
| MDX for content | ✅ Perfect for press releases, artist statements |

### Concerns

| Proposal | Issue | Recommendation |
|----------|-------|----------------|
| Cloudflare Workers for URL routing | Over-engineered for MVP | Use Next.js API routes or direct R2 public URLs |
| Python automation scripts | Adds toolchain complexity | Use Node.js scripts (same ecosystem) or defer |
| `process_and_upload.py` workflow | Manual step before deploy | Integrate into build pipeline or use Vercel Image Optimization |

---

## Recommended Approach

### Phase 1: MVP (Start Here)

**Stack:**
- Next.js 16 (App Router) on Vercel
- Tailwind CSS 4 + ShadCN UI
- MDX for press/bio content
- R2 for media storage (direct public URLs)
- Resend for email capture

**Structure:**
```
artist-stack/
├── apps/
│   └── portfolio/
│       ├── src/app/
│       │   ├── page.tsx          # Landing with audio player
│       │   ├── gallery/          # Image grid from R2
│       │   ├── about/            # Bio (MDX)
│       │   ├── press/            # News/releases (MDX)
│       │   └── api/subscribe/    # Email capture
│       ├── content/
│       │   └── press/            # MDX files
│       └── public/               # Static assets
├── turbo.json
└── package.json
```

**Skip for MVP:**
- Cloudflare Workers (use direct R2 URLs)
- Python scripts (manual upload or Node.js if needed)
- Custom audio processing (use pre-processed files)

### Phase 2: Enhancements (If Needed)

Add based on actual pain points:
- Cloudflare Worker for vanity URLs if branding requires it
- Image optimization pipeline (Vercel handles this)
- Admin dashboard for non-technical content updates

---

## Components to Copy from sites-pr

### Essential (Copy Verbatim)
- `package.json`, `turbo.json`, `.gitignore` (monorepo root)
- `apps/semops/next.config.ts`, `tsconfig.json`, `postcss.config.mjs`
- `components.json` (ShadCN config)
- `src/lib/utils.ts` (cn helper)
- `src/components/ui/` (button, card)
- `src/components/layouts/page-layout.tsx`

### Adapt
- `src/app/globals.css` → Artist brand colors/fonts
- `src/components/nav.tsx` → Artist navigation
- `src/components/footer.tsx` → Social links, copyright
- `src/lib/mdx.ts` → For press releases
- `src/app/blog/` → Rename to `/press/`

### New Components Needed
- Audio player (use react-player or custom)
- Image gallery grid
- Email signup form (Resend integration)
- R2 image loader utilities

---

## Technical Decisions

### R2 Integration Options

**Option A: Direct Public URLs (Recommended for MVP)**
```typescript
// Simple - just use public R2 URL
<Image src={`${R2_PUBLIC_URL}/gallery/artwork-1.webp`} />
```

**Option B: Cloudflare Worker Proxy (Later)**
```
media.artistname.com/gallery/artwork-1.webp
       ↓
Worker rewrites to R2 bucket URL
```

Only needed if you want custom domain URLs for media.

### Image Optimization

Vercel handles this automatically for `<Image>` components. For R2:
```typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '*.r2.dev' },
  ],
}
```

### Audio Player

Options:
1. **react-player** - Simple, supports many formats
2. **Custom** - HTML5 `<audio>` with styled controls
3. **Wavesurfer.js** - If waveform visualization needed

Recommendation: Start with react-player, customize later if needed.

---

## Audio Player Deep Dive

### Recommendation Matrix

| Library | Best For | Waveform? | Complexity | Weekly Downloads |
|---------|----------|-----------|------------|------------------|
| **react-h5-audio-player** | Quick MVP, clean UI | ❌ | Low | ~80k |
| **WaveSurfer.js** | Pro waveform visualization | ✅ | Medium | ~200k |
| **react-use-audio-player** | Hooks-based, streaming | ❌ | Low | ~5k |
| **Custom HTML5 Audio** | Full control, minimal deps | ❌ | Medium | N/A |

### My Recommendation: Tiered Approach

**MVP: react-h5-audio-player**
- Pre-built, styled controls
- Works with streaming URLs (R2)
- Customizable via CSS
- Zero config to start

**Upgrade Path: WaveSurfer.js**
- Add when waveform visualization matters
- More "SoundCloud-like" aesthetic
- Can pre-generate waveform data server-side for performance

### Implementation Snippets

**Option A: react-h5-audio-player (Simple)**
```tsx
'use client';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export function TrackPlayer({ src, title }: { src: string; title: string }) {
  return (
    <div className="max-w-md">
      <p className="text-sm font-medium mb-2">{title}</p>
      <AudioPlayer
        src={src}
        showJumpControls={false}
        customProgressBarSection={['PROGRESS_BAR', 'CURRENT_TIME', 'DURATION']}
        customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
      />
    </div>
  );
}
```

**Option B: WaveSurfer.js (Waveform)**
```tsx
'use client';
import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

export function WaveformPlayer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#4a5568',
      progressColor: '#2d6a4f',
      cursorWidth: 1,
      height: 80,
      barWidth: 2,
      barGap: 1,
    });

    wavesurferRef.current.load(src);

    return () => wavesurferRef.current?.destroy();
  }, [src]);

  return (
    <div>
      <div ref={containerRef} />
      <button onClick={() => wavesurferRef.current?.playPause()}>
        Play/Pause
      </button>
    </div>
  );
}
```

**Option C: Hybrid (Best of Both)**

Start with react-h5-audio-player for quick launch, then create a WaveSurfer variant component later. Same API surface, swap implementations.

### Performance Considerations

For R2-hosted audio:
- Use streaming URLs (no full download before play)
- For WaveSurfer with large files, pre-generate waveform JSON and pass via `peaks` prop
- Consider lazy loading player component to reduce initial bundle

### Sources

- [react-h5-audio-player](https://www.npmjs.com/package/react-h5-audio-player) - Ready-to-use player with custom controls
- [react-player](https://www.npmjs.com/package/react-player) - Multi-source player (YouTube, Vimeo, audio, video)
- [WaveSurfer.js with React](https://medium.com/trackstack/simple-audio-waveform-with-wavesurfer-js-and-react-ae6c0653b240) - Waveform implementation guide
- [react-audio-wave-modern](https://github.com/SaiBarathR/react-audio-wave-modern) - WaveSurfer React wrapper
- [react-use-audio-player](https://www.npmjs.com/package/react-use-audio-player) - Hooks-based approach with Howler.js
- [Building Custom Audio Player in React](https://dev.to/gyantocode/building-a-custom-audio-player-in-react-a-step-by-step-guide-25d0) - DIY approach

---

## Resend Email Capture Deep Dive

### Overview

Resend provides two key features for the Artist Stack:
1. **Transactional Emails** - Welcome emails, download links
2. **Audiences** - Subscriber list management with segments

### Pricing

| Tier | Emails/mo | Contacts | Cost |
|------|-----------|----------|------|
| Free | 3,000 | 1,000 | $0 |
| Pro | 50,000 | 5,000 | $20/mo |
| Audiences add-on | - | 5,000+ | $40/mo |

For an artist starting out, the free tier is sufficient for email capture + incentive delivery.

### Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│  Signup Form    │────▶│  API Route       │────▶│  Resend     │
│  (React Client) │     │  /api/subscribe  │     │  Audiences  │
└─────────────────┘     └──────────────────┘     └─────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │  Send Welcome    │────▶ [R2 Download Link]
                        │  Email           │
                        └──────────────────┘
```

### Implementation

**1. Install Dependencies**
```bash
npm install resend @react-email/components
```

**2. Environment Variables**
```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_AUDIENCE_ID=aud_xxxxxxxxxxxx
```

**3. Email Template** (`src/components/emails/welcome.tsx`)
```tsx
import { Html, Head, Body, Container, Text, Link, Button } from '@react-email/components';

interface WelcomeEmailProps {
  firstName?: string;
  downloadUrl: string;
}

export function WelcomeEmail({ firstName, downloadUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif' }}>
        <Container>
          <Text>Hey {firstName || 'there'}!</Text>
          <Text>Thanks for signing up. Here's your exclusive download:</Text>
          <Button href={downloadUrl} style={{ background: '#2d6a4f', color: '#fff', padding: '12px 20px' }}>
            Download Now
          </Button>
          <Text style={{ fontSize: '12px', color: '#666' }}>
            This link expires in 7 days.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

**4. API Route** (`src/app/api/subscribe/route.ts`)
```typescript
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { WelcomeEmail } from '@/components/emails/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const DOWNLOAD_URL = `${process.env.R2_PUBLIC_URL}/exclusive/track.mp3`;

export async function POST(request: Request) {
  const { email, firstName } = await request.json();

  // Validate
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    // Add to audience
    await resend.contacts.create({
      email,
      firstName,
      audienceId: AUDIENCE_ID,
    });

    // Send welcome email with download
    await resend.emails.send({
      from: 'Artist Name <hello@artistdomain.com>',
      to: email,
      subject: 'Your exclusive download is ready 🎵',
      react: WelcomeEmail({ firstName, downloadUrl: DOWNLOAD_URL }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
```

**5. Signup Form Component** (`src/components/email-signup.tsx`)
```tsx
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function EmailSignup() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName }),
    });

    setStatus(res.ok ? 'success' : 'error');
  };

  if (status === 'success') {
    return (
      <div className="text-center p-6 bg-accent rounded-lg">
        <p className="font-medium">Check your inbox! 🎉</p>
        <p className="text-sm text-muted-foreground">Your download link is on its way.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        placeholder="First name (optional)"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <Button type="submit" disabled={status === 'loading'} className="w-full">
        {status === 'loading' ? 'Joining...' : 'Get Free Download'}
      </Button>
      {status === 'error' && (
        <p className="text-sm text-red-500">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
```

### Incentive Delivery Options

| Approach | Pros | Cons |
|----------|------|------|
| **Direct R2 link** | Simple, immediate | Link can be shared/leaked |
| **Signed URL** | Time-limited, trackable | Requires Worker or API |
| **Unique token** | One-time use, analytics | More complex |

**Recommendation:** Start with direct R2 link. If leakage becomes an issue, add signed URLs later.

### Resend Dashboard Setup

1. Create account at [resend.com](https://resend.com)
2. Add + verify domain (DNS records)
3. Create an Audience (e.g., "Artist Mailing List")
4. Copy Audience ID to `.env`
5. Generate API key (full access for now, restrict later)

### Future Enhancements

- **Segments/Topics:** Allow fans to choose interests (new releases, tour dates, merch)
- **Broadcast API:** Send newsletters to audience
- **Double opt-in:** Add confirmation step for compliance (GDPR)

### Sources

- [Resend + Next.js Docs](https://resend.com/docs/send-with-nextjs)
- [Resend Audiences](https://resend.com/features/audiences)
- [Manage Subscribers with Audiences](https://resend.com/blog/manage-subscribers-using-resend-audiences)
- [Get Contact by Email API](https://resend.com/changelog/get-contact-by-email)
- [Broadcast API](https://resend.com/blog/broadcast-api)

---

## Image Gallery Deep Dive

### Library Comparison

| Library | Size | Masonry? | Lightbox? | Next.js Image? | Maintained? |
|---------|------|----------|-----------|----------------|-------------|
| **yet-another-react-lightbox** | 13KB | ❌ | ✅ | ✅ | ✅ Active |
| **react-masonry-css** | 3KB | ✅ | ❌ | ✅ | ⚠️ Stable |
| **lightgallery** | 25KB | ❌ | ✅ | ⚠️ Partial | ✅ Active |
| **react-grid-gallery** | 15KB | ⚠️ Grid | ✅ | ❌ | ⚠️ |
| **CSS Grid (native)** | 0KB | ✅ | ❌ | ✅ | N/A |

### Recommended Stack

**MVP: CSS Grid + yet-another-react-lightbox**
- Native CSS for layout (no masonry deps)
- Lightweight lightbox with Next.js Image support
- Works with React 19
- Plugin system (zoom, thumbnails, fullscreen)

**Advanced: react-masonry-css + yet-another-react-lightbox**
- True masonry layout for varied image sizes
- Same lightbox benefits

### Implementation

**1. Install Dependencies**
```bash
npm install yet-another-react-lightbox
```

**2. Gallery Grid Component** (`src/components/gallery-grid.tsx`)
```tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Optional plugins
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [index, setIndex] = useState(-1);

  // Convert to lightbox format
  const slides = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    width: img.width,
    height: img.height,
  }));

  return (
    <>
      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, i) => (
          <button
            key={image.src}
            onClick={() => setIndex(i)}
            className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </>
  );
}
```

**3. With Masonry Layout** (optional)
```bash
npm install react-masonry-css
```

```tsx
import Masonry from 'react-masonry-css';

const breakpoints = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

// Replace grid div with:
<Masonry
  breakpointCols={breakpoints}
  className="flex -ml-4 w-auto"
  columnClassName="pl-4 bg-clip-padding"
>
  {images.map((image, i) => (
    <button key={image.src} onClick={() => setIndex(i)} className="mb-4">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="rounded-lg hover:opacity-90 transition-opacity"
      />
    </button>
  ))}
</Masonry>
```

### R2 Integration

**Next.js Config for R2 Images**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',  // R2 public bucket pattern
      },
    ],
  },
};
```

**Gallery Data Structure**
```typescript
// src/lib/gallery.ts
export interface GalleryImage {
  src: string;        // R2 URL
  alt: string;
  width: number;
  height: number;
  title?: string;
  category?: string;
}

// Option A: Static data file
export const galleryImages: GalleryImage[] = [
  {
    src: `${process.env.NEXT_PUBLIC_R2_URL}/gallery/artwork-1.webp`,
    alt: 'Artwork Title',
    width: 1200,
    height: 800,
    category: 'paintings',
  },
  // ...
];

// Option B: Fetch from JSON in R2
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const res = await fetch(`${process.env.R2_PUBLIC_URL}/gallery/manifest.json`);
  return res.json();
}
```

### Image Optimization Workflow

For artist artwork, image quality matters. Options:

| Approach | Pros | Cons |
|----------|------|------|
| **Vercel Image Optimization** | Automatic, no setup | Uses Vercel bandwidth quota |
| **Upload pre-optimized** | Full control, zero runtime cost | Manual workflow |
| **Cloudflare Image Resizing** | Works with R2, flexible | Extra Cloudflare cost |

**Recommendation:** Pre-optimize before upload.

**Simple Pre-upload Script** (Node.js)
```javascript
// scripts/optimize-images.js
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'fs';
import { join, parse } from 'path';

const INPUT_DIR = './raw-images';
const OUTPUT_DIR = './optimized';
const SIZES = [
  { suffix: '-thumb', width: 400 },
  { suffix: '-medium', width: 1200 },
  { suffix: '-full', width: 2400 },
];

mkdirSync(OUTPUT_DIR, { recursive: true });

for (const file of readdirSync(INPUT_DIR)) {
  const { name } = parse(file);
  const input = join(INPUT_DIR, file);

  for (const { suffix, width } of SIZES) {
    await sharp(input)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(join(OUTPUT_DIR, `${name}${suffix}.webp`));
  }
}
console.log('Done!');
```

### Lazy Loading

Next.js `<Image>` has lazy loading built-in. For galleries with 50+ images:

```tsx
<Image
  src={image.src}
  alt={image.alt}
  fill
  loading="lazy"              // Default, explicit for clarity
  placeholder="blur"          // Optional: requires blurDataURL
  blurDataURL={image.blur}    // Base64 tiny placeholder
/>
```

**Generate blur placeholders** (build time):
```typescript
import { getPlaiceholder } from 'plaiceholder';

const { base64 } = await getPlaiceholder(imageBuffer);
// Store base64 in gallery manifest
```

### Gallery Page Structure

```tsx
// src/app/gallery/page.tsx
import { GalleryGrid } from '@/components/gallery-grid';
import { galleryImages } from '@/lib/gallery';

export const metadata = {
  title: 'Gallery | Artist Name',
  description: 'View artwork by Artist Name',
};

export default function GalleryPage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Gallery</h1>
      <GalleryGrid images={galleryImages} />
    </main>
  );
}
```

### Category Filtering (Enhancement)

```tsx
'use client';
import { useState } from 'react';

const categories = ['All', 'Paintings', 'Sculptures', 'Prints'];

export function GalleryWithFilters({ images }) {
  const [category, setCategory] = useState('All');

  const filtered = category === 'All'
    ? images
    : images.filter((img) => img.category === category.toLowerCase());

  return (
    <>
      <div className="flex gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded ${
              category === cat ? 'bg-primary text-white' : 'bg-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <GalleryGrid images={filtered} />
    </>
  );
}
```

### Sources

- [yet-another-react-lightbox](https://yet-another-react-lightbox.com/) - Modern lightbox for React
- [Next.js Examples](https://yet-another-react-lightbox.com/examples/nextjs) - Official Next.js integration
- [react-masonry-css](https://www.npmjs.com/package/react-masonry-css) - Simple masonry layout
- [Next.js Masonry Gallery Tutorial](https://www.fullstackfoundations.com/blog/nextjs-masonry-image-gallery-lightbox) - Complete implementation guide
- [Handling 500+ Images in Next.js 15](https://www.buildwithmatija.com/blog/handling-500-images-in-a-gallery-with-lazy-loading-in-next-js-15) - Large gallery optimization

---

## Open Questions

Before implementation:

1. **Domain:** What's the artist's domain? (affects R2 custom domain setup)
2. **Content volume:** How many images/tracks? (affects whether automation scripts matter)
3. **Design:** Any existing brand guidelines or starting from scratch?
4. **Email incentive:** What's the free download? (affects R2 file organization)

---

## Effort Estimate

| Phase | Scope |
|-------|-------|
| MVP | Monorepo setup, landing page, gallery, press, email capture |
| Polish | Custom audio player, animations, mobile optimization |
| Scale | Worker proxy, admin dashboard, multiple artist support |

---

## Next Steps

1. Create new repo `artist-stack` or similar
2. Copy monorepo skeleton from sites-pr
3. Adapt design system for artist brand
4. Build MVP pages (home, gallery, about, press)
5. Integrate R2 for media
6. Add Resend email capture
7. Deploy to Vercel
