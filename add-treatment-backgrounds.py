import re
import glob

files = glob.glob('app/treatments/*/page.tsx')

for file_path in files:
    print(f"Updating {file_path}...")
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Check if getTenantId is already imported
    if 'getTenantId' not in content:
        # Add getTenantId to imports
        content = content.replace(
            'import { getTenantConfig }',
            'import { getTenantConfig, getTenantId }'
        )
    
    # Check if background classes are defined
    if 'const tenantId = getTenantId()' not in content:
        # Add tenant background logic after getTenantConfig
        insert_after = 'const tenant = getTenantConfig()'
        if insert_after in content:
            background_code = '''
  const tenantId = getTenantId()
  const is10X = tenantId === "10x"
  const bgClass = is10X ? "bg-white text-gray-900" : "bg-gradient-to-br from-black via-gray-900 to-black text-white"
  const sectionBgClass = is10X ? "bg-gray-50" : "bg-black/20"'''
            
            content = content.replace(insert_after, insert_after + background_code)
    
    # Find the main container and add bgClass
    # Look for: <div className="min-h-screen
    content = re.sub(
        r'<div className="min-h-screen([^"]*)"',
        r'<div className={`min-h-screen\1 ${bgClass}`}',
        content
    )
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"✅ Updated {file_path}")

print("\n🎉 All treatment pages updated with backgrounds!")
