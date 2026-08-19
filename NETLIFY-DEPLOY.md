# Deploy The Seekers on Netlify

This package has been converted from the original Cloudflare/Sites build to a standard Next.js application for Netlify.

## Recommended deployment

1. Extract this ZIP.
2. Upload the extracted folder to a new GitHub repository.
3. In Netlify, choose **Add new project → Import an existing project** and select that repository.
4. Netlify should detect Next.js automatically. Use:
   - Build command: `npm run build`
   - Publish directory: leave blank (automatic)
5. Deploy the site.

The whitelist form uses Netlify Blobs. It works when the app is deployed through Netlify and does not require you to create a separate database.

## Important

Do not use Netlify's static drag-and-drop deploy for this package. The whitelist form needs the Next.js server/API route, so deploy it from Git or with the Netlify CLI.

## Local check

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:3000`.
