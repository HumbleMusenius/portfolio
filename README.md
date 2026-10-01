# Continuous Learner portfolio

Plain HTML/CSS/JS - no build step. Open `index.html` via any static host (GitHub Pages, Netlify, Cloudflare Pages: drag the folder in).

- `data.js` - all content: your name/tagline/contact, 45 credentials, themes, hiring lenses, journey chapters. Edit here.
- `certs/` - one PDF per credential (linked from each card).
- To add a new course: append one object to `COURSES` in `data.js` and drop its PDF in `certs/` (spaces -> underscores).
- Local preview: `node -e` or any static server from this folder (opening via file:// works for the page itself).
