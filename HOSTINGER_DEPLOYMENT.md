# Hostinger Cloud deployment

This repository is self-contained for Hostinger's managed Node.js Web App hosting:

- build command: `npm run build`
- start command: `npm start`
- Node.js: `22.x` (the project supports Node 20–24)
- application type: `Other` if Hostinger does not identify the Vite + Node setup automatically

The Node server serves the Vite build, returns the SPA entry point for `/contact`,
`/de/contact`, `/fr/contact`, and `/it/contact`, and exposes `POST /api/contact`.
There is no Vercel dependency.

## One-time hPanel setup

1. In Hostinger, choose **Websites → Add website → Node.js Web App → Import Git Repository** and select `anikeaty08/klar`, branch `main`. GitHub import enables automatic redeploys on future pushes.
2. Attach `klardatalabs.com` and `www.klardatalabs.com` to the new web app. Do this only after backing up/removing any existing Hostinger website already assigned to those domains.
3. In the deployment settings, select Node `22.x`, use the build and start commands above, then deploy.
4. Add every value from `.env.example` in the Web App environment-variable screen. Keep secrets only in hPanel—never in GitHub or the frontend. `VITE_TURNSTILE_SITE_KEY` is intentionally public, but must be present at build time.
   To notify multiple team inboxes, set `CONTACT_TO` to a comma-separated list. Set `CONTACT_REPLY_TO` to the one shared inbox that should receive replies to optional visitor confirmation emails.
5. In Cloudflare Turnstile, add the Hostinger production hostnames to the widget's allowed domains. Then set the same hostnames in `TURNSTILE_HOSTNAMES`.
6. In Resend, verify the `CONTACT_FROM` sending domain before turning on `CONTACT_AUTOREPLY=true`.

## Release checks

After deploy, load `/`, `/contact`, `/de/contact`, `/fr/contact`, and `/it/contact` directly in a private browser window. Submit a test enquiry and confirm the team email arrives. Inspect the Hostinger Node.js runtime logs if the request returns an error.

## Rollback

Disconnect the repository or redeploy the last known-good Git commit from hPanel. Keep the old Vercel deployment live until these release checks pass; then remove its custom-domain DNS records.
