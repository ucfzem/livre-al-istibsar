import './globals.css'
import Script from 'next/script'
import { Cairo, Amiri } from 'next/font/google'
import { siteInfo } from '@/lib/data'
import ThemeToggle from '@/components/ThemeToggle'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
})

export const metadata = {
  title: siteInfo.title,
  description: siteInfo.description,
}

const themeBoot =
  "try{var t=localStorage.getItem('istibsar_theme')||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}"

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-cairo">
        <Script id="theme-boot" strategy="beforeInteractive">
          {themeBoot}
        </Script>
        <header className="bg-green text-headertext py-6 px-4 md:px-8 shadow-md">
          <div className="max-w-4xl mx-auto flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold">📜 {siteInfo.title}</h1>
              <p className="mt-2 text-sm md:text-lg opacity-90">{siteInfo.subtitle}</p>
            </div>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8">
          {children}
        </main>
        <footer className="bg-panel py-6 text-center text-muted text-sm mt-12 border-t border-line">
          <p>نشر بموجب طبعة المحقق: د. سعد زغلول عبد الحميد، 1985</p>
        </footer>
      </body>
    </html>
  )
}
