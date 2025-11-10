#!/bin/bash

# Fix pages with py-12 -> pt-32 pb-12
sed -i '' 's/mx-auto px-6 py-12/mx-auto px-6 pt-32 pb-12/g' app/products/page.tsx
sed -i '' 's/mx-auto px-6 py-12/mx-auto px-6 pt-32 pb-12/g' app/consultation/medical-history/page.tsx
sed -i '' 's/mx-auto px-6 py-12/mx-auto px-6 pt-32 pb-12/g' app/consultation/success/page.tsx
sed -i '' 's/mx-auto px-6 py-12/mx-auto px-6 pt-32 pb-12/g' app/consultation/intake/page.tsx
sed -i '' 's/mx-auto px-6 py-12/mx-auto px-6 pt-32 pb-12/g' app/consultation/page.tsx
sed -i '' 's/mx-auto px-6 py-12/mx-auto px-6 pt-32 pb-12/g' app/provider/schedule/page.tsx
sed -i '' 's/mx-auto px-6 py-12/mx-auto px-6 pt-32 pb-12/g' app/patient/page.tsx

# Fix pages with py-16 -> pt-32 pb-16
sed -i '' 's/mx-auto px-6 py-16/mx-auto px-6 pt-32 pb-16/g' app/dashboard/debug-pdf/page.tsx
sed -i '' 's/mx-auto px-6 py-16/mx-auto px-6 pt-32 pb-16/g' app/patient/order-confirmation/page.tsx
sed -i '' 's/mx-auto px-6 py-16/mx-auto px-6 pt-32 pb-16/g' app/patient/cart/page.tsx

# Fix pages with py-8 -> pt-32 pb-8
sed -i '' 's/mx-auto px-6 py-8/mx-auto px-6 pt-32 pb-8/g' app/patient/results/demo/page.tsx

# Fix admin pages with p-8 -> pt-32 pb-8 px-8
sed -i '' 's/text-white p-8/text-white pt-32 pb-8 px-8/g' app/admin/results/upload/page.tsx
sed -i '' 's/text-white p-8/text-white pt-32 pb-8 px-8/g' app/admin/debug-pdf/page.tsx

# Fix pages that need pt-32 at container level
sed -i '' 's/to-black text-white">/to-black text-white pt-32">/g' app/admin/page.tsx
sed -i '' 's/to-black text-white">/to-black text-white pt-32">/g' app/dashboard/page.tsx
sed -i '' 's/to-black text-white">/to-black text-white pt-32">/g' app/dashboard/results/view/page.tsx
sed -i '' 's/to-black text-white">/to-black text-white pt-32">/g' app/patient/results/page.tsx
sed -i '' 's/to-black text-white">/to-black text-white pt-32">/g' app/consultation/review/page.tsx

# Fix treatment pages - add pt-32 to first section
for file in app/treatments/testosterone-boosters/page.tsx app/treatments/testosterone-replacement/page.tsx app/treatments/sexual-wellness/page.tsx app/treatments/hair/page.tsx; do
  if [ -f "$file" ]; then
    sed -i '' 's/<section className="py-16/<section className="pt-32 pb-16/g' "$file"
    sed -i '' 's/<section className="px-6 py-16/<section className="px-6 pt-32 pb-16/g' "$file"
  fi
done

# Fix blog page with py-32 -> pt-40 pb-32
sed -i '' 's/mx-auto px-6 py-32/mx-auto px-6 pt-40 pb-32/g' app/blog/page.tsx

# Fix blog slug page
sed -i '' 's/to-black text-white">/to-black text-white pt-32">/g' app/blog/[slug]/page.tsx

# Fix checkout page
sed -i '' 's/to-black text-white">/to-black text-white pt-32">/g' app/patient/checkout/page.tsx

# Fix dashboard results upload
sed -i '' 's/to-black text-white">/to-black text-white pt-32">/g' app/dashboard/results/upload/page.tsx

echo "✅ Fixed padding on all pages!"
