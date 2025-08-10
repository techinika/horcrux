'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/client'
import { createVoiceMemory } from '@/app/memories/actions'

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [audioURL, setAudioURL] = useState('')
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [title, setTitle] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSave = async () => {
    if (!audioBlob) return;

    setIsUploading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in.");
      setIsUploading(false);
      return;
    }

    const filePath = `${user.id}/${Date.now()}.webm`;

    const { error: uploadError } = await supabase.storage
      .from('voicememories')
      .upload(filePath, audioBlob);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      setIsUploading(false);
      return;
    }

    try {
      await createVoiceMemory(filePath, title);
      console.log('Voice memory saved successfully');
      setAudioURL('');
      setAudioBlob(null);
      setTitle('');
    } catch (saveError) {
      console.error('Error saving voice memory:', saveError);
      // In a real app, you might want to show a toast notification
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Record a new voice memory</CardTitle>
        <CardDescription>Capture your thoughts with the sound of your voice.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <p className="text-muted-foreground">
          Status: {isRecording ? 'Recording...' : 'Idle'}
        </p>
        <div className="flex gap-2">
          <Button onClick={startRecording} disabled={isRecording}>
            Start Recording
          </Button>
          <Button onClick={stopRecording} disabled={!isRecording} variant="destructive">
            Stop Recording
          </Button>
        </div>
        {audioURL && (
          <div className="w-full mt-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Optional: Title for your voice memory"
              className="mb-2"
            />
            <p className="mb-2">Preview:</p>
            <audio src={audioURL} controls className="w-full" />
            <Button onClick={handleSave} className="w-full mt-2" disabled={isUploading}>
              {isUploading ? 'Saving...' : 'Save Voice Memory'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
