import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Something went wrong.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>There was an error during the authentication process. Please try again.</p>
        </CardContent>
      </Card>
    </div>
  );
}
