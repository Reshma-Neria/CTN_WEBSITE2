# CTN Frontend (code)

Setup

1. Copy `.env.example` to `.env` and set values:

```
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_MAPS_KEY=YOUR_KEY
```

2. Install and run:

```bash
cd code
npm install
npm run dev
```

Notes

- The Google Maps script is loaded dynamically using `VITE_GOOGLE_MAPS_KEY`.
- The frontend expects the backend at `VITE_API_URL` and calls `/api/base-stations` and `/api/coverage`.
- Ensure the backend is running (see `backend/README.md`).
# CTN Website - Connecting Malawi with Unlimited BroadBand

This is the redesigned CTN (Converged Technology Networks) website with all the latest information from https://www.ctn.mw/

Built with HTML, CSS, JavaScript, and React for interactive components.

## Getting Started

### Step 1: Install Dependencies

First, navigate to the project directory and install all required packages:

```bash
cd Ctnwebsitedesignprompt-main
npm install
```

### Step 2: Start the Development Server

Once dependencies are installed, start the development server:

```bash
npm run dev
```

### Step 3: Access the Website

After running `npm run dev`, the website will automatically open in your browser at:

**http://localhost:5173**

If it doesn't open automatically, you can manually navigate to that URL in your web browser.

## Available Pages

- **Home** - `/` - Main landing page with hero section and features
- **About** - `/about` - Information about CTN
- **Packages** - `/packages` - Tiyeni Broadband Plans and VPS packages
- **Business** - `/business` - Business solutions
- **Contact** - `/contact` - Contact information and form

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `build` directory.

## Project Structure

- `src/components/` - React components
- `src/components/pages/` - Page components
- `src/assets/` - Images and static assets
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration