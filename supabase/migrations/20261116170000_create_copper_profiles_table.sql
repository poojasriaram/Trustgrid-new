-- ============================================================================
-- TRUSTGRID.AI — COPPER PROFILES DATABASE SCHEMA & SAFE BATCH UPSERT ENGINE
-- Architecture: COPPER -> SILVER -> GOLD -> DIAMOND (Phase: COPPER ONLY)
-- Project: ndalgvpvpzwrqoikkpyb (WebMinning_DB_TG)
-- ============================================================================

-- 1. Create copper_profiles table safely if it does not already exist
CREATE TABLE IF NOT EXISTS public.copper_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  designation TEXT,
  industry TEXT,
  location TEXT,
  linkedin_url TEXT,
  website TEXT,
  business_email TEXT,
  phone TEXT,
  source_url TEXT,
  source_file TEXT,
  source_sheet TEXT,
  capture_date TIMESTAMPTZ,
  data_status TEXT DEFAULT 'COPPER',
  validation_status TEXT DEFAULT 'PENDING',
  duplicate_status TEXT DEFAULT 'PENDING',
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- Phase 8: Future Architecture Preparation (SILVER -> GOLD -> DIAMOND lineage)
  qualification_status TEXT DEFAULT 'PENDING',
  rejection_reason TEXT,
  processing_history JSONB DEFAULT '[]'::jsonb,
  processing_timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure Phase 8 columns exist if table was created previously
ALTER TABLE public.copper_profiles ADD COLUMN IF NOT EXISTS qualification_status TEXT DEFAULT 'PENDING';
ALTER TABLE public.copper_profiles ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
ALTER TABLE public.copper_profiles ADD COLUMN IF NOT EXISTS processing_history JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.copper_profiles ADD COLUMN IF NOT EXISTS processing_timestamp TIMESTAMPTZ DEFAULT NOW();

-- 2. Required Indexes (Phase 2)
CREATE INDEX IF NOT EXISTS idx_copper_profiles_profile_id ON public.copper_profiles(profile_id);
CREATE INDEX IF NOT EXISTS idx_copper_profiles_linkedin_url ON public.copper_profiles(linkedin_url);
CREATE INDEX IF NOT EXISTS idx_copper_profiles_business_email ON public.copper_profiles(business_email);
CREATE INDEX IF NOT EXISTS idx_copper_profiles_company_name ON public.copper_profiles(company_name);
CREATE INDEX IF NOT EXISTS idx_copper_profiles_source_sheet ON public.copper_profiles(source_sheet);
CREATE INDEX IF NOT EXISTS idx_copper_profiles_data_status ON public.copper_profiles(data_status);

-- 3. Enable Row Level Security & Policies
ALTER TABLE public.copper_profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'copper_profiles' AND policyname = 'Allow read copper_profiles'
  ) THEN
    CREATE POLICY "Allow read copper_profiles" ON public.copper_profiles FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'copper_profiles' AND policyname = 'Allow insert copper_profiles'
  ) THEN
    CREATE POLICY "Allow insert copper_profiles" ON public.copper_profiles FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'copper_profiles' AND policyname = 'Allow update copper_profiles'
  ) THEN
    CREATE POLICY "Allow update copper_profiles" ON public.copper_profiles FOR UPDATE USING (true) WITH CHECK (true);
  END IF;
END $$;

-- 4. Safe Set-Based Batch Upsert Function (Preserves populated fields, never overwrites with NULL, tracks inserts vs updates)
CREATE OR REPLACE FUNCTION public.upsert_copper_profiles_batch(p_records JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
SET statement_timeout = '60s'
AS $$
DECLARE
  v_rec JSONB;
  v_profile_id TEXT;
  v_capture_date TIMESTAMPTZ;
  v_is_insert BOOLEAN;
  v_inserted INT := 0;
  v_updated INT := 0;
  v_failed INT := 0;
  v_errors JSONB := '[]'::jsonb;
  v_idx INT := 0;
BEGIN
  IF p_records IS NULL OR jsonb_typeof(p_records) <> 'array' THEN
    RETURN jsonb_build_object(
      'inserted', 0,
      'updated', 0,
      'failed', 0,
      'errors', jsonb_build_array(jsonb_build_object('error', 'Input payload must be a JSONB array'))
    );
  END IF;

  -- Fast Path: Set-based bulk INSERT ... ON CONFLICT DO UPDATE for the 500-row batch
  BEGIN
    WITH raw_items AS (
      SELECT
        ordinality AS idx,
        elem AS rec,
        NULLIF(BTRIM(elem->>'profile_id'), '') AS pid
      FROM jsonb_array_elements(p_records) WITH ORDINALITY AS t(elem, ordinality)
    ),
    deduped_items AS (
      SELECT DISTINCT ON (pid)
        idx,
        rec,
        pid
      FROM raw_items
      WHERE pid IS NOT NULL
      ORDER BY pid, idx DESC
    ),
    upserted AS (
      INSERT INTO public.copper_profiles (
        profile_id,
        full_name,
        company_name,
        designation,
        industry,
        location,
        linkedin_url,
        website,
        business_email,
        phone,
        source_url,
        source_file,
        source_sheet,
        capture_date,
        data_status,
        validation_status,
        duplicate_status,
        raw_data,
        qualification_status,
        rejection_reason,
        processing_history,
        processing_timestamp
      )
      SELECT
        d.pid,
        NULLIF(BTRIM(d.rec->>'full_name'), ''),
        NULLIF(BTRIM(d.rec->>'company_name'), ''),
        NULLIF(BTRIM(d.rec->>'designation'), ''),
        NULLIF(BTRIM(d.rec->>'industry'), ''),
        NULLIF(BTRIM(d.rec->>'location'), ''),
        NULLIF(BTRIM(d.rec->>'linkedin_url'), ''),
        NULLIF(BTRIM(d.rec->>'website'), ''),
        NULLIF(BTRIM(d.rec->>'business_email'), ''),
        NULLIF(BTRIM(d.rec->>'phone'), ''),
        NULLIF(BTRIM(d.rec->>'source_url'), ''),
        NULLIF(BTRIM(d.rec->>'source_file'), ''),
        NULLIF(BTRIM(d.rec->>'source_sheet'), ''),
        CASE
          WHEN NULLIF(BTRIM(d.rec->>'capture_date'), '') IS NOT NULL
          THEN (d.rec->>'capture_date')::timestamptz
          ELSE NULL
        END,
        COALESCE(NULLIF(BTRIM(d.rec->>'data_status'), ''), 'COPPER'),
        COALESCE(NULLIF(BTRIM(d.rec->>'validation_status'), ''), 'PENDING'),
        COALESCE(NULLIF(BTRIM(d.rec->>'duplicate_status'), ''), 'PENDING'),
        COALESCE(d.rec->'raw_data', '{}'::jsonb),
        COALESCE(NULLIF(BTRIM(d.rec->>'qualification_status'), ''), 'PENDING'),
        NULLIF(BTRIM(d.rec->>'rejection_reason'), ''),
        COALESCE(d.rec->'processing_history', jsonb_build_array(
          jsonb_build_object(
            'stage', 'COPPER',
            'action', 'INITIAL_IMPORT',
            'source_sheet', NULLIF(BTRIM(d.rec->>'source_sheet'), ''),
            'timestamp', NOW()
          )
        )),
        NOW()
      FROM deduped_items d
      ON CONFLICT (profile_id) DO UPDATE SET
        full_name = COALESCE(EXCLUDED.full_name, public.copper_profiles.full_name),
        company_name = COALESCE(EXCLUDED.company_name, public.copper_profiles.company_name),
        designation = COALESCE(EXCLUDED.designation, public.copper_profiles.designation),
        industry = COALESCE(EXCLUDED.industry, public.copper_profiles.industry),
        location = COALESCE(EXCLUDED.location, public.copper_profiles.location),
        linkedin_url = COALESCE(EXCLUDED.linkedin_url, public.copper_profiles.linkedin_url),
        website = COALESCE(EXCLUDED.website, public.copper_profiles.website),
        business_email = COALESCE(EXCLUDED.business_email, public.copper_profiles.business_email),
        phone = COALESCE(EXCLUDED.phone, public.copper_profiles.phone),
        source_url = COALESCE(EXCLUDED.source_url, public.copper_profiles.source_url),
        source_file = COALESCE(EXCLUDED.source_file, public.copper_profiles.source_file),
        source_sheet = COALESCE(public.copper_profiles.source_sheet, EXCLUDED.source_sheet),
        capture_date = COALESCE(EXCLUDED.capture_date, public.copper_profiles.capture_date),
        data_status = COALESCE(EXCLUDED.data_status, public.copper_profiles.data_status),
        validation_status = COALESCE(EXCLUDED.validation_status, public.copper_profiles.validation_status),
        duplicate_status = CASE
          WHEN public.copper_profiles.source_sheet IS DISTINCT FROM EXCLUDED.source_sheet THEN 'MERGED_CROSS_SHEET'
          ELSE COALESCE(EXCLUDED.duplicate_status, public.copper_profiles.duplicate_status)
        END,
        raw_data = COALESCE(public.copper_profiles.raw_data, '{}'::jsonb) || COALESCE(EXCLUDED.raw_data, '{}'::jsonb),
        qualification_status = COALESCE(EXCLUDED.qualification_status, public.copper_profiles.qualification_status),
        rejection_reason = COALESCE(EXCLUDED.rejection_reason, public.copper_profiles.rejection_reason),
        processing_timestamp = NOW()
      RETURNING (xmax = 0) AS is_insert
    )
    SELECT
      COUNT(*) FILTER (WHERE is_insert)::INT,
      COUNT(*) FILTER (WHERE NOT is_insert)::INT
    INTO v_inserted, v_updated
    FROM upserted;

    RETURN jsonb_build_object(
      'inserted', COALESCE(v_inserted, 0),
      'updated', COALESCE(v_updated, 0),
      'failed', 0,
      'errors', '[]'::jsonb
    );

  EXCEPTION WHEN OTHERS THEN
    -- Fallback Path: Row-by-row isolation if any record in the batch had a malformed timestamp or constraint violation
    v_inserted := 0;
    v_updated := 0;
    v_failed := 0;
    v_errors := '[]'::jsonb;
    v_idx := 0;

    FOR v_rec IN SELECT * FROM jsonb_array_elements(p_records)
    LOOP
      v_idx := v_idx + 1;
      BEGIN
        v_profile_id := NULLIF(BTRIM(v_rec->>'profile_id'), '');
        IF v_profile_id IS NULL THEN
          RAISE EXCEPTION 'Missing mandatory profile_id at batch index %', v_idx;
        END IF;

        BEGIN
          IF NULLIF(BTRIM(v_rec->>'capture_date'), '') IS NOT NULL THEN
            v_capture_date := (v_rec->>'capture_date')::timestamptz;
          ELSE
            v_capture_date := NULL;
          END IF;
        EXCEPTION WHEN OTHERS THEN
          v_capture_date := NULL;
        END;

        INSERT INTO public.copper_profiles (
          profile_id, full_name, company_name, designation, industry, location,
          linkedin_url, website, business_email, phone, source_url, source_file,
          source_sheet, capture_date, data_status, validation_status, duplicate_status,
          raw_data, qualification_status, rejection_reason, processing_history, processing_timestamp
        )
        VALUES (
          v_profile_id,
          NULLIF(BTRIM(v_rec->>'full_name'), ''),
          NULLIF(BTRIM(v_rec->>'company_name'), ''),
          NULLIF(BTRIM(v_rec->>'designation'), ''),
          NULLIF(BTRIM(v_rec->>'industry'), ''),
          NULLIF(BTRIM(v_rec->>'location'), ''),
          NULLIF(BTRIM(v_rec->>'linkedin_url'), ''),
          NULLIF(BTRIM(v_rec->>'website'), ''),
          NULLIF(BTRIM(v_rec->>'business_email'), ''),
          NULLIF(BTRIM(v_rec->>'phone'), ''),
          NULLIF(BTRIM(v_rec->>'source_url'), ''),
          NULLIF(BTRIM(v_rec->>'source_file'), ''),
          NULLIF(BTRIM(v_rec->>'source_sheet'), ''),
          v_capture_date,
          COALESCE(NULLIF(BTRIM(v_rec->>'data_status'), ''), 'COPPER'),
          COALESCE(NULLIF(BTRIM(v_rec->>'validation_status'), ''), 'PENDING'),
          COALESCE(NULLIF(BTRIM(v_rec->>'duplicate_status'), ''), 'PENDING'),
          COALESCE(v_rec->'raw_data', '{}'::jsonb),
          COALESCE(NULLIF(BTRIM(v_rec->>'qualification_status'), ''), 'PENDING'),
          NULLIF(BTRIM(v_rec->>'rejection_reason'), ''),
          COALESCE(v_rec->'processing_history', '[]'::jsonb),
          NOW()
        )
        ON CONFLICT (profile_id) DO UPDATE SET
          full_name = COALESCE(EXCLUDED.full_name, public.copper_profiles.full_name),
          company_name = COALESCE(EXCLUDED.company_name, public.copper_profiles.company_name),
          designation = COALESCE(EXCLUDED.designation, public.copper_profiles.designation),
          industry = COALESCE(EXCLUDED.industry, public.copper_profiles.industry),
          location = COALESCE(EXCLUDED.location, public.copper_profiles.location),
          linkedin_url = COALESCE(EXCLUDED.linkedin_url, public.copper_profiles.linkedin_url),
          website = COALESCE(EXCLUDED.website, public.copper_profiles.website),
          business_email = COALESCE(EXCLUDED.business_email, public.copper_profiles.business_email),
          phone = COALESCE(EXCLUDED.phone, public.copper_profiles.phone),
          source_url = COALESCE(EXCLUDED.source_url, public.copper_profiles.source_url),
          source_file = COALESCE(EXCLUDED.source_file, public.copper_profiles.source_file),
          source_sheet = COALESCE(public.copper_profiles.source_sheet, EXCLUDED.source_sheet),
          capture_date = COALESCE(EXCLUDED.capture_date, public.copper_profiles.capture_date),
          data_status = COALESCE(EXCLUDED.data_status, public.copper_profiles.data_status),
          validation_status = COALESCE(EXCLUDED.validation_status, public.copper_profiles.validation_status),
          duplicate_status = CASE
            WHEN public.copper_profiles.source_sheet IS DISTINCT FROM EXCLUDED.source_sheet THEN 'MERGED_CROSS_SHEET'
            ELSE COALESCE(EXCLUDED.duplicate_status, public.copper_profiles.duplicate_status)
          END,
          raw_data = COALESCE(public.copper_profiles.raw_data, '{}'::jsonb) || COALESCE(EXCLUDED.raw_data, '{}'::jsonb),
          qualification_status = COALESCE(EXCLUDED.qualification_status, public.copper_profiles.qualification_status),
          rejection_reason = COALESCE(EXCLUDED.rejection_reason, public.copper_profiles.rejection_reason),
          processing_timestamp = NOW()
        RETURNING (xmax = 0) INTO v_is_insert;

        IF v_is_insert THEN
          v_inserted := v_inserted + 1;
        ELSE
          v_updated := v_updated + 1;
        END IF;
      EXCEPTION WHEN OTHERS THEN
        v_failed := v_failed + 1;
        v_errors := v_errors || jsonb_build_array(
          jsonb_build_object(
            'batch_index', v_idx,
            'profile_id', COALESCE(v_rec->>'profile_id', 'UNKNOWN'),
            'company_name', COALESCE(v_rec->>'company_name', ''),
            'source_sheet', COALESCE(v_rec->>'source_sheet', ''),
            'reason', SQLERRM
          )
        );
      END;
    END LOOP;

    RETURN jsonb_build_object(
      'inserted', v_inserted,
      'updated', v_updated,
      'failed', v_failed,
      'errors', v_errors
    );
  END;
END;
$$;

GRANT EXECUTE ON FUNCTION public.upsert_copper_profiles_batch(JSONB) TO anon, authenticated, service_role;

-- 5. Database Verification & Summary Function (Phase 7)
CREATE OR REPLACE FUNCTION public.get_copper_validation_summary()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
SET statement_timeout = '60s'
AS $$
DECLARE
  v_total BIGINT;
  v_missing_linkedin BIGINT;
  v_missing_email BIGINT;
  v_missing_company BIGINT;
  v_missing_full_name BIGINT;
  v_missing_website BIGINT;
  v_missing_phone BIGINT;
  v_duplicate_profile_ids BIGINT;
  v_by_sheet JSONB;
  v_by_duplicate_status JSONB;
  v_by_validation_status JSONB;
BEGIN
  SELECT
    COUNT(*),
    COUNT(*) FILTER (WHERE linkedin_url IS NULL OR BTRIM(linkedin_url) = ''),
    COUNT(*) FILTER (WHERE business_email IS NULL OR BTRIM(business_email) = ''),
    COUNT(*) FILTER (WHERE company_name IS NULL OR BTRIM(company_name) = ''),
    COUNT(*) FILTER (WHERE full_name IS NULL OR BTRIM(full_name) = ''),
    COUNT(*) FILTER (WHERE website IS NULL OR BTRIM(website) = ''),
    COUNT(*) FILTER (WHERE phone IS NULL OR BTRIM(phone) = '')
  INTO
    v_total,
    v_missing_linkedin,
    v_missing_email,
    v_missing_company,
    v_missing_full_name,
    v_missing_website,
    v_missing_phone
  FROM public.copper_profiles;

  SELECT COUNT(*) INTO v_duplicate_profile_ids
  FROM (
    SELECT profile_id FROM public.copper_profiles GROUP BY profile_id HAVING COUNT(*) > 1
  ) dup;

  SELECT COALESCE(jsonb_object_agg(COALESCE(source_sheet, 'UNKNOWN'), cnt), '{}'::jsonb)
  INTO v_by_sheet
  FROM (
    SELECT source_sheet, COUNT(*) AS cnt FROM public.copper_profiles GROUP BY source_sheet ORDER BY cnt DESC
  ) s;

  SELECT COALESCE(jsonb_object_agg(COALESCE(duplicate_status, 'UNKNOWN'), cnt), '{}'::jsonb)
  INTO v_by_duplicate_status
  FROM (
    SELECT duplicate_status, COUNT(*) AS cnt FROM public.copper_profiles GROUP BY duplicate_status
  ) d;

  SELECT COALESCE(jsonb_object_agg(COALESCE(validation_status, 'UNKNOWN'), cnt), '{}'::jsonb)
  INTO v_by_validation_status
  FROM (
    SELECT validation_status, COUNT(*) AS cnt FROM public.copper_profiles GROUP BY validation_status
  ) v;

  RETURN jsonb_build_object(
    'total_records_in_supabase', v_total,
    'missing_linkedin_urls', v_missing_linkedin,
    'missing_business_emails', v_missing_email,
    'missing_company_names', v_missing_company,
    'missing_full_names', v_missing_full_name,
    'missing_websites', v_missing_website,
    'missing_phones', v_missing_phone,
    'duplicate_profile_ids', v_duplicate_profile_ids,
    'by_source_sheet', v_by_sheet,
    'by_duplicate_status', v_by_duplicate_status,
    'by_validation_status', v_by_validation_status,
    'verified_at', NOW()
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_copper_validation_summary() TO anon, authenticated, service_role;
