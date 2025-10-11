#!/usr/bin/env python3

import re

def remove_header_block(filepath):
    """Remove standalone header blocks from patient pages"""
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Pattern to match header blocks
    pattern = r'\s*<header className="bg-black/40 backdrop-blur-xl border-b border-(?:white|yellow-500)/(?:10|20)(?:\s+sticky top-0 z-50)?">\s*<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">\s*<Link href="/" className="text-3xl font-black text-yellow-400">\s*ADONIS\s*</Link>\s*(?:<div className="text-white/60">[^<]*</div>\s*)?</div>\s*</header>\s*'
    
    # Count matches
    matches = re.findall(pattern, content, re.DOTALL)
    count = len(matches)
    
    if count > 0:
        # Remove all matches
        content = re.sub(pattern, '\n', content, flags=re.DOTALL)
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"✅ Fixed {filepath} (removed {count} header(s))")
        return True
    else:
        print(f"⚪ {filepath} - no duplicate headers found")
        return False

def main():
    print("🔧 Removing duplicate headers from all patient pages...\n")
    
    pages = [
        'app/patient/cart/page.tsx',
        'app/patient/checkout/page.tsx',
        'app/patient/login/page.tsx',
        'app/patient/order-confirmation/page.tsx',
        'app/patient/results/page.tsx',
        'app/patient/signup/page.tsx',
    ]
    
    fixed_count = 0
    for page in pages:
        try:
            if remove_header_block(page):
                fixed_count += 1
        except FileNotFoundError:
            print(f"❌ {page} not found")
        except Exception as e:
            print(f"❌ Error fixing {page}: {e}")
    
    print(f"\n✅ Fixed {fixed_count} files!")
    print("\nRun 'npm run dev' to test the changes.")

if __name__ == '__main__':
    main()
