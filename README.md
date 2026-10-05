# Pavan Kalyan ❤️ Harshini — Wedding Reception Invite

A static, mobile-first motion invitation. No build step, no backend — it runs on GitHub Pages as is.

## Files
| File | What it is |
|---|---|
| `config.js` | **The only file you edit.** Names, date, time, venue, map link, programme, RSVP, music |
| `index.html`, `styles.css`, `app.js` | The page (no need to touch) |
| `assets/background.webp` | Floral background |
| `assets/music.mp3` | Background flute track |
| `assets/og-image.jpg` | WhatsApp / social preview image (1200×630) |
| `assets/favicon.png` | Browser icon |

## Deploy on GitHub Pages (no coding)
1. Create a free account at github.com, then **New repository** → name it e.g. `wedding-invite` → **Public** → Create.
2. Click **uploading an existing file**, drag in **everything inside this folder** (including the `assets` folder and the hidden `.nojekyll` file if your computer shows it), and click **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. Wait 1–2 minutes. Your link will be `https://YOUR-USERNAME.github.io/wedding-invite/`.

### With git instead
```bash
git init && git add . && git commit -m "Wedding invite"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/wedding-invite.git
git push -u origin main
```
then enable Pages as in step 3.

## Make the WhatsApp preview work (important)
Open `index.html` and replace the two `https://YOUR-USERNAME.github.io/YOUR-REPO/` URLs (`og:url`, `og:image`) with your real link, then commit. WhatsApp needs the full absolute image URL; it may cache previews, so test with a fresh link.

## Change details
Edit `config.js` (click the pencil icon on GitHub, change, **Commit**). The site updates in about a minute. Dates use ISO format with the India offset, e.g. `2026-11-27T18:30:00+05:30`; the countdown and calendar button follow it.

## Change photo / music
Replace `assets/background.webp` or `assets/music.mp3` with your own file of the **same name** (or change the path in `config.js` / `styles.css`). The invite is laid out around the arch in the current background, so a different background needs its text area re-aligned.

## RSVP
- **Easiest:** create a Google Form, put its link in `config.js` → `rsvp.link`. The RSVP button opens it.
- **Built-in form → Google Sheet:** leave `rsvp.link` empty, create a Sheet → Extensions → Apps Script, paste:
```js
function doPost(e){const d=JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSheet().appendRow([new Date(),d.name,d.attending,d.guests,d.message]);
  return ContentService.createTextOutput("ok");}
```
Deploy → **Web app** (execute as *me*, access *anyone*), copy the URL, and in `config.js` replace `submitRSVP` with:
```js
async function submitRSVP(d){
  await fetch("YOUR_WEB_APP_URL",{method:"POST",mode:"no-cors",body:JSON.stringify(d)});
}
```

## Notes
- Music starts after the guest's first tap (browsers block silent autoplay); a button pauses it.
- Make sure you have the right to publicly share the music track and background artwork.
