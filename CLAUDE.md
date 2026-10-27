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
- App details (download file, size, release note, CTA text) live in the `APPS` object in the script. The Synapse Y installer file is a placeholder under `downloads/` and doesn't exist yet.
- **Synapse X downloads are live**: same approach as SynapseVPN, using the newest release of `DavidTG08/SynapseX-releases` (public, installers only; code is in the private `DavidTG08/SynapseX`). The script updates every `.js-x-file` link and `.js-x-version` label. Publishing a new release there is all that's needed.
- **SynapseVPN downloads are live**: the script asks the GitHub API for the newest release of `DavidTG08/SynapseVPN-releases` (public, installers only; the code repo may be private) and points every `.js-vpn-file` link at its `.exe` (version shown in `.js-vpn-version`). No site change is needed when a new SynapseVPN version is published. Falls back to the releases page.
- Synapse M (maps) was removed on 2026-10-27 at the owner's request; don't bring back the `/maps` app or the Synapse M tab.
- "Feedback" (floating bottom-right button + footer link) opens a dialog (Good/Bad, message, optional email) that emails `support@zynaps.site` via FormSubmit (`formsubmit.co/ajax/...`). FormSubmit needs a one-time "Activate" click in the first email it sends to that address.
- "Support" links open a contact menu (Gmail, Outlook, Yahoo, default app, copy address) for `support@zynaps.site`.

## Design reference
Styled after dbvault.app: near-black background, Inter font, flat accent buttons, terminal-style cards, uppercase eyebrows, feature group cards.

## Work in progress
- Tips are live: `TIP_URL` in the script is the Stripe Payment Link (customer chooses amount). Stripe redirects to `https://zynaps.site/#thanks` after a tip, which shows a thank-you toast.
