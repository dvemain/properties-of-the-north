# Properties Of The North

Rebuild of propertiesofthenorth.com (Lake Leelanau, MI landscaping) as a single-page React (Vite) site, prepped for Netlify + GitHub.

- Copy lives in `src/data/content.js`; images in `public/img/` (pulled from the original site).
- Contact form posts to Netlify Forms (form name `estimate`) — enable form detection on the Netlify project and add an email notification.
- Run locally: double-click `start.bat` (installs deps on first run) → http://localhost:5176
- Deploy: push to GitHub, create a Netlify project from the repo — `netlify.toml` sets build/publish/SPA redirect.

Deployed on Netlify (DVEDEV) at propertiesofthenorth.com.
