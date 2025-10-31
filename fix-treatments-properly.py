import re
import glob

files = glob.glob('app/treatments/*/page.tsx')

for file_path in files:
    print(f"Fixing {file_path}...")
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # 1. Add getTenantId to imports if not there
    if 'getTenantId' not in content:
        content = content.replace(
            'from "@/lib/tenant-config"',
            ', getTenantId } from "@/lib/tenant-config"'
        )
        content = content.replace(
            'import { getTenantConfig,',
            'import { getTenantConfig, getTenantId'
        )
    
    # 2. Add background variables after getTenantConfig()
    if 'const tenantId = getTenantId()' not in content:
        content = content.replace(
            'const tenant = getTenantConfig()',
            '''const tenant = getTenantConfig()
  const tenantId = getTenantId()
  const is10X = tenantId === "10x"
  const bgClass = is10X ? "bg-white text-gray-900" : "bg-gradient-to-br from-black via-gray-900 to-black text-white"'''
        )
    
    # 3. Update main container to use bgClass
    content = re.sub(
        r'className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white"',
        r'className={`min-h-screen ${bgClass}`}',
        content
    )
    
    # 4. Replace text-yellow-400 with inline style (be very careful!)
    content = re.sub(
        r'className="([^"]*?)text-yellow-400([^"]*?)"',
        r'className="\1\2" style={{ color: tenant.colors.primary }}',
        content
    )
    
    # 5. Replace bg-yellow-400 with inline style
    content = re.sub(
        r'className="([^"]*?)bg-yellow-400([^"]*?)"',
        r'className="\1\2" style={{ backgroundColor: tenant.colors.primary }}',
        content
    )
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"✅ Fixed {file_path}")

print("\n🎉 All treatment pages properly fixed!")
