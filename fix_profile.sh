#!/bin/bash

# Use the str_replace tool through our toolkit
cat > /tmp/profile_replace.txt << 'EOF'
path: app/patient/page.tsx
old_str: |
          {/* Profile */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-500/20 px-3 py-1 rounded-full text-xs font-semibold text-yellow-500">
              Coming Soon
            </div>
            <div className="w-12 h-12 bg-gray-500/10 rounded-xl flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-400">Profile</h3>
            <p className="text-white/40 text-sm">Update your information and preferences</p>
          </div>
new_str: |
          {/* Profile */}
          <Link
            href="/patient/profile"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Profile</h3>
            <p className="text-white/60 text-sm">Update your information and preferences</p>
          </Link>
EOF
