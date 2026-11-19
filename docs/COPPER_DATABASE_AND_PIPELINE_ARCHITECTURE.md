# TRUSTGRID.AI — Copper Profiles Database & Multi-Stage Pipeline Architecture

## 1. Architecture Overview

This implementation establishes the initial **COPPER** stage of the 4-stage TRUSTGRID.AI Enterprise Profile Pipeline:

```
COPPER (Raw Extracted Profiles) → SILVER (Filtering & Deduplication) → GOLD (Advanced Qualification) → DIAMOND (Final Verified Profiles)
```

> **Scope Note**: Only the **COPPER** database stage is implemented in this release. Future stage lineage columns and JSONB metadata structures are pre-provisioned so downstream **SILVER**, **GOLD**, and **DIAMOND** (and separate **THC** processing, to be defined later) can operate without schema breaking changes.

---

## 2. Phase 1 — Existing Project & Master Dataset Inspection

### 2.1 Existing Supabase Integration
- **Supabase Project Name**: `WebMinning_DB_TG`
- **Project Reference ID**: `ndalgvpvpzwrqoikkpyb`
- **Supabase API URL**: `https://ndalgvpvpzwrqoikkpyb.supabase.co`
- **Existing Tables Preserved**: All 43 existing tables in `public` (12 Core API tables + 31 Sheet-1 Lead & Telemetry tables) remain untouched.

### 2.2 Consolidated Master Dataset Inspection
- **Source Google Spreadsheet**: `Datas_Automation` (`1D6hEr4Qtwoup87SAYrYe8U_sIOBWNzzF-9PdiI01qVo`)
- **Consolidated Master CSV**: `data/copper_master_dataset.csv` (`68,877` total extracted rows across 8 populated tabs; `Sheet7` is empty)

| Source Tab (`source_sheet`) | Raw Rows | Columns | Unique IDs | Notes |
| :--- | ---: | ---: | ---: | :--- |
| **`EEPC`** | `10,469` | `15` | `10,469` | `EEPC-ORG-000001` .. `EEPC-ORG-010469` |
| **`Sheet2`** | `1,256` | `21` | `1,256` | Organization registry records (`org_...`) |
| **`Sheet3`** | `1,256` | `21` | `1,256` | Duplicate snapshot of `Sheet2` (`1,256` rows safely merged on `profile_id`) |
| **`Sheet4`** | `25,000` | `33` | `25,000` | Global industrial automation & robotics profiles (`org_...`) |
| **`Sheet5`** | `29,500` | `29` | `29,500` | Global industrial automation & robotics profiles (`org_...`) |
| **`Sheet6`** | `1,196` | `29` | `1,196` | Enriched executive contact rows matching `1,196` `Sheet2` `organization_id`s |
| **`Sheet7`** | `0` | `0` | `0` | Empty tab |
| **`Top_100_Manufacturing_ERP_India`** | `100` | `12` | `100` | Normalized `profile_id`: `ERP-IND-0001` .. `ERP-IND-0100` |
| **`ISO_Consultants_5_Cities`** | `100` | `11` | `100` | Normalized `profile_id`: `ISO-5C-0001` .. `ISO-5C-0100` |
| **Total Raw Extracted Rows** | **`68,877`** | — | **`66,425`** | **`66,425` unique `profile_id` records + `2,452` cross-tab merged updates** |

---

## 3. Phase 2 — `public.copper_profiles` Database Schema

Migration file: `supabase/migrations/20261116170000_create_copper_profiles_table.sql`

```sql
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
  -- Phase 8: Future Architecture Preparation (SILVER -> GOLD -> DIAMOND)
  qualification_status TEXT DEFAULT 'PENDING',
  rejection_reason TEXT,
  processing_history JSONB DEFAULT '[]'::jsonb,
  processing_timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_copper_profiles_profile_id ON public.copper_profiles(profile_id);
CREATE INDEX IF NOT EXISTS idx_copper_profiles_linkedin_url ON public.copper_profiles(linkedin_url);
CREATE INDEX IF NOT EXISTS idx_copper_profiles_business_email ON public.copper_profiles(business_email);
CREATE INDEX IF NOT EXISTS idx_copper_profiles_company_name ON public.copper_profiles(company_name);
```

---

## 4. Phase 3 — Column Mapping Specification

| Consolidated CSV Column | Source Tab Column Aliases | Supabase Column (`copper_profiles`) | Null / Default Behavior |
| :--- | :--- | :--- | :--- |
| `Profile_ID` | `Profile_ID`, `Record ID`, `organization_id`, `Rank_ID`, `Record_ID` | `profile_id` (`TEXT UNIQUE NOT NULL`) | Auto-generates deterministic `COPPER-<HASH>` only if missing |
| `Full_Name` | `Full_Name`, `Name` | `full_name` (`TEXT`) | Preserved as `NULL` when missing |
| `Company_Name` | `Company_Name`, `Company`, `organization_name`, `legal_name` | `company_name` (`TEXT`) | Preserved as `NULL` when missing |
| `Designation` | `Designation`, `Role`, `Job_Title` | `designation` (`TEXT`) | Preserved as `NULL` when missing |
| `Industry` | `Industry`, `Provider_Category`, `Organization_Type` | `industry` (`TEXT`) | Preserved as `NULL` when missing |
| `Location` | `Location`, `Locality_and_Address`, `India_HQ_City`, `city/state/country` | `location` (`TEXT`) | Preserved as `NULL` when missing |
| `LinkedIn_URL` | `LinkedIn_URL`, `LinkedIn` | `linkedin_url` (`TEXT`) | Preserved as `NULL` when missing |
| `Website` | `Website`, `Company_Website`, `Web_URL`, `domain` | `website` (`TEXT`) | `"Not publicly available"` normalized to `NULL` (raw kept in `raw_data`) |
| `Business_Email` | `Business_Email`, `Email`, `Email_Contact`, `Work_Email` | `business_email` (`TEXT`) | Preserved as `NULL` when missing |
| `Phone` | `Phone`, `Phone_Contact` | `phone` (`TEXT`) | Formula-corrupted phone strings restored to `+91-...` |
| `Source_URL` | `Source_URL`, `Web_URL`, `source_id` | `source_url` (`TEXT`) | Preserved as `NULL` when missing |
| `Source_File` | `Source_File` | `source_file` (`TEXT`) | `'Datas_Automation (1D6hEr4Qtwoup87SAYrYe8U_sIOBWNzzF-9PdiI01qVo)'` |
| `Source_Sheet` | `Source_Sheet` | `source_sheet` (`TEXT`) | Tab name (`EEPC`, `Sheet2`, `Sheet4`, `Sheet5`, etc.) |
| `Capture_Date` | `Capture_Date`, `Last_Verified_Date`, `created_at` | `capture_date` (`TIMESTAMPTZ`) | Parsed to ISO-8601 `TIMESTAMPTZ` or `NULL` |
| *(Unmapped Columns)* | `Employee_Count`, `CEO_Name`, `Company_Revenue`, `Research_Notes`, etc. | `raw_data` (`JSONB`) | Merged into `raw_data` JSONB without data loss |

---

## 5. Phase 4 & 5 — Safe Batch Import & Environment Security

### 5.1 Environment Variables
Configured in `.env.local` (kept out of version control via `.gitignore`):
```env
SUPABASE_URL=https://ndalgvpvpzwrqoikkpyb.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<SERVER_SIDE_KEY>
```
- Service-role credentials are only read in server-side scripts (`scripts/import-copper-profiles.mjs`, `scripts/verify-copper-database.mjs`) and server-side API routes (`app/api/copper/import/route.ts`).
- No secret keys are ever exposed in client-side components or printed in logs.

### 5.2 Running Future Imports via CLI
```bash
# 1. Consolidate raw sheet exports into data/copper_master_dataset.csv
node scripts/consolidate-copper-dataset.mjs

# 2. Run batch import (500 records/batch, 3 retries with exponential backoff, safe non-null upsert)
node scripts/import-copper-profiles.mjs

# Import a custom CSV file directly:
node scripts/import-copper-profiles.mjs --file=path/to/custom_profiles.csv

# 3. Run standalone database verification queries
node scripts/verify-copper-database.mjs
```

### 5.3 Running Imports via the Admin Dashboard
- **Admin Route**: `/admin/copper-import` (and integrated into `AnalyticsShell` under **Reports & Performance → Copper Data Import**)
- **Capabilities**:
  - Upload CSV file and display file name & total records
  - Preview first 20 records
  - Validate column mapping against `copper_profiles`
  - Execute 500-record batch upserts with live progress bar
  - View inserted, updated, and failed record counters + live Supabase row count
  - Download `Copper_Import_Report.xlsx` and `Copper_Failed_Records_Report.csv`

---

## 6. Phase 8 — Future Architecture Preparation (`COPPER → SILVER → GOLD → DIAMOND`)

Every record in `public.copper_profiles` preserves:
1. **`profile_id`**: Immutable unique key across `COPPER → SILVER → GOLD → DIAMOND`.
2. **Original Source**: `source_url`, `source_file`, `source_sheet`, and `raw_data->_source_metadata`.
3. **Processing History**: `processing_history` (`JSONB` array of stage transitions) and `raw_data->_pipeline_architecture`.
4. **Qualification Status**: `qualification_status` (`TEXT DEFAULT 'PENDING'`).
5. **Rejection Reason**: `rejection_reason` (`TEXT NULL`).
6. **Processing Timestamp**: `processing_timestamp` (`TIMESTAMPTZ DEFAULT NOW()`).

> **Note on THC Processing**: THC processing is intentionally excluded from this stage and will be discussed and implemented separately without any assumptions.

