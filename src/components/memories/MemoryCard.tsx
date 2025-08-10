'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { updateMemory, deleteMemory } from '@/app/memories/actions'

interface Memory {
  id: string;
  created_at: string;
  title: string | null;
  content: string | null;
  type: string;
  user_id: string;
}

export default function MemoryCard({ memory }: { memory: Memory }) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = async (formData: FormData) => {
    await updateMemory(formData);
    setIsEditing(false);
  }

  return (
    <Card>
      {isEditing ? (
        <form action={handleUpdate}>
          <input type="hidden" name="id" value={memory.id} />
          <CardHeader>
            <Input name="title" defaultValue={memory.title ?? ''} className="text-2xl font-bold" />
          </CardHeader>
          <CardContent>
            <Textarea name="content" defaultValue={memory.content ?? ''} rows={5} />
          </CardContent>
          <CardFooter className="gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </CardFooter>
        </form>
      ) : (
        <>
          <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="font-serif">{memory.title}</CardTitle>
                    <CardDescription>{new Date(memory.created_at).toLocaleString()}</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                    <form action={deleteMemory}>
                        <input type="hidden" name="id" value={memory.id} />
                        <Button type="submit" variant="destructive" size="sm">Delete</Button>
                    </form>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{memory.content}</p>
          </CardContent>
        </>
      )}
    </Card>
  )
}
