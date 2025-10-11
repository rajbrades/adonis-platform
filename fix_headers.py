#!/usr/bin/env python3

def fix_intake():
    with open('app/consultation/intake/page.tsx', 'r') as f:
        content = f.read()
    
    old_header = '''      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
          <div className="text-white/60">Step 2 of 4</div>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">'''
    
    new_content = '''      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-right mb-6">
          <span className="text-white/60 text-sm">Step 1 of 3</span>
        </div>'''
    
    content = content.replace(old_header, new_content)
    
    with open('app/consultation/intake/page.tsx', 'w') as f:
        f.write(content)
    print("✅ Fixed intake/page.tsx")

def fix_medical_history():
    with open('app/consultation/medical-history/page.tsx', 'r') as f:
        content = f.read()
    
    old_header = '''      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
          <div className="text-white/60">Step 3 of 4</div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">'''
    
    new_content = '''      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-right mb-6">
          <span className="text-white/60 text-sm">Step 2 of 3</span>
        </div>'''
    
    content = content.replace(old_header, new_content)
    
    with open('app/consultation/medical-history/page.tsx', 'w') as f:
        f.write(content)
    print("✅ Fixed medical-history/page.tsx")

def fix_review():
    with open('app/consultation/review/page.tsx', 'r') as f:
        content = f.read()
    
    old_header = '''      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
          <div className="text-white/60">Step 4 of 4</div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">'''
    
    new_content = '''      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-right mb-6">
          <span className="text-white/60 text-sm">Step 3 of 3</span>
        </div>'''
    
    content = content.replace(old_header, new_content)
    
    with open('app/consultation/review/page.tsx', 'w') as f:
        f.write(content)
    print("✅ Fixed review/page.tsx")

if __name__ == '__main__':
    print("🔧 Fixing double headers in consultation pages...\n")
    fix_intake()
    fix_medical_history()
    fix_review()
    print("\n✅ All files fixed! Test with 'npm run dev'")
