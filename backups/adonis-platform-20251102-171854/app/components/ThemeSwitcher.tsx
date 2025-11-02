'use client'
import { useState, useEffect } from 'react'
import { Palette } from 'lucide-react'

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('default')
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { id: 'default', name: 'Gold Classic', color: '#EAB308' },
    { id: 'emerald', name: 'Emerald Executive', color: '#10B981' },
    { id: 'blue', name: 'Deep Ocean', color: '#3B82F6' },
    { id: 'purple', name: 'Royal Purple', color: '#8B5CF6' }
  ]

  useEffect(() => {
    const savedTheme = localStorage.getItem('adonis-theme') || 'default'
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (themeId: string) => {
    document.documentElement.setAttribute('data-theme', themeId === 'default' ? '' : themeId)
  }

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId)
    applyTheme(themeId)
    localStorage.setItem('adonis-theme', themeId)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="theme-button-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <Palette className="w-6 h-6" />
        </button>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 theme-card rounded-xl border p-4 shadow-2xl min-w-48">
            <h3 className="theme-text-primary font-bold mb-3">Choose Theme</h3>
            <div className="space-y-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all ${
                    currentTheme === theme.id 
                      ? 'theme-card border' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div 
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.color }}
                  ></div>
                  <span className="theme-text-secondary text-sm">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
