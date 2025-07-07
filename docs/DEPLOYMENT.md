# Deployment

## Prerequisites
- Code in a Git repository
- Node.js 18.17 or later

## Deploy to Vercel
1. Go to vercel.com and sign in
2. Import your repository
3. Use default settings (Next.js detected automatically)
4. Click Deploy

## Deploy to Netlify
1. Go to netlify.com and sign in
2. Import your repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Click Deploy

## Deploy to Railway
1. Go to railway.app and sign in
2. Import your repository
3. Click Deploy

## Deploy to DigitalOcean
1. Go to DigitalOcean App Platform
2. Import your repository
3. Set build command: `npm run build`
4. Set run command: `npm start`
5. Click Deploy

## Build and Run Locally
```bash
npm install
npm run build
npm start
``` 