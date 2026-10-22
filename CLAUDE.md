# zynaps.site

Download hub for three apps: **Synapse X**, **Synapse Y** and **SynapseVPN**.

## How it's built
- One static page: `index.html` (HTML, CSS and JS in one file). No build step.
- Logo: `Gemini_Generated_Image_wgi2nnwgi2nnwgi2-Photoroom.jpg` (WebP data with transparency, kept under this exact name).
- Hosted on **GitHub Pages** from the `main` branch. `CNAME` = `zynaps.site`, HTTPS enforced.
- DNS at Namecheap: four A records to GitHub (185.199.108–111.153) and `www` CNAME to `davidtg08.github.io`.

## Deploying
- Pushing to `main` updates https://zynaps.site within about a minute.
- Always `git pull` before editing — the site is edited from more than one computer.
- GitHub sometimes commits to `CNAME` itself; if a push is rejected, `git pull --rebase` and push again.

## Page structure
- Tabs: the zynaps.site logo is the **Main/Home** tab (default, clean URL). App tabs: Synapse X (`#x`), Synapse Y (`#y`), SynapseVPN (`#vpn`), in that order.
- Each tab sets `body[data-app]`, which switches the accent color:
  - home = silver (`--silver: #c4c9d1`), x = orange, y = purple, vpn = blue.
- All text uses `--silver` (no pure white). The logo has a subtle rotating multi-color glow (`.logo-wrap::before`).
- App details (download file, size, release note, CTA text) live in the `APPS` object in the script. Installer files are placeholders under `downloads/` and don't exist yet.
- "Feedback" (floating bottom-right button + footer link) opens a dialog (Good/Bad, message, optional email) that emails `support@zynaps.site` via FormSubmit (`formsubmit.co/ajax/...`). FormSubmit needs a one-time "Activate" click in the first email it sends to that address.
- "Support" links open a contact menu (Gmail, Outlook, Yahoo, default app, copy address) for `support@zynaps.site`.

## Design reference
Styled after dbvault.app: near-black background, Inter font, flat accent buttons, terminal-style cards, uppercase eyebrows, feature group cards.

## Work in progress
- Tip section (tip card + header/footer "Tip" links) is live on `main`, but `TIP_URL` in the script is still empty, so Tip buttons show a "coming soon" toast. Paste the Stripe Payment Link into `TIP_URL` once it exists. Stripe can redirect to `https://zynaps.site/#thanks` after a tip.
