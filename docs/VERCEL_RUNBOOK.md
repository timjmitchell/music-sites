# Vercel Deployment Runbook

Deployment patterns and troubleshooting for Vercel in this monorepo.

## Quick Deploy (CLI)

From any app directory:

```bash
cd apps/[artist-name]
vercel --prod --yes
```

First deploy links the project. Subsequent deploys are faster with cached dependencies.

## Monorepo Structure Issue

**Problem:** Vercel's web UI monorepo picker may not show `apps/` subdirectories when creating a new project. Only `docs/` and `packages/` appear as options.

**Cause:** Unknown - possibly framework detection or Turborepo config issue.

**Solution:** Use the Vercel CLI instead of the web UI for initial project setup.

```bash
# From the app directory (not repo root)
cd apps/club-business
vercel --prod --yes
```

The CLI:

1. Auto-detects Next.js from `next.config.ts`
2. Creates the project in Vercel
3. Links it locally (creates `.vercel/` directory)
4. Deploys to production

After initial CLI setup, the project appears in the Vercel dashboard and can be managed via UI.

## Project Configuration

Each app should have a `vercel.json`:

```json
{
  "framework": "nextjs"
}
```

This ensures correct framework detection even if auto-detection fails.

## Git Integration

After CLI deployment, you can optionally connect Git for auto-deploys:

1. Go to Vercel Dashboard > Project > Settings > Git
2. Connect repository
3. Set Root Directory to `apps/[artist-name]`

Or continue using CLI deploys - both work fine.

## Environment Variables

Set via Vercel Dashboard or CLI:

```bash
vercel env add NEXT_PUBLIC_R2_URL production
vercel env add RESEND_API_KEY production
vercel env add RESEND_AUDIENCE_ID production
```

## Troubleshooting

### 401 on Preview URLs

Vercel's deployment protection may block preview URLs. Use the main alias (e.g., `project-name.vercel.app`) or disable protection in project settings.

### Build Failures

Check logs:

```bash
vercel inspect [deployment-url] --logs
```

### Redeploy

```bash
vercel redeploy [deployment-url]
```

Or from the app directory:

```bash
vercel --prod --yes
```
