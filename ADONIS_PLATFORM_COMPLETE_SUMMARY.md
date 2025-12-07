# ADONIS Health Platform - Complete Project Summary
**Last Updated:** November 19, 2025  
**Version:** 1.3  
**Status:** Production-Ready with Active Development

---

## 📋 TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Technical Architecture](#technical-architecture)
4. [Database Schema](#database-schema)
5. [Complete Feature Inventory](#feature-inventory)
6. [File Structure & Organization](#file-structure)
7. [Recent Work (Nov 19, 2025)](#recent-work)
8. [Ryan's Preferences & Communication Style](#ryan-preferences)
9. [Known Issues & Technical Debt](#known-issues)
10. [Next Steps & Roadmap](#next-steps)
11. [Environment Configuration](#environment-config)
12. [Deployment Process](#deployment)
13. [Key Code Patterns](#code-patterns)

---

## 🎯 EXECUTIVE SUMMARY {#executive-summary}

**ADONIS Health** is a premium men's health telemedicine platform targeting high-performing executives aged 30-60 for hormone optimization and wellness services. The platform is ~75% complete and approaching production readiness.

### Current State
- ✅ **Patient Journey:** Full consultation flow with PDF upload, email confirmation
- ✅ **Provider Workflow:** Dual-path approval system (schedule consultation OR direct treatment)
- ✅ **Lab Processing:** Automated Quest Diagnostics PDF parsing (60+ biomarkers)
- ✅ **AI Clinical Analysis:** Claude Sonnet 4 integration for provider assistance
- ✅ **Video Integration:** Zoom call button for patient consultations
- ✅ **Payment System:** Stripe checkout integration
- ⚠️ **Critical Gaps:** PDF requisition generation, provider approval API refinements, scheduling system

### Technology Stack
- **Framework:** Next.js 15.5.7 with TypeScript
- **Database:** Supabase PostgreSQL
- **Deployment:** Vercel (auto-deploy from main branch)
- **Auth:** Clerk (admin/provider) + Custom bcrypt (patients)
- **AI:** Anthropic Claude Sonnet 4
- **Email:** Resend API
- **Payments:** Stripe
- **PDF Processing:** pdf-parse-fork

---

## 📊 PROJECT OVERVIEW {#project-overview}

### Business Model
**Direct-to-Consumer Telemedicine** (B2C only - white-label SaaS abandoned Nov 1, 2025)

### Target Market
- **Demographics:** Men aged 30-60
- **Psychographics:** High-performing executives, entrepreneurs, business leaders
- **Pain Points:** Declining energy, suboptimal performance, hormone imbalances
- **Value Proposition:** Data-driven medical optimization with licensed physicians

### Pricing Structure
**Lab Panels:**
- Thyroid Complete Panel: $179 (8 biomarkers)
- Metabolic Health Panel: $199 (30 biomarkers)
- Testosterone Optimization Panel: $249 (25 biomarkers)
- Comprehensive Panel: $299 (65 biomarkers)
- Complete Panel: $499 (100 biomarkers)
- Executive Panel: $799 (50 biomarkers)

**Treatment Pricing:** TBD (not yet implemented)

### Brand Identity
- **Colors:** Black (#000000), Gold (#FBBF24), Dark Gray (#111111)
- **Design:** Glassmorphism with premium aesthetics
- **Tone:** Powerful, data-driven, executive-focused
- **Sister Brand:** ATHENA Health (women's platform, planned but not built)

---

## 🏗️ TECHNICAL ARCHITECTURE {#technical-architecture}

### Core Stack
```
Next.js 15.5.7 (App Router)
├── TypeScript 5.x (Strict Mode)
├── React 18.x (Server Components)
├── Tailwind CSS 3.x
└── Vercel Edge Functions
```

### Database & Backend
```
Supabase PostgreSQL
├── Project: ytsjwgjpbvnulcvshedd
├── URL: https://ytsjwgjpbvnulcvshedd.supabase.co
├── RLS: Disabled (needs re-enabling for production)
└── Service Role Key: Configured in environment
```

### Authentication Architecture
**Two-Tier System:**
1. **Clerk** - Admin/Provider Portal
   - Domain: blessed-toad-11.clerk.accounts.dev
   - Routes: `/sign-in`, `/sign-up`, `/admin/*`, `/provider/*`
   - Protected with middleware

2. **Custom Auth** - Patient Portal
   - bcrypt password hashing
   - Session-based with name + DOB + password
   - Routes: `/patient/signup`, `/patient/login`, `/patient/*`

### Payment Processing
- **Stripe API Version:** 2025-10-29.clover
- **Checkout Flow:** `/api/stripe/create-checkout`
- **Verification:** `/api/stripe/verify-payment`
- **Status:** Fully integrated, tested

### AI Integration
- **Model:** Claude Sonnet 4 (claude-sonnet-4-20250929)
- **Use Case:** Clinical lab analysis for providers
- **Cost:** ~$0.03 per analysis
- **Time Saved:** 10-15 minutes per patient
- **Integration:** `/api/analyze-labs`

### Email Service
- **Provider:** Resend
- **From Address:** noreply@getadonishealth.com
- **Templates:**
  - Consultation confirmation (patient)
  - Lab recommendations (patient)
  - PDF requisition delivery (patient)

### PDF Processing
- **Library:** pdf-parse-fork v1.2.0
- **Format:** Quest Diagnostics PDFs
- **Capability:** Extracts 60+ biomarkers automatically
- **Parser Location:** `lib/parsers/lab-pdf-parser.ts`
- **API Endpoint:** `/api/admin/parse-lab-pdf`

### Video Integration
- **Platform:** Zoom (personal meeting room)
- **URL:** https://10xhealthsystem.zoom.us/j/5359639689
- **Implementation:** Button opens new tab, provider can alt-tab
- **Location:** Lab review page (`/provider/lab-review/[id]`)

---

## 🗄️ DATABASE SCHEMA {#database-schema}

### Core Tables

#### `consultations`
Primary table for patient intake submissions.
```sql
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE NOT NULL,
  height INTEGER,
  weight INTEGER,
  occupation TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  
  -- Clinical Data
  optimization_goals TEXT[] DEFAULT '{}',
  medical_conditions TEXT[] DEFAULT '{}',
  symptoms TEXT[] DEFAULT '{}',
  current_medications TEXT,
  current_supplements TEXT,
  allergies TEXT,
  surgeries TEXT,
  family_history TEXT,
  previous_hormone_therapy TEXT,
  labs_recent TEXT,
  lab_files TEXT[] DEFAULT '{}',  -- Array of Supabase storage URLs
  lifestyle JSONB DEFAULT '{}',
  
  -- Provider Review
  status TEXT DEFAULT 'pending',  -- pending, approved, rejected
  provider_notes TEXT,
  recommended_labs JSONB,  -- Array of lab panel objects
  reviewed_by TEXT,
  reviewed_at TIMESTAMP,
  
  -- Payment
  payment_status TEXT,  -- paid, pending, failed
  payment_date TIMESTAMP,
  stripe_payment_id TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `lab_results`
Stores parsed biomarker data from uploaded PDFs or admin uploads.
```sql
CREATE TABLE lab_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,  -- Links to consultation ID or patient
  patient_name TEXT NOT NULL,
  patient_dob TEXT NOT NULL,
  panel_name TEXT NOT NULL,
  test_date DATE NOT NULL,
  uploaded_at TIMESTAMP DEFAULT NOW(),
  uploaded_by TEXT,  -- 'admin', 'provider', 'patient'
  pdf_url TEXT,
  biomarkers JSONB NOT NULL,  -- Array of biomarker objects
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Biomarker Object Structure:**
```typescript
{
  biomarker: string      // "TESTOSTERONE, TOTAL"
  value: string          // "450"
  unit: string           // "ng/dL"
  referenceRange: string // "250-1100"
  status: string         // "normal", "high", "low"
}
```

#### `lab_panels`
Pre-defined lab testing packages.
```sql
CREATE TABLE lab_panels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  biomarker_count INTEGER NOT NULL,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `patients`
Registered patient accounts (post-payment).
```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID REFERENCES consultations(id),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,  -- bcrypt
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);
```

---

## ✅ COMPLETE FEATURE INVENTORY {#feature-inventory}

### Public Marketing (15 pages)
- [x] Homepage (`/`)
- [x] About Us (`/about`)
- [x] How It Works (`/how-it-works`)
- [x] Goals (`/goals`)
- [x] FAQ (`/faq`)
- [x] Blog listing (`/blog`)
- [x] Blog posts (`/blog/[slug]`)
- [x] Products overview (`/products`)
- [x] Treatment: Testosterone Replacement (`/treatments/testosterone-replacement`)
- [x] Treatment: Testosterone Boosters (`/treatments/testosterone-boosters`)
- [x] Treatment: Sexual Wellness (`/treatments/sexual-wellness`)
- [x] Treatment: Hair Loss (`/treatments/hair`)
- [x] Treatment: Peptide Therapy (`/treatments/peptide-therapy`)
- [x] Treatment: Nutrient Therapy (`/treatments/nutrient-therapy`)
- [x] Treatment: Longevity (`/treatments/longevity`)

### Patient Consultation Journey (7 pages)
- [x] Consultation landing (`/consultation`)
- [x] Step 1: Personal info (`/consultation/intake`)
- [x] Step 2: Medical history with PDF upload (`/consultation/medical-history`)
- [x] Step 3: Review & submit (`/consultation/review`)
- [x] Success confirmation (`/consultation/success`)
- [x] Provider recommendations view (`/consultation/recommendation/[id]`)
- [x] Email confirmation (Resend integration)

**PDF Upload Features:**
- Accepts PDF lab results during medical history step
- Stores files in Supabase storage bucket
- URLs saved to `consultations.lab_files` array
- Provider can view uploaded PDFs in approval interface

### Provider Portal (8 pages)
- [x] Dashboard (`/provider`)
- [x] Consultation approval (`/provider/approve/[id]`)
  - **Dual-Path Workflow:**
    - "Review Labs & Create Treatment" - Parses uploaded PDFs → Lab review
    - "Schedule Consultation Required" - For controlled medications
- [x] Lab review with AI analysis (`/provider/lab-review/[id]`)
  - Displays parsed biomarkers with traffic light indicators
  - AI interpretation button (Claude Sonnet 4)
  - Video call button (Zoom integration)
  - Provider notes section
  - Treatment plan workspace
- [x] Patient list (`/provider/patients`)
- [x] Patient detail (`/provider/patients/[id]`)
- [x] Lab management (`/provider/labs`)
- [x] Schedule view (`/provider/schedule`)
- [x] Clerk authentication required

### Admin Portal (5 pages)
- [x] Dashboard (`/admin`)
- [x] Upload lab results (`/admin/upload-labs`)
  - Manual PDF upload for patients
  - Automatic Quest PDF parsing
  - Review parsed data before saving
- [x] Patient management (`/admin/patients`)
- [x] Patient detail view (`/admin/patients/[id]`)
- [x] Test admin page (`/test-admin`)

### Patient Portal (4 pages)
- [x] Login (`/patient/login`)
- [x] Signup (`/patient/signup`)
  - Links from consultation approval email
  - Creates account + processes payment
- [x] Dashboard (`/patient/dashboard`)
- [x] Lab results view (`/patient/results`)

### Payment Integration
- [x] Stripe checkout creation API (`/api/stripe/create-checkout`)
- [x] Payment verification API (`/api/stripe/verify-payment`)
- [x] Session handling
- [x] Success/cancel redirects
- [x] Email notifications after payment

### Lab Processing System
- [x] Quest Diagnostics PDF parser (`lib/parsers/lab-pdf-parser.ts`)
  - Extracts patient name, DOB, test date
  - Parses 60+ biomarkers with values, units, ranges
  - Handles high/low flags
  - Maps common unit types
- [x] Parse API endpoint (`/api/admin/parse-lab-pdf`)
- [x] Upload PDF to storage (`/api/admin/upload-pdf`)
- [x] Save lab results API (`/api/admin/lab-results`)
- [x] Provider parse uploaded labs (`/api/provider/parse-uploaded-labs/[consultationId]`)

### AI Clinical Analysis
- [x] Anthropic Claude Sonnet 4 integration
- [x] Analysis API (`/api/analyze-labs`)
- [x] Provider interface button
- [x] Comprehensive clinical interpretation
- [x] Treatment recommendations
- [x] Risk assessment

---

## 📁 FILE STRUCTURE & ORGANIZATION {#file-structure}

### Key Directories
```
adonis-platform/
├── app/
│   ├── (auth)/                     # Clerk auth group
│   │   ├── sign-in/[[...sign-in]]/
│   │   └── sign-up/[[...sign-up]]/
│   ├── admin/                      # Admin portal
│   │   ├── page.tsx
│   │   ├── upload-labs/
│   │   └── patients/
│   ├── api/                        # API routes
│   │   ├── admin/
│   │   │   ├── lab-results/
│   │   │   ├── parse-lab-pdf/
│   │   │   └── upload-pdf/
│   │   ├── consultations/
│   │   │   ├── route.ts           # GET all
│   │   │   ├── submit/route.ts    # POST create
│   │   │   └── [id]/
│   │   │       ├── route.ts       # GET/PATCH single
│   │   │       └── approve/route.ts
│   │   ├── provider/
│   │   │   └── parse-uploaded-labs/[consultationId]/
│   │   ├── patient/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── results/
│   │   ├── stripe/
│   │   │   ├── create-checkout/
│   │   │   └── verify-payment/
│   │   ├── lab-panels/
│   │   └── analyze-labs/
│   ├── consultation/              # Patient intake
│   │   ├── intake/
│   │   ├── medical-history/
│   │   ├── review/
│   │   ├── success/
│   │   └── recommendation/[id]/
│   ├── patient/                   # Patient portal
│   │   ├── login/
│   │   ├── signup/
│   │   ├── dashboard/
│   │   └── results/
│   ├── provider/                  # Provider portal
│   │   ├── page.tsx
│   │   ├── approve/[id]/
│   │   ├── lab-review/[id]/
│   │   ├── patients/
│   │   └── schedule/
│   ├── treatments/                # Marketing pages
│   ├── layout.tsx
│   └── page.tsx
├── components/                    # Shared components
│   └── ui/
├── lib/                          # Utilities
│   ├── supabase.ts              # DB client
│   ├── stripe.ts                # Payment client
│   ├── brand.ts                 # Branding config
│   ├── auth.ts                  # Patient auth
│   ├── parsers/
│   │   └── lab-pdf-parser.ts   # Quest PDF parser
│   ├── emails/
│   │   └── consultation-submitted.tsx
│   └── pdf/
│       └── generate-requisition.ts
├── middleware.ts                 # Clerk + password protection
├── .env.local                   # Local environment
└── package.json
```

---

## 🚀 RECENT WORK (November 19, 2025) {#recent-work}

### Session Summary
**Duration:** 4+ hours  
**Focus:** Provider workflow optimization, PDF parsing integration, email fixes

### Completed Features

1. **Fixed Consultation Email Flow**
   - **Issue:** Emails weren't sending after patient submission
   - **Root Cause:** Review page called `/api/consultations` instead of `/api/consultations/submit`
   - **Fix:** Updated endpoint URL in `app/consultation/review/page.tsx`
   - **Result:** Confirmation emails now send immediately after submission

2. **Redesigned Confirmation Email Template**
   - **Previous:** Ugly, cramped, poor rendering in email clients
   - **New:** Professional black/gold design with table-based layout
   - **Features:** 
     - Email client compatible (no flexbox/grid)
     - Numbered steps with styled boxes
     - Clean consultation details section
     - Mobile responsive
   - **File:** `lib/emails/consultation-submitted.tsx`

3. **Added Missing Form Fields to Database**
   - **Fields Added:**
     - `lab_files` - Array of uploaded PDF URLs
     - `current_supplements` - Patient's supplement list
   - **Impact:** Provider can now see all uploaded lab PDFs in approval interface

4. **Built Provider Dual-Path Workflow**
   - **Problem:** Providers needed option to schedule consultation OR go straight to treatment
   - **Solution:** Two buttons in approval interface:
     - 🔬 "Review Labs & Create Treatment" - For non-controlled interventions
     - 📅 "Schedule Consultation Required" - For controlled medications/complex cases
   - **Implementation:**
     - Created `/api/provider/parse-uploaded-labs/[consultationId]` endpoint
     - Automatically fetches PDFs from `lab_files` array
     - Parses Quest PDFs using existing parser
     - Creates `lab_results` record with parsed biomarkers
     - Redirects to `/provider/lab-review/[id]` for AI analysis

5. **Integrated Zoom Video Calls**
   - **Feature:** "Start Video Call" button on lab review page
   - **Link:** https://10xhealthsystem.zoom.us/j/5359639689
   - **Behavior:** Opens in new tab, provider can alt-tab for documentation
   - **Location:** Between "AI Interpret" and "Save" buttons

6. **Fixed Build-Time Environment Variable Errors**
   - **Issue:** Stripe and Supabase clients throwing errors during Vercel builds
   - **Root Cause:** Using `!` assertions on `process.env` at module top level
   - **Fix:** 
     - Changed Stripe to lazy initialization with Proxy
     - Moved Supabase client checks inside handler functions
     - Replaced `process.env.X!` with `process.env.X || ''`
   - **Files Modified:**
     - `lib/stripe.ts`
     - `app/api/admin/lab-results/route.ts`
     - `app/api/admin/lab-results/list/route.ts`

7. **Visual Design Improvements**
   - **Removed:** Red translucent background on high biomarkers
   - **Kept:** Red "High" badge and pulsing alert icon
   - **Reason:** Too visually overwhelming, reduced signal-to-noise ratio

### Critical Bugs Fixed

1. **PDF Parsing 405 Error**
   - Missing API route directory structure
   - Created `/api/provider/parse-uploaded-labs/[consultationId]/`

2. **Database Schema Mismatch**
   - API tried to insert `lab_name`, `patient_id`, `status` fields
   - Actual schema uses `panel_name`, `user_id`, no status field
   - Updated insert statements to match schema

3. **JSX Syntax Errors**
   - Missing `<a` tags in file upload display
   - Fixed multiple occurrences across pages

### Testing Results
- ✅ End-to-end patient submission with PDF upload
- ✅ Email confirmation delivery
- ✅ Provider can view uploaded PDFs
- ✅ Automatic PDF parsing (60 biomarkers extracted successfully)
- ✅ Lab results created in database
- ✅ Redirection to lab review page
- ✅ Video call button functional
- ✅ AI interpretation working
- ✅ Vercel deployment successful

### Commits & Backups
```bash
# Backup tags created
v1.1-20251119_104530  # Lab files + confirmation emails working
v1.2-20251119_112320  # Lab files saved to database
v1.3-20251119_185320  # Video integration + provider workflow complete
```

---

## 👤 RYAN'S PREFERENCES & COMMUNICATION STYLE {#ryan-preferences}

### Communication Preferences
- **Style:** Direct, action-oriented, no-BS
- **Code:** Complete working implementations, not snippets
- **Explanations:** Brief summaries, not extensive postambles
- **Workflow:** Terminal-first, command-line heavy
- **Documentation:** Comprehensive but action-focused

### Development Patterns
- **Backups:** Systematic with timestamped branches and git tags
- **Testing:** Production environment testing, pragmatic over perfect
- **Problem-Solving:** Methodical, root-cause analysis
- **Handoffs:** Detailed context preservation for seamless pickup

### Technical Preferences
- **Framework:** Next.js 15 (latest stable)
- **Language:** TypeScript (strict mode)
- **Database:** Supabase PostgreSQL
- **Deployment:** Vercel (auto-deploy from main)
- **Styling:** Tailwind CSS, glassmorphism aesthetic
- **No Over-Engineering:** Ship working code, iterate later

### Working Environment
- **Primary:** Mac Studio (Miami office)
- **Secondary:** MacBook (mobile)
- **Location:** Miami, Florida, USA
- **Timezone:** EST/EDT

### Project Management Style
- Questions state of features: "What's working? What's broken?"
- Values incremental progress over perfection
- Appreciates honest assessment of technical debt
- Wants clear next steps, not philosophical discussions

---

## ⚠️ KNOWN ISSUES & TECHNICAL DEBT {#known-issues}

### Critical Gaps (Blocking Launch)
1. **PDF Requisition Generation**
   - **Status:** Not implemented
   - **Required:** After payment, generate Quest Diagnostics requisition PDF
   - **Complexity:** High - needs proper PDF generation library
   - **Blocker:** Patients can't get lab orders

2. **Scheduling System**
   - **Status:** Button exists, functionality incomplete
   - **Required:** Cal.com or Calendly integration
   - **Action:** Provider clicks "Schedule Consultation" → patient gets booking link
   - **Priority:** Medium

3. **Provider Approval API Refinements**
   - **Issue:** Data format inconsistencies when recommending labs
   - **Impact:** Some edge cases fail silently
   - **Priority:** High

### High-Priority Issues
4. **Supabase RLS Disabled**
   - **Risk:** Database wide open, no row-level security
   - **Action Needed:** Enable RLS policies before production
   - **Files to Secure:** consultations, lab_results, patients

5. **Clerk Development Keys in Production**
   - **Risk:** Using dev instance keys on live site
   - **Action Needed:** Create production Clerk instance
   - **Impact:** Auth may behave unexpectedly

6. **No Patient Data Encryption**
   - **Risk:** PHI stored in plaintext (HIPAA violation)
   - **Action Needed:** Encrypt sensitive fields (medical history, etc.)
   - **Priority:** Critical before any real patients

7. **Email Domain Not Verified**
   - **Current:** Sending from Resend's domain
   - **Needed:** Verify getadonishealth.com with Resend
   - **Impact:** Better deliverability, professional appearance

### Medium-Priority Technical Debt
8. **LabCorp Support Missing**
   - **Current:** Only Quest Diagnostics PDFs parse
   - **Needed:** LabCorp parser
   - **Complexity:** Medium - different PDF format

9. **No Error Monitoring**
   - **Missing:** Sentry or similar error tracking
   - **Impact:** Production errors go unnoticed
   - **Action:** Add Sentry SDK

10. **Incomplete Test Coverage**
    - **Current:** Manual testing only
    - **Needed:** Unit tests for critical paths (payment, PDF parsing, auth)
    - **Tool:** Jest + React Testing Library

11. **Hardcoded Configuration**
    - **Issue:** Many values hardcoded (Zoom URL, email templates, etc.)
    - **Better:** Move to database or config files
    - **Priority:** Low

12. **No Logging Infrastructure**
    - **Current:** console.log only
    - **Better:** Structured logging with LogDNA/Datadog
    - **Priority:** Medium

### Low-Priority / Nice-to-Have
13. **Mobile App:** Not planned yet
14. **SMS Notifications:** Resend supports, not implemented
15. **Multi-Language:** English only
16. **Dark Mode Toggle:** Always dark currently
17. **PDF Download from Portal:** Patients can't download past requisitions
18. **Treatment Tracking:** No way to track if patient started treatment

### Code Smells
- Environment variable assertions scattered across files (mostly fixed)
- Some API routes lack proper error handling
- Inconsistent loading states across pages
- Magic numbers in styles (spacing, colors)
- Duplicate Supabase client creation patterns

---

## 🗺️ NEXT STEPS & ROADMAP {#next-steps}

### Immediate (This Week)
1. **Visual Design Refinement**
   - Lab review page improvements per feedback:
     - Reduce gold/yellow usage (visual fatigue)
     - Increase spacing between biomarker cards
     - Make critical values 50% larger font
     - Subtle reference range boxes (currently too prominent)
     - Add card backgrounds for better separation
     - Improve visual hierarchy

2. **PDF Requisition Generation**
   - Research serverless-compatible PDF libraries
   - Design requisition template matching Quest format
   - Implement `/api/generate-requisition/[orderId]`
   - Test with Quest Diagnostics
   - Add download button to patient portal

3. **Scheduling Integration**
   - Choose platform (Cal.com recommended)
   - Set up account and API keys
   - Implement "Schedule Consultation" button logic
   - Send email with booking link
   - Test end-to-end booking flow

### Short-Term (Next 2 Weeks)
4. **Security Hardening**
   - Enable Supabase RLS policies
   - Encrypt sensitive patient data fields
   - Create production Clerk instance
   - Add rate limiting to API routes
   - Security audit of authentication flows

5. **LabCorp PDF Parser**
   - Obtain sample LabCorp PDFs
   - Build parser similar to Quest version
   - Add to upload interface dropdown
   - Test with real patient PDFs

6. **Email Domain Verification**
   - Add DNS records to getadonishealth.com
   - Verify domain in Resend dashboard
   - Update all email templates to use custom domain

7. **Error Monitoring**
   - Add Sentry SDK
   - Configure error reporting
   - Set up alerting for critical errors
   - Create error dashboard

### Medium-Term (Next Month)
8. **Treatment Protocols Feature**
   - Design treatment plan UI
   - Build provider interface for prescribing
   - E-prescribe integration research (PillPack, Alto, etc.)
   - Patient treatment dashboard
   - Refill management

9. **Provider Analytics Dashboard**
   - Patients reviewed per day
   - Average analysis time
   - Revenue per provider
   - Treatment outcomes tracking

10. **Patient Portal Enhancements**
    - Treatment progress tracking
    - Symptom logging
    - Before/after photos (secure upload)
    - Messaging with provider
    - Appointment history

11. **Marketing Website SEO**
    - Meta tags optimization
    - Blog content creation
    - Backlink strategy
    - Local SEO for Miami

### Long-Term (Next Quarter)
12. **Mobile App** (React Native or Flutter)
13. **Advanced AI Features**
    - Predictive health modeling
    - Personalized supplement recommendations
    - Treatment optimization algorithms
14. **Insurance Integration**
    - HSA/FSA payment support
    - Insurance verification
    - Claims submission
15. **Telemedicine Network**
    - Multi-provider support
    - Provider scheduling system
    - Provider onboarding workflow

---

## 🔐 ENVIRONMENT CONFIGURATION {#environment-config}

### Required Environment Variables

#### Production (Vercel)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ytsjwgjpbvnulcvshedd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon_key]
SUPABASE_SERVICE_ROLE_KEY=[service_role_key]

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[clerk_publishable_key]
CLERK_SECRET_KEY=[clerk_secret_key]
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[stripe_pk]
STRIPE_SECRET_KEY=[stripe_sk]

# Resend Email
RESEND_API_KEY=re_cewxRP1F_P76JTCQQwZNqaTcXKFdqvoeC

# Anthropic AI
ANTHROPIC_API_KEY=[anthropic_key]

# App Configuration
NEXT_PUBLIC_BASE_URL=https://www.getadonishealth.com
NEXT_PUBLIC_ZOOM_MEETING_URL=https://10xhealthsystem.zoom.us/j/5359639689

# Security
PASSWORD_PROTECTION_ENABLED=false  # Disable for production
ADMIN_PASSWORD=[admin_pass]  # Only if password protection enabled
```

#### Local Development (.env.local)
```env
# Same as production, but with test/dev keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[test_key]
STRIPE_SECRET_KEY=[test_secret]
NEXT_PUBLIC_BASE_URL=http://localhost:3000
PASSWORD_PROTECTION_ENABLED=true  # Optional for local
```

### Supabase Storage Buckets
```
lab-uploads/
├── [consultation-id]/
│   └── [timestamp]-[filename].pdf
```
**Policies:** Public read, authenticated upload

---

## 🚀 DEPLOYMENT PROCESS {#deployment}

### Vercel Auto-Deployment
1. Push to `main` branch triggers automatic deployment
2. Build time: ~3-5 minutes
3. Deployment URL: https://adonis-platform.vercel.app
4. Production domain: https://www.getadonishealth.com

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# View logs
vercel logs [deployment-url]
```

### Build Process
```bash
# Next.js build
npm run build

# Output
.next/
├── server/        # API routes & server components
├── static/        # Static assets
└── standalone/    # Optimized production bundle
```

### Common Build Issues
1. **Environment variable not set** - Check Vercel dashboard
2. **TypeScript errors** - Fix before pushing
3. **Supabase connection timeout** - Check service status
4. **Stripe key invalid** - Verify test vs production keys

### Rollback Process
```bash
# List recent deployments
vercel ls

# Promote previous deployment
vercel promote [deployment-url]
```

---

## 💻 KEY CODE PATTERNS {#code-patterns}

### API Route Pattern
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    // Runtime environment check
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Create client inside function (not at module level)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const body = await req.json()
    
    // Business logic
    const { data, error } = await supabase
      .from('table_name')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

### Client-Side Data Fetching
```typescript
'use client'
import { useState, useEffect } from 'react'

export default function Page() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/endpoint')
        if (!response.ok) throw new Error('Failed to fetch')
        const json = await response.json()
        setData(json)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return <div>{/* Render data */}</div>
}
```

### Dynamic Route Parameters (Next.js 15)
```typescript
export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params
  const id = resolvedParams.id
  
  // Use id for data fetching
}
```

### Branding System
```typescript
import { getBrand } from '@/lib/brand'

export default function Component() {
  const brand = getBrand()
  
  return (
    <div style={{ backgroundColor: brand.colors.primary }}>
      <h1>{brand.name}</h1>
    </div>
  )
}
```

### PDF Parsing
```typescript
import { parseQuestPDF } from '@/lib/parsers/lab-pdf-parser'

const buffer = Buffer.from(await file.arrayBuffer())
const result = await parseQuestPDF(buffer)

// result = {
//   patientName: string,
//   patientDOB: string,
//   testDate: string,
//   biomarkers: Array<{
//     biomarker: string,
//     value: string,
//     unit: string,
//     referenceRange: string,
//     status: 'normal' | 'high' | 'low'
//   }>
// }
```

---

## 📞 IMPORTANT CONTACTS & LINKS

### Production URLs
- **Main Site:** https://www.getadonishealth.com
- **Vercel Dashboard:** https://vercel.com/rajbrades/adonis-platform
- **Supabase Dashboard:** https://supabase.com/dashboard/project/ytsjwgjpbvnulcvshedd
- **Clerk Dashboard:** https://dashboard.clerk.com

### Repository
- **GitHub:** https://github.com/rajbrades/adonis-platform
- **Main Branch:** `main`
- **Backups:** Tagged with `v1.x-YYYYMMDD_HHMMSS`

### Services
- **Email Support:** support@getadonishealth.com
- **Provider Email:** noreply@getadonishealth.com
- **Zoom Room:** https://10xhealthsystem.zoom.us/j/5359639689

---

## 📝 APPENDIX: CRITICAL TECHNICAL NOTES

### Why Next.js 15?
- Latest stable version with App Router
- Server Components for better performance
- Edge runtime support
- Improved developer experience

### Why Supabase?
- PostgreSQL with real-time capabilities
- Built-in auth (not using, but available)
- Storage for PDF uploads
- Generous free tier
- Automatic backups

### Why Clerk for Admin Auth?
- Drop-in authentication
- User management dashboard
- Social login support
- Middleware integration
- Better than rolling custom

### Why Custom Patient Auth?
- Simpler signup flow (name + DOB + password)
- No email verification required
- Faster conversion
- bcrypt for security

### Why Stripe?
- Industry standard
- Excellent documentation
- Subscriptions-ready
- PCI compliant
- Easy testing

### Why Resend?
- Modern email API
- Better deliverability than SendGrid
- Generous free tier
- React email templates
- Simple integration

### Why Anthropic Claude?
- State-of-the-art clinical reasoning
- Long context window (200K tokens)
- Structured output
- HIPAA-compliant (Business tier)
- Better than GPT-4 for medical analysis

---

## 🎯 SUCCESS METRICS

### MVP Launch Criteria
- [ ] 100% completion of patient journey (submission → payment → lab order)
- [ ] PDF requisition generation working
- [ ] Provider can complete consultation end-to-end in <20 minutes
- [ ] AI analysis saves 10+ minutes per patient
- [ ] Email deliverability >95%
- [ ] Payment success rate >98%
- [ ] Zero critical security vulnerabilities
- [ ] HIPAA compliance audit passed
- [ ] 5 beta patients successfully complete journey

### Business Metrics (Post-Launch)
- **Acquisition:** 100 consultations/month
- **Conversion:** 40% consultation → payment
- **Retention:** 60% patients reorder labs in 6 months
- **Provider Efficiency:** 15 patients/day per provider
- **Customer Satisfaction:** NPS >50

---

## 🏁 FINAL NOTES

This document represents the complete state of the ADONIS Health platform as of November 19, 2025. All code is in the `main` branch of the GitHub repository, deployed to Vercel, and accessible at the production URL.

**Current Status:** ~75% complete, production-ready with critical gaps.

**Next Session Goal:** Visual design refinements to lab review page, then tackle PDF requisition generation.

**Key Reminder:** Always backup before major changes. Ryan values systematic branching and tagging for easy rollback.

---

*Document created by Claude (Anthropic) based on extensive conversation history with Ryan Brady.*
*Last updated: November 19, 2025 7:30 PM EST*
