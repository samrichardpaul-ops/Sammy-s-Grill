# Sammy's Grill 🥩🔥

Welcome to the official repository for **Sammy's Grill**! This is a modern, responsive web application built with Next.js, featuring a beautiful UI, smooth Framer Motion animations, and a secure Supabase backend for handling reservations and contact messages.

## Features
- **Gorgeous UI/UX:** Built with Tailwind CSS and Framer Motion for premium aesthetics.
- **Menu Display:** Fully interactive menu showcasing starters, mains, desserts, and drinks (priced in Rs.).
- **Table Reservations:** A seamless reservation booking system connected to a PostgreSQL database.
- **Contact Form:** Real-time messaging direct to the business.

## Tech Stack
- **Frontend:** Next.js 14, React, Tailwind CSS, Framer Motion, Lucide React
- **Backend/Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## Local Development

First, make sure you have your `.env.local` configured with your Supabase keys:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Recent Updates
- **Currency Update:** Switched all menu pricing from Dollars ($) to Rupees (Rs.) to correctly reflect local pricing.
- **RLS Fix:** Fixed database security policies and configured the Service Role Key for reliable backend insertions.
