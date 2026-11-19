-- ============================================================================
-- TRUSTGRID.AI — ENTERPRISE AI CHAT APPLICATION SCHEMA, STORAGE & RLS POLICIES
-- Project: ndalgvpvpzwrqoikkpyb (WebMinning_DB_TG)
-- ============================================================================

-- 1. User Roles Table
CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Conversations Table
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New Chat',
  pinned BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversations_user_updated
  ON public.conversations(user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_conversations_user_pinned
  ON public.conversations(user_id, pinned)
  WHERE pinned = TRUE;

-- 3. Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_created
  ON public.messages(conversation_id, created_at ASC);

-- 4. Attachments Table (Screenshots & Images)
CREATE TABLE IF NOT EXISTS public.attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_name TEXT,
  file_size BIGINT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_attachments_conversation ON public.attachments(conversation_id);
CREATE INDEX IF NOT EXISTS idx_attachments_message ON public.attachments(message_id);

-- 5. Uploaded Files Table (PDF, DOCX, CSV, XLSX, TXT)
CREATE TABLE IF NOT EXISTS public.uploaded_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_uploaded_files_conversation ON public.uploaded_files(conversation_id);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_message ON public.uploaded_files(message_id);

-- 6. Voice Messages Table (Audio Notes)
CREATE TABLE IF NOT EXISTS public.voice_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  audio_url TEXT NOT NULL,
  duration NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_voice_messages_conversation ON public.voice_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_voice_messages_message ON public.voice_messages(message_id);

-- 7. Helper Function: is_admin()
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_messages ENABLE ROW LEVEL SECURITY;

-- 8A. RLS Policies for public.user_roles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_roles' AND policyname = 'user_roles_select_policy'
  ) THEN
    CREATE POLICY "user_roles_select_policy"
      ON public.user_roles FOR SELECT
      USING (user_id = auth.uid() OR public.is_admin());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_roles' AND policyname = 'user_roles_insert_policy'
  ) THEN
    CREATE POLICY "user_roles_insert_policy"
      ON public.user_roles FOR INSERT
      WITH CHECK (user_id = auth.uid() OR public.is_admin());
  END IF;
END $$;

-- 8B. RLS Policies for public.conversations
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'conversations' AND policyname = 'conversations_access_policy'
  ) THEN
    CREATE POLICY "conversations_access_policy"
      ON public.conversations FOR ALL
      USING (user_id IS NULL OR user_id = auth.uid() OR public.is_admin())
      WITH CHECK (user_id IS NULL OR user_id = auth.uid() OR public.is_admin());
  END IF;
END $$;

-- 8C. RLS Policies for public.messages
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'messages' AND policyname = 'messages_access_policy'
  ) THEN
    CREATE POLICY "messages_access_policy"
      ON public.messages FOR ALL
      USING (
        EXISTS (
          SELECT 1 FROM public.conversations c
          WHERE c.id = messages.conversation_id
            AND (c.user_id IS NULL OR c.user_id = auth.uid() OR public.is_admin())
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.conversations c
          WHERE c.id = messages.conversation_id
            AND (c.user_id IS NULL OR c.user_id = auth.uid() OR public.is_admin())
        )
      );
  END IF;
END $$;

-- 8D. RLS Policies for public.attachments
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'attachments' AND policyname = 'attachments_access_policy'
  ) THEN
    CREATE POLICY "attachments_access_policy"
      ON public.attachments FOR ALL
      USING (user_id IS NULL OR user_id = auth.uid() OR public.is_admin())
      WITH CHECK (user_id IS NULL OR user_id = auth.uid() OR public.is_admin());
  END IF;
END $$;

-- 8E. RLS Policies for public.uploaded_files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'uploaded_files' AND policyname = 'uploaded_files_access_policy'
  ) THEN
    CREATE POLICY "uploaded_files_access_policy"
      ON public.uploaded_files FOR ALL
      USING (user_id IS NULL OR user_id = auth.uid() OR public.is_admin())
      WITH CHECK (user_id IS NULL OR user_id = auth.uid() OR public.is_admin());
  END IF;
END $$;

-- 8F. RLS Policies for public.voice_messages
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'voice_messages' AND policyname = 'voice_messages_access_policy'
  ) THEN
    CREATE POLICY "voice_messages_access_policy"
      ON public.voice_messages FOR ALL
      USING (user_id IS NULL OR user_id = auth.uid() OR public.is_admin())
      WITH CHECK (user_id IS NULL OR user_id = auth.uid() OR public.is_admin());
  END IF;
END $$;

-- 9. Supabase Storage Buckets & Policies (chat-attachments, chat-files, chat-voice)
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('chat-attachments', 'chat-attachments', true),
  ('chat-files', 'chat-files', true),
  ('chat-voice', 'chat-voice', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public read chat buckets'
  ) THEN
    CREATE POLICY "Public read chat buckets"
      ON storage.objects FOR SELECT
      USING (bucket_id IN ('chat-attachments', 'chat-files', 'chat-voice'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authorized upload chat buckets'
  ) THEN
    CREATE POLICY "Authorized upload chat buckets"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id IN ('chat-attachments', 'chat-files', 'chat-voice'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authorized update chat buckets'
  ) THEN
    CREATE POLICY "Authorized update chat buckets"
      ON storage.objects FOR UPDATE
      USING (bucket_id IN ('chat-attachments', 'chat-files', 'chat-voice'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authorized delete chat buckets'
  ) THEN
    CREATE POLICY "Authorized delete chat buckets"
      ON storage.objects FOR DELETE
      USING (bucket_id IN ('chat-attachments', 'chat-files', 'chat-voice'));
  END IF;
END $$;
