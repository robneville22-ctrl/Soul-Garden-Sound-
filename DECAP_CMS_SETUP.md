# Decap CMS Setup Checklist

## ✅ Step 1: GitHub OAuth App (COMPLETED)
- [x] Application name: "Soul Garden Sound CMS"
- [x] Homepage URL: `https://soul-garden-sound.vercel.app`
- [x] Authorization callback URL: `https://soul-garden-sound.vercel.app/api/callback`
- [x] Client Secret generated

## 📋 Step 2: Get Your Credentials
- [ ] Copy **Client ID** from GitHub OAuth App page
  - Location: Top of the app settings page
  - Format: Usually a long alphanumeric string
  
- [ ] Copy **Client Secret** 
  - Location: "Client secrets" section
  - ⚠️ **Important**: Copy this immediately - you can only see it once!
  - If you missed it, click "Generate a new client secret"

## 🔐 Step 3: Set Environment Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Select your project: **Soul Garden Sound** (or similar)
3. Navigate to: **Settings** → **Environment Variables**
4. Add these three variables:

### Variable 1: OAUTH_CLIENT_ID
- **Name**: `OAUTH_CLIENT_ID`
- **Value**: [Paste your Client ID here]
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

### Variable 2: OAUTH_CLIENT_SECRET
- **Name**: `OAUTH_CLIENT_SECRET`
- **Value**: [Paste your Client Secret here]
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

### Variable 3: SITE_URL
- **Name**: `SITE_URL`
- **Value**: `https://soul-garden-sound.vercel.app`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

5. Click **Save** after adding each variable

## 🚀 Step 4: Redeploy (if needed)
- After adding environment variables, Vercel may auto-redeploy
- If not, go to **Deployments** tab and click **Redeploy** on the latest deployment
- Wait for deployment to complete (usually 1-2 minutes)

## ✅ Step 5: Test the CMS

1. Navigate to: `https://soul-garden-sound.vercel.app/admin`
2. You should see the Decap CMS login page
3. Click **"Login with GitHub"**
4. Authorize the application
5. You should now see the CMS dashboard with:
   - **Services** collection
   - **Events** collection
   - **Testimonials** collection

## 🎉 Step 6: Start Editing!

Once logged in, you can:
- Click on any collection (Services, Events, Testimonials)
- View existing content
- Click **"New [Collection Name]"** to create new content
- Edit existing content by clicking on any item
- Changes are saved directly to your GitHub repository
- Vercel will automatically redeploy when you save changes

## 🔍 Troubleshooting

### "OAuth configuration error" message
- ✅ Check that all three environment variables are set in Vercel
- ✅ Make sure you've redeployed after adding variables
- ✅ Verify the Client ID and Secret are correct (no extra spaces)

### "Authorization Failed" message
- ✅ Verify the callback URL in GitHub matches: `https://soul-garden-sound.vercel.app/api/callback`
- ✅ Check that the Client Secret hasn't expired (generate a new one if needed)

### Can't see the CMS at /admin
- ✅ Make sure the site is deployed to Vercel
- ✅ Check that `public/admin/index.html` exists
- ✅ Verify `public/admin/config.yml` is correct

### Changes not appearing on the website
- ✅ Wait 1-2 minutes for Vercel to rebuild after saving
- ✅ Check the Vercel deployment logs for any errors
- ✅ Verify the content files are being saved to `src/content/` in GitHub

## 📝 Quick Reference

**GitHub OAuth App Settings:**
- URL: https://github.com/settings/developers
- Your App ID: 3314863 (from the URL)

**Vercel Environment Variables:**
- Dashboard: https://vercel.com/dashboard
- Settings → Environment Variables

**CMS Access:**
- URL: `https://soul-garden-sound.vercel.app/admin`

**Repository:**
- GitHub: `robneville22-ctrl/Soul-Garden-Sound-`
- Branch: `main`

