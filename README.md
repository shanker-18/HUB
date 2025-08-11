# Shree Raga SWAAD GHAR

A React-based web application built with Vite, TypeScript, and Tailwind CSS.

## Features

- Modern React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Deployment

### Render

This project is configured for deployment on Render. The deployment uses:

- Node.js 20.18.0
- Build command: `npm ci && npm run build`
- Start command: `npm start` (serves static files from `dist` directory)

### Vercel (Alternative)

The project also includes a `vercel.json` configuration for Vercel deployment.

## Project Structure

```
src/
├── components/     # React components
├── App.tsx        # Main app component
├── main.tsx       # App entry point
└── index.css      # Global styles

public/            # Static assets
dist/              # Production build output
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
