<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Soul Garden Sound - Wellness Website

A beautiful, modern website for Soul Garden Sound with Decap CMS integration for easy content management.

## Features

- ✨ Modern, responsive design with beautiful UI
- 📝 Decap CMS integration for non-technical content editing
- 🎨 Tailwind CSS styling
- ⚡ Fast Vite build system
- 🔐 GitHub OAuth authentication for CMS

## Run Locally

**Prerequisites:** Node.js 18+ and npm/pnpm

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Set up environment variables:
   Create a `.env.local` file in the root directory with:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open your browser to `http://localhost:3000`

## Decap CMS Setup

To enable content editing through Decap CMS:

1. **Create a GitHub OAuth App:**
   - Go to https://github.com/settings/developers
   - Click "New OAuth App"
   - Set Application name: "Soul Garden Sound CMS"
   - Set Homepage URL: `https://soul-garden-sound.vercel.app`
   - Set Authorization callback URL: `https://soul-garden-sound.vercel.app/api/callback`
   - Click "Register application"
   - Copy the Client ID and generate a Client Secret

2. **Set Environment Variables in Vercel:**
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add the following:
     - `OAUTH_CLIENT_ID` - Your GitHub OAuth Client ID
     - `OAUTH_CLIENT_SECRET` - Your GitHub OAuth Client Secret
     - `SITE_URL` - Your production URL (e.g., `https://soul-garden-sound.vercel.app`)

3. **Access the CMS:**
   - Navigate to `https://your-site.vercel.app/admin`
   - Click "Login with GitHub"
   - Authorize the application
   - Start editing content!

## Content Management

The CMS allows editing of:
- **Services** - Healing services offered
- **Events** - Upcoming workshops and events
- **Testimonials** - Client reviews and feedback

All content is stored as Markdown files in the `src/content/` directory and automatically synced with GitHub.

## Build for Production

```bash
npm run build
# or
pnpm build
```

The built files will be in the `dist/` directory, ready for deployment.

## Deployment

This project is configured for Vercel deployment. Simply push to your GitHub repository and Vercel will automatically deploy.

Make sure to set the environment variables in Vercel before deploying!
