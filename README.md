# Horcrux - Your Magical Memory Keeper

Horcrux is a web application that serves as a personalized, AI-powered memory keeper and note-taker. The app is designed to capture a user's thoughts, feelings, and events, and use this data to create an interactive, narrative-driven experience. The core concept is to create a digital "soul" of the user that can be accessed and explored in a magical, story-like format.

## ✨ Features

- **User Authentication:** Secure sign-up and login functionality powered by Supabase Auth.
- **Text-Based Memory Capture:** Users can create, read, update, and delete text-based memories.
- **Magical Aesthetics:** The UI is designed to feel like a dark, enchanted magical object, with a custom color palette (deep emerald green, dark maroon, and gold accents) and elegant typography.
- **(Planned) Voice & Video Capture:** Future updates will allow users to capture memories using voice recordings and short videos.
- **(Planned) AI-Powered Insights:** An AI will process entries to identify patterns and connect related events.
- **(Planned) Narrative-Driven Experience:** The AI will generate "Memory Stories" in a video format, narrated by a user-chosen avatar.
- **(Planned) Keeper Access:** Users will be able to grant access to a trusted person (a "Keeper") to explore their memories.

## 🛠️ Technology Stack

- **Frontend:** [Next.js](https://nextjs.org/) (with App Router)
- **Backend & Database:** [Supabase](https://supabase.io/) (for user authentication, database, and storage)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

You will need to create a `.env.local` file in the root of the project and add your Supabase project URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

You will also need to run the necessary SQL script to set up the `memories` table in your Supabase database. You can find the script in the project history or by asking the development team.

```bash
-- Create the memories table
CREATE TABLE public.memories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT,
  content TEXT,
  type TEXT NOT NULL CHECK (type IN ('text', 'voice', 'video'))
);

-- Enable Row Level Security for the memories table
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to see their own memories
CREATE POLICY "Users can view their own memories"
ON public.memories FOR SELECT
USING (auth.uid() = user_id);

-- Create a policy that allows users to insert their own memories
CREATE POLICY "Users can insert their own memories"
ON public.memories FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create a policy that allows users to update their own memories
CREATE POLICY "Users can update their own memories"
ON public.memories FOR UPDATE
USING (auth.uid() = user_id);

-- Create a policy that allows users to delete their own memories
CREATE POLICY "Users can delete their own memories"
ON public.memories FOR DELETE
USING (auth.uid() = user_id);
```
