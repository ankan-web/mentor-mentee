# Deployment Guide

## Problem
The Vercel frontend is calling the Render backend which has issues with the UMS scraper timing out.

## Solution

### Option 1: Deploy Fixed Backend to Render (Recommended)

1. **Push your code to GitHub** (including the backend folder)

2. **Deploy Backend to Render:**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Configure:
     - **Name:** mentor-mentee-backend
     - **Root Directory:** backend
     - **Build Command:** npm install
     - **Start Command:** npm start
   - Add Environment Variables:
     - `MONGO_URI` = your MongoDB connection string
     - `JWT_SECRET` = your JWT secret key
     - `NODE_ENV` = production
   - Click "Create Web Service"

3. **Update Vercel Environment Variable:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-render-backend-url.onrender.com/api`
   - Redeploy the Vercel project

### Option 2: Use Local Backend with ngrok (For Testing)

1. **Install ngrok:**
   ```bash
   npm install -g ngrok
   ```

2. **Start your local backend:**
   ```bash
   cd backend
   npm start
   ```

3. **Expose localhost:**
   ```bash
   ngrok http 5000
   ```

4. **Copy the ngrok URL** (e.g., `https://abc123.ngrok.io`)

5. **Update Vercel:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://abc123.ngrok.io/api`
   - Redeploy

### Option 3: Use Mock Login (Quick Fix)

If UMS website is down, use these test credentials:
- **Registration No:** `test` or `AU/2022/TEST`
- **Password:** anything

This bypasses the UMS scraper and creates a test user.

## Current Setup

- **Local Development:** http://localhost:5173 → http://localhost:5000/api
- **Production (Vercel):** https://mentor-mentee.vercel.app → https://mentor-mentee-yemf.onrender.com/api

## Files Changed

1. `/src/services/api.js` - Added VITE_API_URL environment variable support
2. `/backend/controllers/userController.js` - Added mock login for testing
3. `/backend/utils/umsScraper.js` - Improved error handling and timeouts
