# Deployment Guide

Since this porfolio is built with **Next.js**, the best and easiest place to host it is **[Vercel](https://vercel.com/)** (the creators of Next.js). It's free for personal projects, fast, and requires zero configuration.

## Prerequisites

1.  **GitHub Account**: Ensure your project is pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com/signup) using your GitHub account.

## Step-by-Step Instructions

### 1. Push Code to GitHub

Since you are updating an existing repository:

1.  Open your terminal in the project folder.
2.  Stage your changes:
    ```bash
    git add .
    ```
3.  Commit the update:
    ```bash
    git commit -m "Migrate to Next.js portfolio"
    ```
4.  Push to your main branch:
    ```bash
    git push origin main
    ```

### 2. Deploy on Vercel

1.  **Log in** to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your repository `sammy200-ui/my_portfolio`.
    *   *Note: If Vercel is already connected to this repo for the old site, just go to that project settings. Otherwise, import it as a new project.*
4.  **Framework Preset**: It should verify `Next.js` and the root directory automatically.
    *   *Tip: Vercel will ignore the `old_portfolio` folder automatically as it looks for `package.json` and `next.config.mjs`.*
5.  Click **"Deploy"**.

### 3. Live!

*   Vercel will build your project (this takes about a minute).
*   Once done, you will see a **"Congratulations!"** screen.
*   Click the **preview image** or the **Visit** button to see your live site!
*   Vercel will assign a customizable domain like `my-portfolio-seven.vercel.app`.

### 4. (Optional) Custom Domain

If you have a custom domain (e.g., `sameerpawar.com`):

1.  Go to your Project Dashboard on Vercel.
2.  Click **Settings** > **Domains**.
3.  Enter your domain name and follow the instructions to update your DNS records (usually adding an A record or CNAME).
