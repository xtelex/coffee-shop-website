# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project name: `coffee-3d`
   - Database password: (save this!)
   - Region: Choose closest to you
5. Wait for project to be created (~2 minutes)

## 2. Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## 3. Set Up Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste it into the SQL editor
5. Click "Run" or press Ctrl+Enter
6. You should see "Success. No rows returned"

This creates:
- `coffees` table with sample data
- `favorites` table for user favorites
- Row Level Security policies
- Indexes for performance

## 4. Configure Environment Variables

### Server (.env)
Create `server/.env`:
```env
PORT=5000
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here
NODE_ENV=development
```

### Client (.env)
Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Install Dependencies

```bash
npm install --workspace=server
npm install --workspace=client
```

## 6. Start Development

```bash
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 7. Verify Setup

1. Open http://localhost:5173
2. You should see the 3D coffee hero section
3. Scroll down to see coffee cards (from Supabase)
4. Try registering a new user
5. Add coffees to favorites

## Database Structure

### coffees table
- `id` (UUID, primary key)
- `name` (text)
- `description` (text)
- `origin` (text)
- `roast_level` (text: Light, Medium, Medium-Dark, Dark)
- `flavor_notes` (text array)
- `price` (decimal)
- `model_url` (text, optional)
- `image_url` (text, optional)
- `rating` (decimal, 0-5)
- `created_at`, `updated_at` (timestamps)

### favorites table
- `id` (UUID, primary key)
- `user_id` (UUID, references auth.users)
- `coffee_id` (UUID, references coffees)
- `created_at` (timestamp)

## Authentication

Supabase handles authentication automatically:
- Email/password signup
- JWT tokens
- Session management
- Row Level Security

## Troubleshooting

**Can't connect to Supabase?**
- Check your API keys in .env files
- Make sure SUPABASE_URL doesn't have trailing slash
- Verify project is not paused (free tier pauses after inactivity)

**No coffees showing?**
- Run the SQL schema again
- Check Supabase Table Editor to verify data exists
- Check browser console for errors

**Authentication not working?**
- Verify you're using the correct anon key (not service key) in client
- Check Supabase Auth settings are enabled
- Look at Network tab for 401 errors
