# Render Deployment Guide

## Problem
Puppeteer needs Chrome installed, but Render doesn't have it by default.

## Solution

### Option 1: Install Chrome During Build (Recommended)

The `package.json` now includes a `postinstall` script that installs Chrome automatically:

```json
"postinstall": "npx puppeteer browsers install chrome || echo 'Chrome install skipped'"
```

**Deploy to Render:**

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Add Chrome installation for puppeteer"
   git push
   ```

2. **Create Web Service on Render:**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Configure:
     - **Name:** mentor-mentee-backend
     - **Root Directory:** backend
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Node Version:** 18 (or higher)

3. **Add Environment Variables:**
   - `MONGO_URI` = your MongoDB connection string
   - `JWT_SECRET` = your JWT secret key
   - `NODE_ENV` = production

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete (it will install Chrome during npm install)

### Option 2: Disable UMS Scraper (Quick Fix)

If Chrome installation fails or you don't need real UMS integration:

1. **Add environment variable on Render:**
   - `DISABLE_UMS_SCRAPER` = `true`

2. **Users can only log in with:**
   - Registration No: `test` or `AU/2022/TEST`
   - Password: anything

3. **Or create users manually in MongoDB**

### Option 3: Use Docker on Render (Advanced)

Create a `Dockerfile` in backend folder:

```dockerfile
FROM node:18-slim

# Install Chrome dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

CMD ["npm", "start"]
```

## Testing After Deploy

1. **Test mock login:**
   ```bash
   curl -X POST https://your-render-url.onrender.com/api/users/login-ums \
     -H "Content-Type: application/json" \
     -d '{"registration_no":"test","password":"test"}'
   ```

2. **Test real UMS login** (if Chrome is installed):
   ```bash
   curl -X POST https://your-render-url.onrender.com/api/users/login-ums \
     -H "Content-Type: application/json" \
     -d '{"registration_no":"AU/2020/XXXX","password":"your_password"}'
   ```

## Troubleshooting

### Chrome not found error
- Check Render build logs for Chrome installation errors
- Try Option 2 (disable UMS scraper) as fallback
- Use Docker deployment (Option 3) for full control

### UMS website timeouts
- UMS website may be slow or down
- Try again later
- Use mock login for testing

### Memory issues on Render (free tier)
- Puppeteer + Chrome needs ~512MB RAM minimum
- Upgrade to Render's Starter plan ($7/month) if needed
- Or use Option 2 to disable scraper
