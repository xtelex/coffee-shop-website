# 3D Coffee Experience

A Netflix-style coffee browsing experience with interactive 3D models built with React Three Fiber.

## Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **framer-motion** - UI animations
- **framer-motion-3d** - 3D animations

### Backend
- **Node.js/Express** - API server
- **Supabase** - Database & Authentication
- **PostgreSQL** - Database (via Supabase)

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── scenes/      # 3D scenes
│   │   ├── hooks/       # Custom hooks
│   │   └── utils/       # Utilities
│   └── public/
│       └── models/      # 3D model files
│
└── server/          # Express backend
    ├── models/      # MongoDB models
    ├── routes/      # API routes
    └── controllers/ # Route controllers
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Supabase account (free tier works great)

### Installation

1. **Set up Supabase** (see [SETUP.md](SETUP.md) for detailed instructions):
   - Create a Supabase project
   - Run the SQL schema from `supabase-schema.sql`
   - Get your API keys

2. **Install dependencies:**
```bash
npm run install:all
```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` in both `client/` and `server/` directories
   - Add your Supabase credentials

4. **Start development:**
```bash
npm run dev
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:5000

See [SETUP.md](SETUP.md) for complete setup instructions.

## Development

- `npm run dev` - Start both client and server
- `npm run dev:client` - Start only frontend
- `npm run dev:server` - Start only backend

## Features

- 🎨 Netflix-style UI layout
- 🎭 Interactive 3D coffee models
- ⚡ Smooth animations with Framer Motion
- 💾 User accounts and favorites
- 📱 Responsive design
