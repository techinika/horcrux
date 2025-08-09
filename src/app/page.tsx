import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12">
      <header className="mb-8">
        <h1 className="text-5xl font-bold font-serif">Horcrux</h1>
        <p className="text-center text-muted-foreground">Entrust your thoughts to the ether.</p>
      </header>

      <main className="w-full max-w-2xl px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create a new memory</CardTitle>
            <CardDescription>What's on your mind? Capture it before it fades.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <Input placeholder="Title of your memory..." />
              <Textarea placeholder="Describe your memory in detail..." />
            </form>
          </CardContent>
          <CardFooter>
            <Button>Imprint Memory</Button>
          </CardFooter>
        </Card>

        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4">Your Memories</h2>
            {/* Notes will be displayed here */}
            <Card>
                <CardHeader>
                    <CardTitle>My first memory</CardTitle>
                    <CardDescription>2024-01-01</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>This is a placeholder for a memory that has been stored.</p>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
