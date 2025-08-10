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

// Define the type for a memory
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
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12">
      <header className="w-full max-w-2xl px-4 flex justify-between items-center mb-8">
        <div>
            <h1 className="text-5xl font-bold font-serif">Horcrux</h1>
            <p className="text-muted-foreground">Welcome, {user.email}</p>
        </div>
        <LogoutButton />
      </header>

      <main className="w-full max-w-2xl px-4">
        <Card className="mb-8">
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

        <div className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-center mb-4 font-serif">Your Memories</h2>
            {memoriesError && <p className="text-destructive">Error loading memories: {memoriesError.message}</p>}
            {memories && memories.length > 0 ? (
              memories.map((memory: Memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))
            ) : (
              <p className="text-center text-muted-foreground">You have no memories yet. Create one above.</p>
            )}
        </div>
      </main>
    </div>
  );
}
