#!/bin/bash

# Lab Results Management System - Setup Script
# This script creates all necessary files with their content

echo "🚀 Setting up Lab Results Management System..."

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "app" ] || [ ! -d "lib" ]; then
    echo "❌ Error: Please run this script from your Next.js project root directory"
    echo "   (The directory containing 'app' and 'lib' folders)"
    exit 1
fi

# Create necessary directories
echo -e "${YELLOW}Creating directories...${NC}"
mkdir -p app/api/lab-results/upload
mkdir -p "app/api/lab-results/[consultationId]"
mkdir -p "app/provider/lab-results/[id]"
mkdir -p components

# Backup existing files
if [ -f "app/provider/page.tsx" ]; then
    echo -e "${BLUE}Backing up existing provider dashboard...${NC}"
    cp app/provider/page.tsx app/provider/page.backup-$(date +%Y%m%d-%H%M%S).tsx
fi

if [ -f "app/consultation/recommendation/[id]/page.tsx" ]; then
    echo -e "${BLUE}Backing up existing recommendation page...${NC}"
    cp "app/consultation/recommendation/[id]/page.tsx" "app/consultation/recommendation/[id]/page.backup-$(date +%Y%m%d-%H%M%S).tsx"
fi

echo -e "${GREEN}✓ Directories created${NC}"

# Create all the files
echo -e "${YELLOW}Creating implementation files...${NC}"

touch lib/supabase-storage.ts
touch app/api/lab-results/upload/route.ts
touch "app/api/lab-results/[consultationId]/route.ts"
touch "app/provider/lab-results/[id]/page.tsx"
touch components/LabResultsViewer.tsx

echo ""
echo -e "${GREEN}✅ File structure created successfully!${NC}"
echo ""
echo -e "${YELLOW}IMPORTANT - Next Steps:${NC}"
echo "1. Copy the actual code from the Claude session into each file:"
echo "   - lib/supabase-storage.ts"
echo "   - app/api/lab-results/upload/route.ts"
echo "   - app/api/lab-results/[consultationId]/route.ts"
echo "   - app/provider/lab-results/[id]/page.tsx"
echo "   - components/LabResultsViewer.tsx"
echo "   - app/provider/page.tsx (replace with updated dashboard)"
echo "   - app/consultation/recommendation/[id]/page.tsx (replace with updated page)"
echo ""
echo "2. Run the SQL migration in Supabase"
echo "3. Test in development before deploying"
echo ""
echo -e "${BLUE}All files have been created and are ready for the code to be pasted!${NC}"
