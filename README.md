# DonorBD - Donation Platform for Bangladesh

A modern, responsive donation platform connecting donors with verified causes across Bangladesh.

## Features

- 🌐 **Bilingual Support** - English and Bangla (বাংলা)
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Fully Responsive** - Works on all devices
- 💝 **Donation Management** - Easy donation process with cart system
- 🎯 **Campaign Tracking** - Real-time progress tracking
- 📊 **Dashboard** - User and admin dashboards
- 🔒 **Secure** - Protected routes and authentication ready

## Tech Stack

- **React 18** - UI Library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   vercel
   ```

4. **Environment Variables** (if needed):
   - Add any required environment variables in Vercel dashboard
   - Settings → Environment Variables

### Build Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

The `vercel.json` file is already configured for SPA routing.

## Project Structure

```
donorbd/
├── src/
│   ├── components/     # Reusable components
│   ├── context/        # React contexts
│   ├── data/           # Mock data and translations
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/             # Static assets
├── index.html          # HTML template
└── vercel.json         # Vercel configuration
```

## Contact

- **Email**: mdrakibhossencse@gmail.com
- **Phone**: 01300981501

## License

Private project - All rights reserved.
