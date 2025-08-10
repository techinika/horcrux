'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createMemory(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || !content) {
    return;
  }

  await supabase.from('memories').insert({
    user_id: user.id,
    title,
    content,
    type: 'text',
  })

  revalidatePath('/')
}

export async function deleteMemory(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    return;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  await supabase
    .from('memories')
    .delete()
    .match({ id: id, user_id: user.id });

  revalidatePath('/');
}

export async function updateMemory(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!id || !title || !content) {
    return;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  await supabase
    .from('memories')
    .update({ title, content })
    .match({ id: id, user_id: user.id });

  revalidatePath('/');
}
