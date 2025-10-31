import re
import glob

files = glob.glob('app/treatments/*/page.tsx')

for file_path in files:
    print(f"Fixing {file_path}...")
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # 1. Fix imports properly
    content = content.replace(
        'import { getTenantConfig } from "@/lib/tenant-config"',
        'import { getTenantConfig, getTenantId } from "@/lib/tenant-config"'
    )
    
    # 2. Add background variables after getTenantConfig()
    if 'const tenantId = getTenantId()' not in content:
        content = content.replace(
            '  const tenant = getTenantConfig()',
            '''  const tenant = getTenantConfig()
  const tenantId = getTenantId()
  const is10X = tenantId === "10x"
  const bgClass = is10X ? "bg-white text-gray-900" : "bg-gradient-to-br from-black via-gray-900 to-black text-white"'''
        )
    
    # 3. Update main container className
    content = content.replace(
        'className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white"',
        'className={`min-h-screen ${bgClass}`}'
    )
    
    # 4. Replace ALL text-yellow-400
    content = content.replace('text-yellow-400', '" style={{ color: tenant.colors.primary }} className="')
    
    # 5. Replace ALL bg-yellow-400  
    content = content.replace('bg-yellow-400', '" style={{ backgroundColor: tenant.colors.primary }} className="')
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"✅ Fixed {file_path}")

print("\n🎉 All fixed!")
