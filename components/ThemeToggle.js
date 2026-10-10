'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') || 'light')
  }, [])

  const toggle = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('istibsar_theme', next)
    } catch (e) {}
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="تبديل الوضع الليلي والنهاري"
      title="الوضع الليلي / النهاري"
      className="shrink-0 w-11 h-11 rounded-lg border border-white/35 bg-white/15 hover:bg-white/25 text-xl leading-none flex items-center justify-center transition-colors"
    >
      <span suppressHydrationWarning>{theme === 'dark' ? '☀️' : '🌙'}</span>
    </button>
  )
}
