#!/usr/bin/env python3

import re
import os

def remove_header_from_file(filepath):
    """Remove the header block from a patient page"""
    if not os.path.exists(filepath):
        print(f"❌ {filepath} not found")
        return False
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Pattern to match the header block - more flexible
    # Matches from <header> to </header> including everything in between
    pattern = r'      <header className="bg-black/40 backdrop-blur-xl border-b border-(?:white|yellow-500)/(?:10|20)(?:\s+sticky top-0 z-50)?">\s*<nav[^>]*>.*?</nav>\s*</header>\s*\n'
    
    original = content
    content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"✅ Removed header from {filepath}")
        return True
    else:
        print(f"⚪ No header found in {filepath}")
        return False

def main():
    print("🔧 Removing duplicate headers from patient pages...\n")
    
    files = [
        'app/patient/login/page.tsx',
        'app/patient/signup/page.tsx',
        'app/patient/cart/page.tsx',
        'app/patient/checkout/page.tsx',
        'app/patient/results/page.tsx',
        'app/patient/order-confirmation/page.tsx'
    ]
    
    fixed = 0
    for f in files:
        if remove_header_from_file(f):
            fixed += 1
    
    print(f"\n✅ Fixed {fixed} files!")
    print("\n🚀 Now run 'npm run dev' and test!")

if __name__ == '__main__':
    main()
