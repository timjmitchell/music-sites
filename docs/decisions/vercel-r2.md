# 🚀 Implementation Guide: Artist Sovereign Stack

## 1. Asset Division Strategy

To optimize for **cost (zero egress)** and **deployment speed**, assets are split by their function.

| Asset Category | Type | Location | Implementation |
| --- | --- | --- | --- |
| **Structural** | Logos, UI Icons, Fonts, Hero Backgrounds | `vercel/public/` | Referenced as `/logo.svg`. Part of Git repo. |
| **Content** | Photography, MP3s, Video, PDF Zines | **Cloudflare R2** | Referenced via `https://media.yourdomain.com/...` |

### Why this split?

* **Vercel:** Keeps the "look and feel" atomic. When you update the CSS/Logo, it’s live instantly.
* **R2:** Prevents your Git repo from becoming massive (which slows builds) and avoids Vercel's bandwidth costs.

---

## 2. Managing the "Prebuild" (ISR)

Vercel doesn't just "cache" your site; it **pre-renders** it into static HTML. This ensures fans never wait for a database query from Supabase.

### A. Background Revalidation (Simple)

Set a timer in your code. Vercel will serve a "stale" version to the first user after the timer expires, while silently fetching new data from Supabase in the background for the *next* user.

```javascript
// page.tsx
export const revalidate = 3600; // Re-check Supabase every 1 hour

```

### B. On-Demand Revalidation (Pro)

If you want the site to update the **second** you save a new photo in Supabase, use a Webhook.

1. **Supabase:** Set up a Database Webhook that fires on `INSERT` or `UPDATE`.
2. **Vercel:** Create an API route (`/api/revalidate`) that calls `revalidatePath('/')`.

---

## 3. The Media Workflow (Python + R2)

Your Python script is the "Bridge" that prepares your content for the web.

```python
# launch.py logic
# 1. OPTIMIZE: Use Pillow/Pydub to create WebP (80% quality) and MP3 (128kbps).
# 2. UPLOAD: Use Boto3 to push files to R2 bucket.
# 3. METADATA: Update your 'album.json' or Supabase 'tracks' table with the NEW R2 URLs.
# 4. TRIGGER: Call your Vercel /api/revalidate endpoint to refresh the site.

```

---

## 4. Branding & Delivery (Cloudflare DNS)

Since your DNS is at Cloudflare, you get a "Custom Media Domain" for free.

* **DNS Record:** Create a CNAME `media` pointing to your R2 Bucket.
* **Worker (Optional):** Use a Cloudflare Worker on `media.yourdomain.com` if you want to add **Hotlink Protection** (preventing other sites from stealing your bandwidth).

---

## 5. Summary Project Structure

```text
/my-artist-site
├── /app                # Next.js Pages & API routes (Vercel)
│   └── /api/revalidate # Webhook listener to refresh the "Prebuild"
├── /public             # UI Assets (Logos, Fonts, Hero)
├── /scripts            # Python Automation (Media processing)
│   └── launch.py       # The "Single Source of Truth" script
└── /emails             # Lovable-designed React Email templates

```

### Next Step for Implementation:

Would you like the **exact Python code** for the "Trigger" step? This is the final piece that tells Vercel: *"Hey, I just finished uploading new photos to R2—update the website now!"*