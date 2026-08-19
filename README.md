# The Seekers

The production website for The Seekers NFT treasure hunt, prepared for Netlify.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy

Connect this folder's Git repository to Netlify. Netlify will detect Next.js and run `npm run build`. Leave the publish directory blank so the Next.js adapter can configure it automatically.

The whitelist endpoint stores wallet, X proof, and Discord submissions in Netlify Blobs. See `NETLIFY-DEPLOY.md` for the complete deployment steps.
