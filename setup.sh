#!/bin/bash

# Create new Next.js project with App Router and Typescript
npx create-next-app@latest solvers \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

# Navigate into project directory
cd solvers

# Install required dependencies
npm install lucide-react @radix-ui/react-progress @radix-ui/react-alert-dialog @radix-ui/react-slot class-variance-authority clsx tailwind-merge tailwindcss-animate

# Create necessary directories
mkdir -p src/app/components/ui
mkdir -p src/lib

# Copy configuration files
# Note: You'll need to manually copy the content from the previous artifact
# into these files after creation
touch components.json
touch src/lib/utils.ts
touch tailwind.config.ts

# Now we can add individual components
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add progress

# Add static export configuration to next.config.js
echo 'const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;' > next.config.js

# Update package.json scripts
jq '.scripts += {
  "predeploy": "npm run build",
  "deploy": "touch out/.nojekyll && gh-pages -d out"
}' package.json > temp.json && mv temp.json package.json

# Install gh-pages as a dev dependency
npm install --save-dev gh-pages

# Create GitHub Actions workflow directory
mkdir -p .github/workflows

# Create GitHub Actions deployment workflow
echo 'name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4' > .github/workflows/deploy.yml

# Create a .gitignore file
echo 'node_modules
.next
out
.env
.env.*' > .gitignore