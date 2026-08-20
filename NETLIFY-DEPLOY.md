# Deploy The Seekers on Netlify

This is a standard Next.js application prepared for Netlify.

## Recommended deployment

1. Extract this ZIP.
2. Upload the extracted folder to a new GitHub repository.
3. In Netlify, choose **Add new project → Import an existing project** and select that repository.
4. Netlify should detect Next.js automatically. Use:
   - Build command: `npm run build`
   - Publish directory: leave blank (automatic)
5. Deploy the site.

No environment variables, Netlify Forms or database are required for this post-launch version.

## Important

Deploy from Git so Netlify can run the Next.js build and automatically publish each future GitHub update.

## Local check

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:3000`.
