# Deployment Documentation

## Overview

This document provides step-by-step instructions for deploying the AI Chat Interface to various platforms. The application is built with Next.js 14+ and can be deployed to any platform that supports Node.js applications.

## Prerequisites

Before deploying, ensure you have:

1. **Git Repository**: Your code is pushed to a Git repository (GitHub, GitLab, Bitbucket)
2. **Node.js**: Version 18.17 or later
3. **Build Scripts**: Verify `package.json` has the correct build scripts

## Platform Options

### 1. Vercel (Recommended)

Vercel is the platform created by the Next.js team and provides the best experience for Next.js applications.

#### Automatic Deployment

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your Git provider
   - Click "New Project"
   - Import your repository

2. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

3. **Environment Variables** (if needed):
   - Add any environment variables in the Vercel dashboard
   - For this project, no environment variables are required

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts to configure your project
```

#### Custom Domain

1. Go to your project dashboard in Vercel
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### 2. Netlify

Netlify is another excellent option for deploying Next.js applications.

#### Automatic Deployment

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with your Git provider
   - Click "New site from Git"

2. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18 (or latest LTS)

3. **Deploy**:
   - Click "Deploy site"
   - Netlify will build and deploy your application

#### Manual Deployment

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.next
```

### 3. Railway

Railway is a modern platform for deploying applications.

#### Deployment Steps

1. **Connect Repository**:
   - Go to [railway.app](https://railway.app)
   - Sign up/login with your Git provider
   - Click "New Project" → "Deploy from GitHub repo"

2. **Configure**:
   - Select your repository
   - Railway will auto-detect Next.js
   - No additional configuration needed

3. **Deploy**:
   - Railway will automatically build and deploy

### 4. DigitalOcean App Platform

DigitalOcean provides a managed platform for deploying applications.

#### Deployment Steps

1. **Create App**:
   - Go to DigitalOcean App Platform
   - Click "Create App" → "Create App from Source Code"

2. **Connect Repository**:
   - Connect your Git repository
   - Select the branch to deploy

3. **Configure Build**:
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
   - **Environment**: Node.js

4. **Deploy**:
   - Click "Create Resources"
   - DigitalOcean will build and deploy

## Environment Configuration

### Development vs Production

The application automatically detects the environment:

- **Development**: `NODE_ENV=development`
- **Production**: `NODE_ENV=production`

### Environment Variables

Currently, no environment variables are required. If you add features that need them:

```bash
# Example environment variables
NEXT_PUBLIC_API_URL=https://your-api.com
DATABASE_URL=your-database-url
SECRET_KEY=your-secret-key
```

## Build Optimization

### Production Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Build Output

The build process creates:

- **`.next/`**: Optimized production build
- **`out/`**: Static export (if using `next export`)
- **`node_modules/`**: Production dependencies

## Performance Optimization

### 1. Image Optimization

Next.js automatically optimizes images. Use the `next/image` component:

```jsx
import Image from 'next/image'

<Image
  src="/your-image.jpg"
  alt="Description"
  width={500}
  height={300}
/>
```

### 2. Code Splitting

Next.js automatically splits code by:
- Pages (file-based routing)
- Dynamic imports
- Components

### 3. Caching

Configure caching headers in your deployment platform:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## Monitoring and Analytics

### 1. Vercel Analytics

If using Vercel, enable analytics:

```bash
npm install @vercel/analytics
```

```jsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Google Analytics

Add Google Analytics for tracking:

```jsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (18.17+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Runtime Errors**:
   - Check browser console for errors
   - Verify API endpoints are working
   - Check environment variables

3. **Performance Issues**:
   - Enable production mode
   - Check bundle size with `npm run build`
   - Optimize images and assets

### Debug Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Install dependencies
npm install

# Run linting
npm run lint

# Build project
npm run build

# Start production server
npm start
```

## Security Considerations

### 1. HTTPS

Ensure your deployment platform provides HTTPS:
- Vercel: Automatic HTTPS
- Netlify: Automatic HTTPS
- Railway: Automatic HTTPS

### 2. Environment Variables

Never commit sensitive data to your repository:
- Use environment variables for secrets
- Use `.env.local` for local development
- Use platform-specific environment variable management

### 3. Content Security Policy

Add CSP headers for security:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ]
  },
}
```

## Conclusion

The AI Chat Interface is designed to be easily deployable to any modern hosting platform. Vercel is recommended for the best Next.js experience, but other platforms work equally well. Follow the platform-specific instructions above for successful deployment. 