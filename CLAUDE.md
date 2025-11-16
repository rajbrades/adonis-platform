# CLAUDE.md - AI Assistant Guide for ADONIS Platform

**Last Updated:** 2025-11-16
**Version:** 1.0.0
**Purpose:** Comprehensive guide for AI assistants working with the ADONIS Platform codebase

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Quick Start](#quick-start)
4. [Codebase Structure](#codebase-structure)
5. [Development Conventions](#development-conventions)
6. [API Routes Reference](#api-routes-reference)
7. [Database Schema](#database-schema)
8. [Authentication & Authorization](#authentication--authorization)
9. [Multi-Tenant Architecture](#multi-tenant-architecture)
10. [Common Development Tasks](#common-development-tasks)
11. [Important Files Reference](#important-files-reference)
12. [Testing & Debugging](#testing--debugging)
13. [Gotchas & Important Notes](#gotchas--important-notes)

---

## Project Overview

**ADONIS Platform** is a comprehensive telemedicine platform specializing in hormone optimization and functional medicine. The platform provides:

- **AI-Powered Clinical Analysis** - Claude Sonnet 4 analyzes patient symptoms and lab results
- **Multi-Tenant Branding** - Supports ADONIS (men's health), ATHENA (women's health), and 10X Health
- **Complete Lab Workflow** - Order → Parse → Analyze → Present → Requisition
- **Provider Portal** - Consultation review, approval, and patient management
- **Patient Portal** - Results viewing, consultation tracking, lab ordering
- **Admin Portal** - Lab upload, PDF parsing, system management

**Business Model:** Direct-to-consumer lab testing with optional provider consultations ($299-$799 lab panels + $50-$200 consultation fees)

**Production URL:** https://getadonishealth.com

---

## Tech Stack

### Core Framework
- **Next.js 15.5.4** - App Router with React Server Components
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Strict type checking enabled

### Database & Storage
- **Supabase** - PostgreSQL database with Row Level Security
- **Supabase Storage** - Lab PDFs, requisition files

### Authentication
- **Clerk 6.33.1** - Provider/admin authentication with role management
- **Custom Auth** - Bcrypt-based patient portal (email + DOB + password)

### Payments
- **Stripe** - Lab panel purchases, consultation fees
- **API Version:** `2025-10-29.clover`

### AI & Analysis
- **Anthropic Claude** - `claude-sonnet-4-20250514` for clinical analysis
- **Cost:** ~$0.03 per analysis, 4000 token limit

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS with custom yellow/purple/red themes
- **Lucide React** - Icon library
- **Framer Motion** - Animations and transitions

### Video & Communications
- **Daily.co** - Video consultation infrastructure (mock implementation currently)
- **Resend** - Transactional email service

### PDF Processing
- **pdf-parse-fork** - Extract text from Quest Diagnostics PDFs
- **pdfkit** - Generate lab requisition PDFs
- **jspdf + jspdf-autotable** - Client-side PDF generation
- **tesseract.js** - OCR for scanned lab PDFs
- **pdf2pic** - PDF to image conversion

---

## Quick Start

### Required Environment Variables

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Payments
STRIPE_SECRET_KEY=sk_test_...

# AI Analysis
ANTHROPIC_API_KEY=sk-ant-...

# Tenant Configuration
NEXT_PUBLIC_TENANT_ID=adonis  # or athena, 10x

# Email (optional)
RESEND_API_KEY=re_...

# Site URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```

### Database Setup

1. Run schema files in Supabase SQL Editor:
   ```bash
   # In order:
   consultations-schema.sql
   supabase-lab-schema.sql
   ```

2. Apply migrations:
   ```bash
   # Migrations in supabase/migrations/ auto-apply in hosted Supabase
   # Latest: 20251116122207_add_supplements_and_lab_files.sql
   ```

### First-Time Setup Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env.local` (if exists) or create `.env.local`
- [ ] Add all required environment variables
- [ ] Run database schema files in Supabase
- [ ] Set up Clerk application and add provider/admin roles
- [ ] Configure Stripe products for lab panels
- [ ] Test site password gate at `/password`
- [ ] Verify multi-tenant switching works

---

## Codebase Structure

### Directory Organization

```
/home/user/adonis-platform/
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx               # Root layout (Clerk + Cart providers)
│   ├── page.tsx                 # Homepage (brand-specific)
│   ├── globals.css              # Tailwind imports + custom styles
│   │
│   ├── components/              # Shared UI components
│   │   ├── Navigation.tsx       # Main nav with role-based links
│   │   ├── VideoCall.tsx        # Daily.co integration (mock)
│   │   ├── RescheduleModal.tsx  # Consultation rescheduling
│   │   └── AccordionSection.tsx # Collapsible sections
│   │
│   ├── contexts/                # React Context providers
│   │   └── CartContext.tsx      # Global shopping cart state
│   │
│   ├── api/                     # API routes (28 endpoints)
│   │   ├── ai-analysis/         # Claude analysis endpoint
│   │   ├── consultations/       # CRUD + submit + approve
│   │   ├── patient/             # Patient portal APIs
│   │   ├── stripe/              # Payment processing
│   │   ├── admin/               # Admin-only endpoints
│   │   └── auth/                # Site password verification
│   │
│   ├── provider/                # Provider portal pages
│   │   ├── page.tsx            # Dashboard with pending consultations
│   │   ├── patients/           # Patient list and details
│   │   ├── labs/               # Lab results review
│   │   ├── lab-review/         # Detailed lab analysis UI
│   │   ├── approve/[id]/       # Consultation approval with AI
│   │   └── schedule/           # Appointment scheduling
│   │
│   ├── patient/                 # Patient portal
│   │   ├── signup/             # Email + DOB + password registration
│   │   ├── login/              # Patient authentication
│   │   ├── results/            # Lab results viewer (beautiful UI)
│   │   ├── checkout/           # Lab panel purchase
│   │   └── cart/               # Shopping cart
│   │
│   ├── consultation/            # Consultation flow (6 steps)
│   │   ├── intake/             # Basic info + contact
│   │   ├── medical-history/    # Conditions + medications
│   │   ├── review/             # Summary before submit
│   │   ├── recommendation/     # AI-powered panel recommendation
│   │   └── success/            # Confirmation page
│   │
│   ├── admin/                   # Admin portal
│   │   ├── patients/           # Patient management
│   │   ├── upload-labs/        # PDF upload interface
│   │   └── results/            # Results management
│   │
│   └── [marketing]/             # Marketing pages
│       ├── about/
│       ├── treatments/
│       ├── blog/
│       ├── faq/
│       └── how-it-works/
│
├── lib/                         # Shared utilities and integrations
│   ├── ai/
│   │   └── prompts.ts          # Claude prompt templates
│   ├── pdf/
│   │   └── generate-requisition.ts  # Lab requisition generator
│   ├── emails/
│   │   └── consultation-submitted.tsx  # Email templates
│   ├── parsers/
│   │   └── lab-pdf-parser.ts   # Quest Diagnostics PDF parser
│   ├── supabase.ts             # Server-side Supabase client
│   ├── supabaseClient.ts       # Client-side Supabase client
│   ├── stripe.ts               # Stripe initialization
│   ├── auth.ts                 # Clerk role helpers
│   ├── brand.ts                # Multi-tenant brand configs
│   ├── tenant-config.ts        # Tenant-specific settings
│   ├── lab-panels.ts           # Lab panel definitions
│   ├── functional-ranges.ts    # Optimal biomarker ranges
│   └── biomarker-categories.ts # Biomarker categorization
│
├── types/                       # TypeScript declarations
│   └── pdf-parse-fork.d.ts     # PDF parsing types
│
├── supabase/                    # Supabase configuration
│   └── migrations/             # Database migrations
│       └── 20251116122207_add_supplements_and_lab_files.sql
│
├── public/                      # Static assets
│   ├── images/
│   └── fonts/
│
├── middleware.ts                # Clerk + site password protection
├── tailwind.config.ts          # Tailwind + custom theme
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
└── package.json                # Dependencies and scripts
```

### Key File Counts
- **Total TypeScript/TSX:** ~2,916 lines of code
- **API Routes:** 28 endpoints
- **Database Tables:** 8 main tables
- **Lab Panels:** 3 pre-built packages (Essential, Comprehensive, Elite)

---

## Development Conventions

### File Naming Patterns

**Components:**
- PascalCase: `VideoCall.tsx`, `Navigation.tsx`
- Descriptive: `RescheduleModal.tsx`, `AccordionSection.tsx`

**Pages:**
- Always named `page.tsx` in route directory
- Default export of React component

**API Routes:**
- Always named `route.ts` in route directory
- Named exports for HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`)

**Utilities:**
- kebab-case: `lab-panels.ts`, `functional-ranges.ts`, `lab-pdf-parser.ts`
- Named exports: `export const LAB_PANELS`, `export function parsePDF()`

**Types:**
- Inline interfaces in relevant files (preferred)
- Separate `.d.ts` files for third-party type declarations

### Component Patterns

#### Server Components (Default)
```typescript
// app/provider/page.tsx
import { getCurrentUserWithRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase'

export default async function ProviderDashboard() {
  // Auth check
  const user = await getCurrentUserWithRole()

  // Direct database queries
  const supabase = createClient()
  const { data } = await supabase
    .from('consultations')
    .select('*')
    .eq('status', 'pending')

  return <div>...</div>
}
```

#### Client Components
```typescript
'use client'

import { useState, useEffect } from 'react'

export default function VideoCall({ roomUrl, onLeave }) {
  const [isMuted, setIsMuted] = useState(false)

  // Interactive logic here

  return <div>...</div>
}
```

#### API Route Handlers
```typescript
// app/api/consultations/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('consultations')
      .select('*')

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  // ...
}
```

### Code Style Guidelines

**TypeScript:**
- Use strict type checking (enabled in tsconfig.json)
- Prefer interfaces for object shapes
- Use type aliases for unions: `type Status = 'pending' | 'approved'`
- Always type function parameters and return values

**React:**
- Functional components only (no class components)
- Use hooks for state management
- Server Components by default, add `'use client'` only when needed
- Co-locate route-specific components with their routes

**Error Handling:**
```typescript
// API Routes
try {
  // ... logic
  return NextResponse.json(data)
} catch (error) {
  console.error('Descriptive error message:', error)
  return NextResponse.json(
    { error: 'User-friendly message' },
    { status: 500 }
  )
}

// Server Components
try {
  // ... logic
} catch (error) {
  console.error(error)
  return <div>Error loading data</div>
}
```

**Database Queries:**
```typescript
// Always use service role for server-side operations
import { createClient } from '@/lib/supabase'

const supabase = createClient() // Uses SUPABASE_SERVICE_ROLE_KEY

// Use anon key for client-side (rare)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
```

**Async/Await:**
- Always use async/await (no .then() chaining)
- Handle errors with try/catch
- Use Promise.all() for parallel operations

---

## API Routes Reference

### Consultations

**GET/POST `/api/consultations`**
- Get all consultations (admin/provider) or create new
- Auth: Clerk protected
- Returns: Array of consultation objects

**POST `/api/consultations/submit`**
- Submit new patient consultation
- Public endpoint (no auth required)
- Creates consultation + links Stripe session
- Body: Full consultation form data

**GET `/api/consultations/public?id={consultation_id}`**
- Public consultation access
- Used for: Linking patient accounts, email links
- Returns: Consultation data without sensitive info

**GET `/api/consultations/[id]`**
- Get single consultation by ID
- Auth: Clerk protected (provider/admin)
- Returns: Full consultation object

**POST `/api/consultations/[id]/approve`**
- Provider approves consultation
- Creates patient account automatically
- Sends email with login credentials
- Body: `{ status: 'approved', provider_notes?: string }`

### AI Analysis

**POST `/api/ai-analysis`**
- Claude Sonnet 4 clinical analysis
- Two modes:
  1. **Initial Assessment** - No labs, recommend panels
  2. **Systems Analysis** - With lab results, full review
- Body: `{ prompt: string, consultationData: object, labResults?: array }`
- Returns: `{ analysis: string, cost: number }`

### Patient Portal

**POST `/api/patient/signup`**
- Create patient account
- Body: `{ email, password, dateOfBirth, consultation_id? }`
- Password hashed with bcrypt
- Returns: `{ success: true, patient_id }`

**POST `/api/patient/login`**
- Patient authentication
- Body: `{ email, password, dateOfBirth }`
- Returns: `{ success: true, patient_id, email }`

**GET `/api/patient/verify?email={email}&dob={YYYY-MM-DD}&password={pass}`**
- Verify patient credentials
- Used for: Auth checks, session validation
- Returns: `{ valid: true/false }`

**GET `/api/patient/results?patient_id={id}`**
- Fetch patient lab results
- Returns: Array of lab results with biomarker data

**GET `/api/patient/consultations?patient_id={id}`**
- Get patient's consultations
- Returns: Array of consultation objects

**POST `/api/patient/link-consultation`**
- Link consultation to existing patient
- Body: `{ patient_id, consultation_id }`

### Stripe Payments

**POST `/api/stripe/create-checkout`**
- Create Stripe checkout session
- Body: `{ panelType, consultationId, customerEmail }`
- Returns: `{ sessionId, url }`

**POST `/api/stripe/verify-payment`**
- Verify payment completion
- Body: `{ sessionId }`
- Returns: `{ success: true, session: object }`

### Lab Management

**GET `/api/lab-panels`**
- Fetch available lab panels
- Public endpoint
- Returns: Array of panel objects with pricing

**GET `/api/lab-results?patient_id={id}`**
- Get lab results for patient
- Returns: Results with biomarker categorization

**POST `/api/upload-lab-files`**
- Upload lab PDF files
- Multipart form data
- Stores in Supabase Storage
- Returns: File URLs

**GET `/api/biomarker-ranges`**
- Get optimal biomarker ranges
- Used for: Results comparison, highlighting
- Returns: Array of functional ranges

### Admin Endpoints

**POST `/api/admin/upload-pdf`**
- Upload lab PDF (admin only)
- Auth: Requires admin role
- Stores file in Supabase Storage

**POST `/api/admin/parse-lab-pdf`**
- Parse Quest Diagnostics PDF
- Extracts biomarkers, values, ranges
- Returns: Structured lab data (60+ biomarkers)

**GET `/api/admin/lab-results/list`**
- List all lab results (admin view)
- Returns: All results across all patients

**GET `/api/admin/check-schema`**
- Verify database schema
- Returns: Table existence, column info

**POST `/api/admin/debug-pdf`**
- Debug PDF parsing issues
- Returns: Raw extracted text + parsed data

### Authentication

**POST `/api/auth/verify-password`**
- Site-wide password gate
- Sets `site-access=granted` cookie
- Body: `{ password: string }`

**GET `/api/debug-auth`**
- Debug authentication state
- Returns: Current user info, role, session

---

## Database Schema

### Tables Overview

```sql
-- Core consultation data
consultations
  - id (UUID, PK)
  - patient info (name, email, phone, DOB)
  - health data (conditions, medications, symptoms)
  - lifestyle (exercise, sleep, diet, stress)
  - status ('pending' | 'approved' | 'rejected')
  - priority ('low' | 'medium' | 'high')
  - current_supplements (TEXT)
  - lab_files (JSONB)
  - stripe_session_id
  - created_at, updated_at

-- Patient accounts (separate from consultations)
patients
  - id (UUID, PK)
  - email (unique)
  - password_hash (bcrypt)
  - date_of_birth
  - consultation_id (FK to consultations)
  - created_at

-- Lab results storage
lab_results
  - id (UUID, PK)
  - patient_id (FK, can be consultation_id)
  - biomarker_name
  - value (numeric)
  - unit
  - reference_range_low/high
  - optimal_range_low/high
  - status ('normal' | 'low' | 'high' | 'critical')
  - test_date
  - category
  - notes

-- Lab panel catalog
lab_panels
  - id, name, slug, description
  - price (e.g., 299.00, 499.00, 799.00)
  - panel_type ('comprehensive' | 'complete' | 'executive')
  - biomarker_count
  - best_for (TEXT)
  - meets_treatment_requirements (BOOLEAN)
  - is_featured

-- Individual lab tests
lab_tests
  - id, category_id (FK)
  - name, description
  - test_code (LabCorp/Quest codes)
  - price, sample_type
  - turnaround_days
  - is_active

-- Biomarker categories
lab_categories
  - id, name, description
  - display_order
  - Examples: Hormones, Thyroid, Metabolic, Cardiovascular

-- Lab orders
lab_orders
  - id, order_number
  - customer_email, customer_phone
  - subtotal, tax, total
  - payment_status, payment_intent_id
  - requisition_url
  - results_url
  - state_restriction (NY, NJ, RI blocked)

-- Lab reviews (consultation appointments)
lab_reviews
  - id, order_id (FK)
  - customer_email
  - review_type ('standard' | 'premium')
  - scheduled_date
  - duration_minutes
  - health_coach_id
  - status, notes
```

### Row Level Security (RLS)

**Enabled on all tables with policies:**
- Catalog tables (panels, tests, categories): Public read access
- User data: Users can only access their own data (filtered by email)
- Admin access: Service role bypasses RLS

### Important Query Patterns

**Fetch consultation with lab results:**
```typescript
const { data } = await supabase
  .from('consultations')
  .select(`
    *,
    lab_results (*)
  `)
  .eq('id', consultationId)
  .single()
```

**Patient login verification:**
```typescript
const { data: patient } = await supabase
  .from('patients')
  .select('*')
  .eq('email', email)
  .single()

// Then verify: await bcrypt.compare(password, patient.password_hash)
```

**Get categorized lab results:**
```typescript
const { data } = await supabase
  .from('lab_results')
  .select('*')
  .eq('patient_id', patientId)
  .order('category', { ascending: true })
  .order('biomarker_name', { ascending: true })
```

---

## Authentication & Authorization

### Clerk (Providers & Admins)

**Setup:**
- Wrap app in `<ClerkProvider>` (done in `app/layout.tsx`)
- Middleware protects non-public routes
- Roles stored in `user.publicMetadata.role`

**Helper Functions (lib/auth.ts):**
```typescript
// Get current user's role
const role = await getCurrentUserRole() // 'admin' | 'provider' | 'patient' | null

// Check if user has role
const isAdmin = await hasRole('admin')
const isProviderOrAdmin = await hasRole(['admin', 'provider'])

// Require role (redirects if unauthorized)
await requireAdmin()       // Admin only
await requireProvider()    // Admin or Provider

// Get user with role
const user = await getCurrentUserWithRole()
// Returns: { id, email, firstName, lastName, role }
```

**Protected Routes:**
- `/provider/*` - Provider dashboard and tools
- `/admin/*` - Admin portal
- All unlisted routes default to protected

**Public Routes (middleware.ts):**
```typescript
'/', '/sign-in', '/sign-up',
'/about', '/treatments', '/blog', '/faq',
'/consultation/*', '/checkout', '/payment',
'/patient/login', '/patient/signup', '/patient/results',
'/api/consultations/public', '/api/patient/*', '/api/stripe/*'
```

### Site Password Gate

**Purpose:** Protect entire site during development/private beta

**Implementation:**
- Middleware checks for `site-access=granted` cookie
- Redirects to `/password` if not set
- Bypasses: `/password` and `/api/auth/verify-password`

**Usage:**
```typescript
// In /password page
await fetch('/api/auth/verify-password', {
  method: 'POST',
  body: JSON.stringify({ password })
})
// Sets cookie on success
```

### Patient Portal Auth

**Separate System (lib/auth.ts not used):**

**Registration:**
```typescript
// POST /api/patient/signup
{
  email: string,
  password: string,  // Hashed with bcrypt
  dateOfBirth: string,
  consultation_id?: string  // Optional link
}
```

**Login:**
```typescript
// POST /api/patient/login
{
  email: string,
  password: string,
  dateOfBirth: string  // Required for verification
}
```

**Why Separate?**
- Patients don't need full Clerk features
- Simpler UX (email + DOB + password)
- Cost savings (Clerk charges per user)
- Different data access patterns

---

## Multi-Tenant Architecture

### Tenant Configuration

**Environment Variable:**
```bash
NEXT_PUBLIC_TENANT_ID=adonis  # or athena, 10x
```

**Brands Supported:**

1. **ADONIS** (default)
   - Target: Men's health, hormone optimization
   - Colors: Yellow (#FCD34D primary)
   - Domain: getadonishealth.com

2. **ATHENA**
   - Target: Women's health
   - Colors: Purple theme
   - Domain: (to be configured)

3. **10X Health**
   - Target: General health optimization
   - Colors: Red theme
   - Domain: (to be configured)

### Brand Configuration (lib/brand.ts)

```typescript
export function getBrand(tenantId?: BrandId): BrandConfig {
  const id = tenantId || process.env.NEXT_PUBLIC_TENANT_ID || 'adonis'

  return BRANDS[id] // Returns brand-specific config
}

// Usage in components
const brand = getBrand()
console.log(brand.colors.primary) // '#FCD34D' for ADONIS
console.log(brand.hero.title)     // "Reclaim Your Peak Performance"
```

**Brand Config Structure:**
```typescript
interface BrandConfig {
  id: BrandId
  name: string
  colors: { primary, primaryDark, accent, primaryText }
  hero: { badge, title, titleHighlight, subtitle, ctaPrimary, ctaSecondary }
  services: Array<{ icon, title, description, href }>
  whyChoose: { sectionTitle, items }
  stats: { title, subtitle, items }
  finalCta: { title, subtitle, buttonText }
}
```

### Tenant-Specific Features (lib/tenant-config.ts)

```typescript
interface TenantConfig {
  name: string
  logo: string
  colors: { primary, secondary }
  domain: string
}

const TENANT_CONFIGS: Record<BrandId, TenantConfig> = {
  adonis: { name: 'ADONIS', logo: '/adonis-logo.svg', ... },
  athena: { name: 'ATHENA', logo: '/athena-logo.svg', ... },
  '10x': { name: '10X Health', logo: '/10x-logo.svg', ... }
}
```

### Switching Tenants

**Development:**
1. Change `NEXT_PUBLIC_TENANT_ID` in `.env.local`
2. Restart dev server (`npm run dev`)
3. UI automatically updates with new branding

**Production:**
1. Deploy separate instances with different env vars
2. Use Vercel environment variables per project
3. Route domains to appropriate instances

---

## Common Development Tasks

### Adding a New API Endpoint

1. Create route file:
   ```bash
   # Example: app/api/health-metrics/route.ts
   ```

2. Implement HTTP methods:
   ```typescript
   import { NextResponse } from 'next/server'
   import { createClient } from '@/lib/supabase'

   export async function GET(request: Request) {
     const supabase = createClient()
     // ... query logic
     return NextResponse.json(data)
   }

   export async function POST(request: Request) {
     const body = await request.json()
     // ... mutation logic
     return NextResponse.json({ success: true })
   }
   ```

3. Add to middleware if public:
   ```typescript
   // middleware.ts
   const isPublicRoute = createRouteMatcher([
     // ... existing routes
     '/api/health-metrics(.*)',
   ])
   ```

### Adding a New Database Table

1. Create migration file:
   ```bash
   # supabase/migrations/YYYYMMDDHHMMSS_description.sql
   ```

2. Write migration SQL:
   ```sql
   CREATE TABLE health_metrics (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     patient_id UUID REFERENCES patients(id),
     metric_name TEXT NOT NULL,
     value NUMERIC,
     recorded_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Enable RLS
   ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;

   -- Add policies
   CREATE POLICY "Users can view own metrics"
     ON health_metrics FOR SELECT
     USING (patient_id = auth.uid());
   ```

3. Run in Supabase:
   - Copy SQL to Supabase SQL Editor
   - Execute
   - Verify in Table Editor

### Adding a New Page

1. Create page file:
   ```bash
   # app/dashboard/analytics/page.tsx
   ```

2. Implement page:
   ```typescript
   import { requireProvider } from '@/lib/auth'

   export default async function AnalyticsPage() {
     await requireProvider() // Protect route

     // Fetch data
     const data = await fetchAnalytics()

     return (
       <div>
         <h1>Analytics Dashboard</h1>
         {/* ... */}
       </div>
     )
   }
   ```

3. Add to navigation:
   ```typescript
   // app/components/Navigation.tsx
   const providerLinks = [
     // ... existing
     { href: '/dashboard/analytics', label: 'Analytics' }
   ]
   ```

### Modifying Lab PDF Parser

**Location:** `lib/parsers/lab-pdf-parser.ts`

**Common Tasks:**

1. **Add new biomarker pattern:**
   ```typescript
   const biomarkerPatterns = {
     // ... existing
     'Vitamin D': /Vitamin D.*?(\d+\.?\d*)\s*(ng\/mL)/i,
   }
   ```

2. **Handle new lab format:**
   ```typescript
   // Add detection logic
   if (text.includes('LabCorp')) {
     return parseLabCorpFormat(text)
   } else if (text.includes('Quest')) {
     return parseQuestFormat(text)
   }
   ```

3. **Test parsing:**
   ```typescript
   // Use /api/admin/debug-pdf endpoint
   // Upload PDF and inspect raw text + parsed results
   ```

### Integrating New AI Prompt

**Location:** `lib/ai/prompts.ts`

1. Add prompt definition:
   ```typescript
   export const AI_PROMPTS = [
     // ... existing
     {
       id: 'nutrition-analysis',
       title: 'Nutritional Analysis',
       description: 'Analyze diet and provide recommendations',
       requiresLabs: false,
       prompt: `Analyze the patient's dietary intake and provide...`
     }
   ]
   ```

2. Use in API:
   ```typescript
   // app/api/ai-analysis/route.ts
   const prompt = AI_PROMPTS.find(p => p.id === 'nutrition-analysis')

   const response = await anthropic.messages.create({
     model: 'claude-sonnet-4-20250514',
     max_tokens: 4000,
     messages: [{ role: 'user', content: prompt.prompt }]
   })
   ```

---

## Important Files Reference

### Core Configuration

| File | Purpose | When to Modify |
|------|---------|----------------|
| `middleware.ts` | Route protection, password gate, redirects | Adding public routes, changing auth flow |
| `tailwind.config.ts` | Theme colors, custom utilities | Adding new brand colors, UI customization |
| `tsconfig.json` | TypeScript compiler options | Changing module resolution, adding path aliases |
| `next.config.ts` | Next.js build config | Adding redirects, headers, webpack customization |
| `.env.local` | Environment variables (not committed) | Local development setup |

### Authentication & Authorization

| File | Purpose |
|------|---------|
| `lib/auth.ts` | Clerk role helpers, user utilities |
| `app/layout.tsx` | ClerkProvider wrapper |
| `app/api/patient/login/route.ts` | Patient authentication logic |
| `app/api/patient/signup/route.ts` | Patient registration |

### Database

| File | Purpose |
|------|---------|
| `lib/supabase.ts` | Server-side Supabase client (service role) |
| `lib/supabaseClient.ts` | Client-side Supabase client (anon key) |
| `consultations-schema.sql` | Consultations table schema |
| `supabase-lab-schema.sql` | Lab testing schema (panels, tests, orders) |
| `supabase/migrations/` | Database version control |

### Business Logic

| File | Purpose |
|------|---------|
| `lib/brand.ts` | Multi-tenant brand configuration |
| `lib/lab-panels.ts` | Lab panel definitions and pricing |
| `lib/functional-ranges.ts` | Optimal biomarker ranges (vs. lab ranges) |
| `lib/biomarker-categories.ts` | Biomarker grouping for UI |
| `lib/parsers/lab-pdf-parser.ts` | Quest PDF parsing (60+ biomarkers) |
| `lib/pdf/generate-requisition.ts` | PDF requisition generation |
| `lib/ai/prompts.ts` | Claude analysis prompts |

### Key API Routes

| Route | Purpose |
|-------|---------|
| `/api/ai-analysis/route.ts` | Claude Sonnet 4 integration |
| `/api/consultations/[id]/approve/route.ts` | Provider approval workflow |
| `/api/patient/login/route.ts` | Patient authentication |
| `/api/stripe/create-checkout/route.ts` | Payment processing |
| `/api/admin/parse-lab-pdf/route.ts` | PDF parsing endpoint |

### UI Components

| Component | Purpose |
|-----------|---------|
| `app/components/Navigation.tsx` | Main navigation with role-based links |
| `app/components/VideoCall.tsx` | Daily.co video consultation (mock) |
| `app/contexts/CartContext.tsx` | Global shopping cart state |
| `app/provider/approve/[id]/AIAnalysis.tsx` | AI analysis UI for providers |

---

## Testing & Debugging

### Debug Endpoints

**Authentication:**
```bash
GET /api/debug-auth
# Returns: Current user, role, session info
```

**Database Schema:**
```bash
GET /api/admin/check-schema
# Returns: Table existence, column info
```

**PDF Parsing:**
```bash
POST /api/admin/debug-pdf
# Upload PDF, get raw text + parsed results
# Use to troubleshoot parsing issues
```

### Debug Pages

**PDF Debugging:**
```bash
/dashboard/debug-pdf
# UI for testing PDF upload and parsing
```

**Patient Results Demo:**
```bash
/patient/results/demo
# View sample lab results without login
```

**Admin Test:**
```bash
/test-admin
# Admin functionality testing
```

### Utility Scripts

**Check Patients:**
```bash
node check_patients.js
# Verify patient data in database
```

**Check Table:**
```bash
node check_table.js
# Verify specific table exists and has data
```

**Screenshot Tool:**
```bash
node take-screenshot.js
# Puppeteer-based page screenshot for testing
```

### Common Issues & Solutions

**Issue: 403 on git push**
- **Cause:** Branch name doesn't start with `claude/` or doesn't match session ID
- **Solution:** Use correct branch format: `claude/description-{sessionId}`

**Issue: Stripe payment not completing**
- **Cause:** Webhook not configured or environment mismatch
- **Solution:** Use `/api/stripe/verify-payment` endpoint to check session

**Issue: Lab PDF not parsing**
- **Cause:** New lab format or OCR issues
- **Solution:** Use `/api/admin/debug-pdf` to inspect raw text
- Check `lib/parsers/lab-pdf-parser.ts` for pattern matching

**Issue: Patient can't log in**
- **Cause:** Date of birth format mismatch
- **Solution:** Ensure DOB is in `YYYY-MM-DD` format
- Check `app/api/patient/login/route.ts` for validation

**Issue: AI analysis fails**
- **Cause:** Missing ANTHROPIC_API_KEY or prompt too long
- **Solution:** Verify env var, check token limit (4000 max)
- See `app/api/ai-analysis/route.ts` for error handling

**Issue: Multi-tenant not switching**
- **Cause:** NEXT_PUBLIC_TENANT_ID not set or dev server not restarted
- **Solution:** Set env var, restart: `npm run dev`

**Issue: RLS blocking queries**
- **Cause:** Using anon key instead of service role
- **Solution:** Use `createClient()` from `lib/supabase.ts` (server-side)

---

## Gotchas & Important Notes

### Critical Production Requirements

1. **Environment Variables Must Be Set:**
   - Missing `ANTHROPIC_API_KEY` breaks AI analysis (no fallback)
   - Missing `STRIPE_SECRET_KEY` breaks payments
   - Missing `CLERK_SECRET_KEY` breaks authentication

2. **Database Migrations Must Run in Order:**
   - Schema files must run before migrations
   - Migrations in `supabase/migrations/` must run sequentially

3. **Site Password Gate:**
   - All users must pass password gate first
   - Don't forget to bypass in production or remove entirely

4. **Row Level Security:**
   - Always use service role for admin operations
   - Anon key queries will fail without proper policies

### Development Gotchas

1. **Path Aliases:**
   - `@/` maps to root directory
   - Don't use `../../../` relative imports

2. **Server vs Client Components:**
   - Database queries only work in Server Components
   - `useState`, `useEffect` require `'use client'`
   - Context providers must be Client Components

3. **Middleware Execution:**
   - Runs on every request (even static assets)
   - Keep logic minimal for performance
   - Cookie checks are cached

4. **Supabase Client Selection:**
   - Server: `createClient()` from `lib/supabase.ts`
   - Client: `createClientComponentClient()` (rare)
   - Never mix service role key in client-side code

5. **TypeScript Strict Mode:**
   - Enabled globally
   - Must handle null/undefined explicitly
   - No implicit `any` types

### Security Considerations

1. **Never Expose Service Role Key:**
   - Only use in server-side code
   - Never send to client
   - Bypasses all RLS policies

2. **Bcrypt for Patient Passwords:**
   - Always hash passwords with bcrypt (10 rounds)
   - Never store plaintext passwords

3. **Validate User Input:**
   - Especially in API routes
   - Sanitize before database queries
   - Use TypeScript for type safety

4. **CORS and Public Routes:**
   - Carefully configure public routes in middleware
   - Don't expose sensitive endpoints

5. **Stripe Webhook Verification:**
   - Always verify webhook signatures
   - Check payment status server-side

### Performance Tips

1. **Server Components for Data Fetching:**
   - Reduces client bundle size
   - Better SEO
   - Faster initial page load

2. **Parallel Queries:**
   ```typescript
   // Good: Parallel
   const [consultations, patients] = await Promise.all([
     supabase.from('consultations').select('*'),
     supabase.from('patients').select('*')
   ])

   // Bad: Sequential
   const consultations = await supabase.from('consultations').select('*')
   const patients = await supabase.from('patients').select('*')
   ```

3. **Database Indexes:**
   - Ensure indexes on frequently queried columns
   - `patient_id`, `consultation_id`, `email` should be indexed

4. **Caching Static Data:**
   - Lab panels, biomarker ranges rarely change
   - Consider caching in memory or Redis

### Multi-Tenant Gotchas

1. **Environment Variable Visibility:**
   - `NEXT_PUBLIC_*` variables are embedded in client bundle
   - Tenant ID is visible to users (by design)

2. **Brand Assets:**
   - Each tenant needs separate logo, images
   - Store in `/public/brands/{tenantId}/`

3. **Domain Routing:**
   - Production deployments need separate Vercel projects
   - Or use middleware to detect domain and set tenant

---

## Additional Resources

### Documentation
- **Next.js 15 Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Clerk Docs:** https://clerk.com/docs
- **Stripe API:** https://stripe.com/docs/api
- **Anthropic API:** https://docs.anthropic.com

### Project Files
- **PROJECT_STATUS.md** - Current implementation status
- **PROJECT-SUMMARY.md** - High-level project overview
- **README.md** - Basic Next.js setup instructions

### Internal References
- Lab Panels: `lib/lab-panels.ts`
- Functional Ranges: `lib/functional-ranges.ts`
- AI Prompts: `lib/ai/prompts.ts`
- Brand Configs: `lib/brand.ts`

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
# Run in Supabase SQL Editor:
# 1. consultations-schema.sql
# 2. supabase-lab-schema.sql
# 3. Migrations in supabase/migrations/

# Git (Claude branch format)
git checkout -b claude/feature-name-{sessionId}
git push -u origin claude/feature-name-{sessionId}

# Testing
node check_patients.js   # Check patient data
node check_table.js      # Verify table exists
node take-screenshot.js  # Screenshot testing

# Debug URLs
http://localhost:3000/api/debug-auth
http://localhost:3000/api/admin/check-schema
http://localhost:3000/dashboard/debug-pdf
```

---

## Version History

**v1.0.0 (2025-11-16)**
- Initial CLAUDE.md creation
- Comprehensive codebase analysis
- All major features documented
- Multi-tenant architecture explained
- Current state: Production-ready core features

---

**End of CLAUDE.md**

This document should be updated whenever significant architectural changes occur, new major features are added, or development patterns evolve.
