# ShoesKopo - Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free) - Sign up at https://vercel.com

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Add New..." → "Project"

3. **Import your repository**
   - Connect your GitHub account if not already connected
   - Select your ShoesKopo repository
   - Click "Import"

4. **Configure the project**
   - Framework Preset: **Vite**
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Environment Variables** (if needed)
   - Add your environment variables from `.env` file
   - Example: `VITE_API_URL`, `VITE_SUPABASE_URL`, etc.

6. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your site will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd client
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time)
   - Project name? **shoeskopo** (or your preferred name)
   - Directory? **./client**
   - Override settings? **N**

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Important Notes

### Environment Variables
Make sure to add these in Vercel dashboard under Project Settings → Environment Variables:
- `VITE_API_URL` - Your backend API URL
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Automatic Deployments
- Every push to `main` branch will trigger automatic deployment
- Preview deployments are created for pull requests

## Troubleshooting

### Build fails?
- Check that all dependencies are in `package.json`
- Ensure `VITE_API_URL` is set in environment variables
- Check build logs in Vercel dashboard

### Images not loading?
- Verify images are in `client/public/models/` directory
- Use absolute paths: `/models/image.jpg`
- Check file names match exactly (case-sensitive)

### Routes not working?
- The `vercel.json` file handles SPA routing
- All routes redirect to `index.html`

## Performance Tips

1. **Enable Caching**: Vercel automatically caches static assets
2. **Image Optimization**: Consider using Vercel Image Optimization
3. **Analytics**: Enable Vercel Analytics in dashboard

## Your Live Site
After deployment, your site will be available at:
- Production: `https://shoeskopo.vercel.app` (or your custom domain)
- Preview: `https://shoeskopo-git-branch-name.vercel.app`

## Support
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/
