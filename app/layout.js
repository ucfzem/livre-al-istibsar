import './globals.css'
import { siteInfo } from '@/lib/data'

export const metadata = {
  title: siteInfo.title,
  description: siteInfo.description,
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <header className="bg-gradient-to-l from-amber-900 to-amber-800 text-white py-8 px-4 md:px-8 shadow-md">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-amber-100">📜 {siteInfo.title}</h1>
            <p className="mt-2 text-amber-200 text-base md:text-lg">{siteInfo.subtitle}</p>
          </div>
        </header>
        <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8">
          {children}
        </main>
        <footer className="bg-amber-900/10 py-6 text-center text-amber-800 text-sm mt-12 border-t border-amber-200">
          <p>نشر بموجب طبعة المحقق: د. سعد زغلول عبد الحميد، 1985</p>
        </footer>
      </body>
    </html>
  )
}
