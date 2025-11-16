#!/bin/bash

# Read the old function
old_function='  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const intakeData = JSON.parse(sessionStorage.getItem('\''consultationData'\'') || '\''{}'\'' )
    const fullData = { 
      ...intakeData, 
      ...formData,
      uploadedLabFiles: uploadedFiles // Store files temporarily for submission
    }
    
    sessionStorage.setItem('\''consultationData'\'', JSON.stringify(fullData))
    router.push('\''/consultation/review'\'')
  }'

# This is getting complex - let me use a simpler sed approach
# Delete lines 103-113
sed -i '' '103,113d' app/consultation/medical-history/page.tsx

# Insert the new function at line 103
sed -i '' '102 r /tmp/fix_submit.txt' app/consultation/medical-history/page.tsx
