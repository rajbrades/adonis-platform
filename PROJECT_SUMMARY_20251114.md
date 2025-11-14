# ADONIS Platform - Complete Project Summary
**Last Updated:** November 14, 2025
**Developer:** Ryan Brady (CEO/Founder)
**Location:** Miami, Florida

---

## PROJECT OVERVIEW

**ADONIS Health** is a comprehensive men's health telemedicine platform focused on hormone optimization and executive wellness, targeting high-performing executives aged 30-60. The platform provides AI-powered clinical analysis, automated biomarker tracking, and comprehensive provider/patient portals.

**Sister Platform (Planned):** ATHENA Health (women's health, purple branding)

---

## TECHNOLOGY STACK

### Core Framework
- **Frontend:** Next.js 15.5.4 (App Router) + TypeScript + React
- **Styling:** Tailwind CSS v4 with custom brand colors
- **Deployment:** Vercel (production: getadonishealth.com)
- **Version Control:** GitHub (rajbrades/adonis-platform)

### Backend & Services
- **Database:** Supabase (PostgreSQL)
- **Authentication:** 
  - Clerk (admin/providers)
  - Custom auth (patients) with bcrypt
- **Payments:** Stripe (test mode active)
- **Email:** Resend API (noreply@getadonishealth.com)
- **AI:** Anthropic Claude Sonnet 4 for clinical analysis
- **PDF Parsing:** Quest Diagnostics results (69+ biomarkers)

### Development Environment
- **Primary:** Mac Studio
- **Secondary:** MacBook
- **Backup System:** ~/ADONIS-Backups/ (automated daily backups)
- **Backup Script:** Runs at 2 AM daily via crontab

---

## BRAND IDENTITY

### ADONIS (Current Focus)
- **Primary Color:** #FCD34D (yellow/gold)
- **Accent Gradient:** from-yellow-400 to-yellow-600
- **Theme:** Black backgrounds with yellow accents
- **Design:** Glassmorphism aesthetic
- **Target:** Men's hormone optimization

### ATHENA (Planned)
- **Primary Color:** Purple
- **Target:** Women's health optimization

---

## DATABASE SCHEMA (Supabase)

### Key Tables

**consultations:**
- id (UUID, primary key)
- email, first_name, last_name, phone
- date_of_birth
- status: 'pending' | 'approved' | 'rejected'
- provider_notes (TEXT)
- recommended_labs (JSONB) - Array of lab panel objects
- reviewed_by, reviewed_at
- patient_id (UUID, FK to patients, ON DELETE SET NULL)
- payment_status: 'paid' | NULL
- payment_date, stripe_payment_id, stripe_session_id
- requisition_pdf_url (TEXT) - for future PDF storage
- created_at, updated_at

**patients:**
- id (UUID, primary key)
- full_name (TEXT, NOT NULL)
- name (TEXT, NOT NULL) - duplicate for compatibility
- email (TEXT, UNIQUE, NOT NULL)
- phone (TEXT)
- date_of_birth (TEXT)
- password_hash (TEXT, NOT NULL)
- last_login (TIMESTAMP)
- created_at (TIMESTAMP)

**Storage Buckets:**
- requisitions (private) - for lab requisition PDFs

---

## PATIENT JOURNEY (COMPLETE FLOW)

### Current Working Flow (75% Complete)

1. **Consultation Submission** ✅
   - Public consultation form at /consultation
   - Multi-step intake (medical history, goals, symptoms)
   - Data stored in `consultations` table

2. **Provider Review** ✅
   - Provider portal at /provider
   - Review consultation details
   - Recommend lab panels (Essential/Comprehensive/Elite)
   - Add provider notes
   - API: POST /api/consultations/[id]/approve

3. **Approval Email** ✅
   - Sent via Resend
   - Shows recommended panels with prices
   - Button: "Create Account & Complete Order"
   - Links to: /patient/signup?consultation={id}

4. **Patient Account Creation** ✅
   - Form: name, DOB, email, phone, password
   - Creates record in `patients` table
   - Links patient to consultation via patient_id
   - API: POST /api/patient/signup

5. **Patient Login** ✅
   - Credentials: name + DOB + password
   - Session stored in sessionStorage
   - API: POST /api/patient/login
   - Accessible from header "Patient Login" link

6. **Checkout Page** ✅
   - Route: /checkout/[consultationId]
   - Shows provider recommendation with context
   - Displays full lab panel features
   - Trust signals, testimonials, guarantees
   - Maps panel names to Stripe slugs

7. **Stripe Payment** ✅
   - Test mode active
   - Test card: 4242 4242 4242 4242
   - Creates Stripe Checkout session
   - Success URL: /payment/success?session_id={id}
   - API: POST /api/stripe/create-checkout

8. **Payment Verification** ✅
   - Verifies Stripe payment
   - Updates consultation: payment_status='paid'
   - Sends confirmation email with portal link
   - API: POST /api/stripe/verify-payment

9. **Patient Portal** ✅
   - Route: /patient
   - Shows requisition download (when PDF ready)
   - Dashboard with activity
   - Coming soon: lab results, appointments

10. **PDF Requisition** ⏳ PENDING
    - Generation blocked by serverless environment
    - Needs alternative PDF solution
    - Currently skipped to allow payment flow

---

## TODAY'S ACCOMPLISHMENTS (Nov 14, 2025)

### Critical Gaps Resolved

**Gap #1: Recommendation Button Not Wired** ✅
- **Issue:** Button on /consultation/recommendation/[id] wasn't linked
- **Solution:** Added Link wrapper to checkout page
- **Files:** app/consultation/recommendation/[id]/page.tsx

**Gap #3: Provider Approval API Data Mismatch** ✅
- **Issue:** Frontend sent {recommendedLabs, providerNotes, providerName} but API expected different format
- **Solution:** Updated API to match frontend data structure
- **Files:** app/api/consultations/[id]/approve/route.ts

### Major Features Implemented

**1. Complete Checkout Page Redesign** ✅
- Provider personalization header with name & consultation date
- Provider notes displayed prominently
- Full biomarker list for selected panel
- "What You'll Discover" benefits section
- Timeline of next steps
- Trust signals (HIPAA, Quest, Licensed MDs)
- Social proof testimonial
- Money-back guarantee
- Professional sidebar layout
- Mobile responsive
- **Files:** app/checkout/[consultationId]/page.tsx

**2. Patient Authentication System** ✅
- Signup flow with consultation linking
- Login with name + DOB + password authentication
- Session management via sessionStorage
- Password hashing with bcrypt
- **Files:** 
  - app/patient/signup/page.tsx
  - app/patient/login/page.tsx
  - app/api/patient/signup/route.ts
  - app/api/patient/login/route.ts

**3. Database Schema Updates** ✅
- Added `name` and `phone` columns to patients table
- Added `patient_id` to consultations (FK with ON DELETE SET NULL)
- Fixed foreign key constraints for safe deletions
- **SQL executed in Supabase**

**4. Navigation Enhancement** ✅
- Added "Patient Login" link with user icon to main header
- Visible on desktop and mobile
- **Files:** app/components/Navigation.tsx

**5. Brand Color Consistency** ✅
- Set all yellow to #FCD34D via Tailwind CSS variables
- Updated app/globals.css with custom color overrides
- Consistent yellow across entire site
- **Files:** app/globals.css, tailwind.config.ts

**6. Email Templates** ✅
- Updated approval email with panel details and pricing
- Payment confirmation email with portal link
- Professional HTML formatting
- **Files:** 
  - app/api/consultations/[id]/approve/route.ts
  - app/api/stripe/verify-payment/route.ts

**7. Middleware Improvements** ✅
- Fixed password protection redirect flow
- Preserves original URL after password entry
- Removed deprecated Clerk options
- **Files:** middleware.ts

---

## STRIPE INTEGRATION

### Lab Panels (lib/lab-panels.ts)
```typescript
{
  essential: {
    name: 'Essential Panel',
    price: 29900, // $299 in cents
    features: [...]
  },
  comprehensive: {
    name: 'Comprehensive Panel', 
    price: 49900, // $499
    features: [...]
  },
  elite: {
    name: 'Elite Panel',
    price: 79900, // $799
    features: [...]
  }
}
```

### Panel Name Mapping
- "Complete Panel" → maps to "comprehensive" slug
- Provider can select any panel name, checkout page maps to Stripe slug

### Test Mode
- Currently in TEST mode
- Test card: 4242 4242 4242 4242
- All payments are test transactions

---

## KNOWN ISSUES & NEXT STEPS

### Critical Issue: PDF Generation ⚠️
**Problem:** PDFKit library doesn't work in Vercel serverless environment
**Current Status:** PDF generation disabled, payment flow works
**Options:**
1. Use serverless-friendly library (pdf-lib, jsPDF)
2. Generate PDFs via external service (Puppeteer Cloud, DocRaptor)
3. Use Vercel Edge Functions
4. Pre-generate templates and fill with data

**Priority:** HIGH - This is Gap #2, the last piece for complete flow

### Minor Issues
- Password middleware uses Tailwind v4 syntax
- Some consultation fields may not have proper defaults
- Patient dashboard shows mock "Coming Soon" cards

### Future Enhancements (Lower Priority)
- Lab results upload and AI analysis
- Appointment scheduling
- Treatment protocols
- Provider dashboard improvements
- Multi-panel selection in checkout
- HSA/FSA payment integration
- Email verification for patients
- SMS notifications

---

## DEVELOPER PREFERENCES & STYLE

### Communication
- **Style:** Direct, action-oriented, minimal explanation
- **Code Delivery:** Complete working code, no snippets
- **Avoid:** 
  - Echo statements in bash
  - Excessive postambles
  - Bullet points unless explicitly requested
  - Overly descriptive explanations

### Development Workflow
- Terminal-first workflows
- Git operations preferred
- Tests in production (rapid iteration)
- Prefers seeing files before making changes
- Mac-based development (zsh shell)

### Code Preferences
- Complete files, not partial edits
- TypeScript strict mode
- Tailwind CSS for styling
- No hardcoded colors (use Tailwind classes)
- Server-side rendering where possible
- Supabase for all database operations

---

## FILE STRUCTURE (Key Files)
```
adonis-platform/
├── app/
│   ├── components/
│   │   └── Navigation.tsx (main header)
│   ├── consultation/
│   │   ├── intake/ (step 1)
│   │   ├── medical-history/ (step 2)
│   │   ├── review/ (step 3)
│   │   ├── success/ (submitted)
│   │   └── recommendation/[id]/ (approved view)
│   ├── checkout/[consultationId]/ (payment page)
│   ├── patient/
│   │   ├── signup/ (account creation)
│   │   ├── login/ (authentication)
│   │   └── page.tsx (dashboard)
│   ├── provider/
│   │   ├── page.tsx (portal home)
│   │   └── approve/[id]/ (review consultation)
│   ├── payment/
│   │   └── success/ (post-payment)
│   ├── api/
│   │   ├── consultations/
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts (GET consultation)
│   │   │   │   └── approve/route.ts (POST approval)
│   │   │   └── submit/route.ts
│   │   ├── patient/
│   │   │   ├── signup/route.ts
│   │   │   ├── login/route.ts
│   │   │   └── consultations/route.ts
│   │   └── stripe/
│   │       ├── create-checkout/route.ts
│   │       └── verify-payment/route.ts
│   ├── globals.css (Tailwind + brand colors)
│   └── layout.tsx (root layout)
├── lib/
│   ├── supabase.ts (client)
│   ├── stripe.ts (stripe client)
│   ├── lab-panels.ts (product definitions)
│   ├── brand.ts (brand config)
│   └── tenant-config.ts (ADONIS/ATHENA switch)
├── middleware.ts (auth + password protection)
├── tailwind.config.ts
└── .env.local (secrets)
```

---

## ENVIRONMENT VARIABLES

Required in Vercel and .env.local:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend
RESEND_API_KEY=

# Clerk (for admin/providers)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Anthropic AI
ANTHROPIC_API_KEY=

# Site
NEXT_PUBLIC_BASE_URL=https://getadonishealth.com
SITE_PASSWORD=adonis2024
```

---

## DEPLOYMENT INFO

- **Platform:** Vercel
- **Production URL:** https://getadonishealth.com
- **Auto-deploy:** On push to main branch
- **Build Time:** ~45 seconds average
- **Cache:** Enabled, clears on new deploy

---

## TESTING CREDENTIALS & DATA

### Site Password
- Password: `adonis2024`
- Required for all pages

### Test Patient Flow
1. Submit consultation at /consultation
2. Approve via /provider portal
3. Create account from email link
4. Use Stripe test card: `4242 4242 4242 4242`
5. Login at /patient/login with signup credentials

### Database Cleanup
```sql
-- Delete all test patients
DELETE FROM patients;

-- Reset consultations
UPDATE consultations SET patient_id = NULL;
UPDATE consultations SET payment_status = NULL, requisition_pdf_url = NULL;
```

---

## GIT WORKFLOW

### Recent Commits (Last 20)
```bash
git log --oneline -20
```

### Common Commands Used
```bash
# Check status
git status
git log --oneline -5

# Make changes
git add .
git commit -m "feat: description"
git push origin main

# Check specific files
cat app/path/to/file.tsx
grep -r "search term" app/
```

---

## PROJECT STATUS: 75% COMPLETE

### ✅ Completed (Working)
- Complete consultation intake flow
- Provider review and approval system
- Patient account creation and authentication
- Checkout page with Stripe integration
- Payment processing
- Email notifications at key steps
- Patient portal (basic)
- Header navigation with patient login
- Brand consistency (#FCD34D yellow)
- Database schema fully designed
- Responsive design (mobile + desktop)

### ⏳ In Progress
- PDF requisition generation (blocked by serverless)

### 📋 Planned (Not Started)
- Lab results upload and parsing
- AI-powered analysis of biomarkers
- Treatment protocol recommendations
- Appointment scheduling
- Supplement shop
- Provider analytics
- Multi-language support

---

## CRITICAL CONTEXT FOR NEXT SESSION

### Immediate Priorities
1. **Fix PDF Generation** - This is the #1 blocker
   - Current approach (PDFKit) doesn't work serverless
   - Need alternative: pdf-lib, jsPDF, or external service
   - Goal: Generate Quest Diagnostics requisition with patient info

2. **Test Complete Flow End-to-End**
   - Once PDF works, test: consultation → approval → signup → payment → PDF download

### Code Patterns to Maintain
- Always use Tailwind yellow classes (yellow-400, yellow-500)
- Patient auth stored in sessionStorage (not localStorage)
- All API routes use async/await with try-catch
- Supabase client from @/lib/supabase
- Brand colors via getBrand() function

### Important Files to Check Before Changes
- app/globals.css (for color definitions)
- lib/lab-panels.ts (for panel data)
- middleware.ts (for auth/password logic)

### Testing Checklist After Changes
1. Hard refresh (Cmd+Shift+R) to clear cache
2. Check browser console for errors (F12)
3. Test on both desktop and mobile
4. Verify in Vercel deployment logs if issues
5. Check Supabase logs for database errors

---

## BACKUP LOCATIONS

- **Manual Backups:** ~/ADONIS-Backups/manual_backup_*
- **Automated Backups:** ~/ADONIS-Backups/backup.log
- **Backup Script:** ~/Development/adonis-platform/backup.sh
- **Schedule:** Daily at 2:00 AM via crontab

---

## ADDITIONAL NOTES

### Password Protection
- Site is password-protected (password: adonis2024)
- Middleware handles redirect to /password page
- Cookie "site-access=granted" after successful auth
- Preserves original URL in returnUrl parameter

### Tenant System
- Built for multi-brand (ADONIS + ATHENA)
- Currently only ADONIS active
- Switch via lib/tenant-config.ts
- ATHENA planned but not implemented

### Design Philosophy
- Premium, executive-focused aesthetic
- Glassmorphism with black backgrounds
- Yellow (#FCD34D) as accent color
- Minimal, clean interfaces
- Trust signals prominent (HIPAA, Quest, etc.)

---

**END OF SUMMARY**

This document should provide complete context for resuming development without hesitation. All critical information, preferences, and technical details are captured.
