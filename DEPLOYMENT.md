# Deploying Menu Magic Feedback Loop to Vercel

This guide will walk you through the process of deploying the Menu Magic Feedback Loop application to Vercel.

## Prerequisites

1. A [GitHub](https://github.com) account
2. A [Vercel](https://vercel.com) account (you can sign up with your GitHub account)
3. The Menu Magic Feedback Loop codebase

## Step 1: Prepare Your Repository

1. Create a new GitHub repository (if you haven't already)
2. Push your Menu Magic Feedback Loop codebase to the repository:

```bash
# Navigate to your project directory
cd menu-magic-feedback-loop

# Initialize a git repository (if not already done)
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit"

# Add your GitHub repository as the remote
git remote add origin https://github.com/Amlan2006/menu-magic-feedback-loop.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option 1: Deploy via the Vercel Dashboard (Recommended)

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on "Add New..." > "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build` (should be auto-detected)
   - Output Directory: `dist` (should be auto-detected)
   - Root Directory: `./` (should be auto-detected)
5. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Log in to your Vercel account:
```bash
vercel login
```

3. Deploy the project:
```bash
# Navigate to your project directory
cd menu-magic-feedback-loop

# Deploy to Vercel
vercel
```

4. Follow the interactive prompts to configure your deployment

## Step 3: Configure Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click on "Settings" > "Domains"
3. Add your custom domain
4. Follow the instructions to configure DNS settings

## Step 4: Set Up Environment Variables (If Needed)

1. In your Vercel dashboard, go to your project
2. Click on "Settings" > "Environment Variables"
3. Add any required environment variables:
   - Format: `KEY=VALUE`
   - For example: `VITE_API_URL=https://api.example.com`

## Step 5: Configure Deployment Settings

1. In your Vercel dashboard, go to your project
2. Click on "Settings" > "Git"
3. Configure Production Branch:
   - Set your main branch as the production branch
4. Configure Build & Development Settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Continuous Deployment

Vercel automatically deploys your application when you push changes to your repository. Each push triggers a new build and deployment.

### Preview Deployments

When you create a pull request in your GitHub repository, Vercel automatically creates a preview deployment, allowing you to test changes before merging to your main branch.

## Vercel-Specific Configurations

The project includes a `vercel.json` file that configures:
- Proper routing for the SPA application
- Cache headers for better performance
- GitHub integration settings

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs in the Vercel dashboard
2. Ensure your application builds locally: `npm run build`
3. Verify that the `vercel.json` configuration is correct
4. Check that all required environment variables are set

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [React Router with Vercel](https://vercel.com/guides/using-react-router-with-vercel) 