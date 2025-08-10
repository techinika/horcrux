import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <header className="mb-8">
        <h1 className="text-7xl font-bold font-serif text-primary">Horcrux</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Your thoughts, your memories, your soul. Preserved for eternity.
        </p>
      </header>

      <main className="mb-8">
        <p className="max-w-2xl mx-auto text-lg">
          Horcrux is a private sanctuary for your memories. Capture your daily thoughts, feelings, and experiences through text, voice, or video. Our AI will connect the threads of your life, allowing you to explore your own story in a way you never thought possible.
        </p>
      </main>

      <footer>
        <Link href="/login">
          <Button size="lg" className="text-lg">
            Begin Your Journey
          </Button>
        </Link>
      </footer>
    </div>
  )
}
