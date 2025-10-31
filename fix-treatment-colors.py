import re

file_path = 'app/treatments/testosterone-replacement/page.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# Replace text-yellow-400 with inline style
content = re.sub(
    r'className="([^"]*?)text-yellow-400([^"]*?)"',
    r'className="\1\2" style={{ color: tenant.colors.primary }}',
    content
)

# Replace bg-yellow-400 with inline style  
content = re.sub(
    r'className="([^"]*?)bg-yellow-400([^"]*?)"',
    r'className="\1\2" style={{ backgroundColor: tenant.colors.primary }}',
    content
)

# Replace gradient backgrounds
content = content.replace(
    'bg-gradient-to-r from-yellow-400/10 to-yellow-600/10',
    'bg-gradient-to-r from-white/5 to-white/10'
)

with open(file_path, 'w') as f:
    f.write(content)

print("✅ Fixed testosterone-replacement colors!")
