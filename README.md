# Meme Mob Trend Studio — V2

Mobile-first browser app for making Instagram-sized meme images, generating punchline ideas, saving drafts locally, maintaining a local posting queue, and exporting that queue to CSV. The app is a static site and can be hosted on GitHub Pages.

## V2 upgrade
- Trend Radar displays a scheduled Google Trends India search-interest snapshot.
- GitHub Actions refreshes the snapshot every six hours; run it manually from **Actions → Refresh Meme Mob trend signals → Run workflow**.
- Local draft library and content queue (stored in the current browser/device).
- CSV export of the queue for spreadsheet/calendar use.
- Existing canvas meme editor, custom image upload, captions, hashtags and PNG export.
- PWA manifest and service worker for a more app-like experience.

## Deploy from Android
1. Extract this ZIP on your device or a computer.
2. Create a separate GitHub repository, e.g. `meme-mob`.
3. Upload the **contents** of this folder, keeping `.github/workflows`, `data`, and `scripts` folders intact. GitHub's web upload may hide dot-folders; if so, use GitHub's browser editor or upload from a computer with Git.
4. In **Settings → Pages**, select branch `main` and folder `/(root)`, then Save.
5. In **Actions**, enable workflows if GitHub asks, open **Refresh Meme Mob trend signals**, and select **Run workflow**.
6. Open `https://YOUR-USERNAME.github.io/meme-mob/` after Pages finishes deploying.
7. On Android Chrome, use menu **⋮ → Add to Home screen** (or **Install app** if shown).

## Important limitations
- Google Trends is a search-interest proxy. It does **not** reveal a complete Instagram-wide viral-meme ranking or reliably identify currently trending Instagram audio.
- The app does not generate photorealistic AI images; it creates editable text-over-image graphics and lets you upload a picture you have rights to use.
- The posting queue is a planner only; it does not publish posts or run in the background on your phone.
- Official Instagram publishing requires an eligible Professional account and authorized Meta API setup, plus a publicly accessible media URL. This static V2 does not contain Meta credentials or automatic publishing. Never put access tokens in browser JavaScript or a public GitHub repository.
- Use only images, music, and likenesses you have permission to publish. Check captions and trends before posting. No virality is guaranteed.
