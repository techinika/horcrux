import { createMemory } from "@/app/memories/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";
import MemoryCard from "@/components/memories/MemoryCard";
import VoiceRecorder from "@/components/memories/VoiceRecorder";
import MagicalBorder from "@/components/ui/MagicalBorder";
import { AnimatedWrapper } from "@/components/animations/AnimatedWrapper";

interface Memory {
  id: string;
  created_at: string;
  title: string | null;
  content: string | null;
  type: string;
  user_id: string;
  publicUrl?: string;
}

export default async function Home() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: memoriesData, error: memoriesError } = await supabase
    .from('memories')
    .select('*')
    .order('created_at', { ascending: false });

  const memories = memoriesData ? await Promise.all(memoriesData.map(async (memory) => {
    if (memory.type === 'voice' && memory.content) {
      const { data: { publicUrl } } = supabase.storage.from('voicememories').getPublicUrl(memory.content);
      return { ...memory, publicUrl };
    }
    return memory;
  })) : [];

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="relative w-full max-w-7xl mx-auto p-4 sm:p-8 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/20">
        <MagicalBorder className="absolute top-0 left-0 text-primary/30" />
        <MagicalBorder className="absolute top-0 right-0 transform rotate-90 text-primary/30" />
        <MagicalBorder className="absolute bottom-0 left-0 transform -rotate-90 text-primary/30" />
        <MagicalBorder className="absolute bottom-0 right-0 transform rotate-180 text-primary/30" />

        <header className="w-full flex justify-between items-center mb-8">
          <div>
              <h1 className="text-5xl font-bold font-serif text-primary">Horcrux</h1>
              <p className="text-muted-foreground">Welcome, {user.email}</p>
          </div>
          <LogoutButton />
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Create Memories */}
          <AnimatedWrapper delay={0.1} className="space-y-8">
            <Card>
              <form action={createMemory}>
                <CardHeader>
                  <CardTitle className="font-serif">Create a new memory</CardTitle>
                  <CardDescription>What&apos;s on your mind? Capture it before it fades.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Input name="title" placeholder="Title of your memory..." />
                    <Textarea name="content" placeholder="Describe your memory in detail..." />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Imprint Memory</Button>
                </CardFooter>
              </form>
            </Card>

            <VoiceRecorder />
          </AnimatedWrapper>

          {/* Right Column: Display Memories */}
          <AnimatedWrapper delay={0.2} className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-4 font-serif">Your Memories</h2>
              <div className="max-h-[70vh] overflow-y-auto space-y-4 p-2">
                {memoriesError && <p className="text-destructive">Error loading memories: {memoriesError.message}</p>}
                {memories && memories.length > 0 ? (
                  memories.map((memory: Memory, index: number) => (
                    <AnimatedWrapper key={memory.id} delay={index * 0.05}>
                      <MemoryCard memory={memory} />
                    </AnimatedWrapper>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">You have no memories yet. Create one above.</p>
                )}
              </div>
          </AnimatedWrapper>
        </main>
      </div>
    </div>
  );
}
