'use client'
import { useState, useMemo } from 'react'
import { chapters } from '@/lib/data'
import Link from 'next/link'

export default function ClientPage({ params }) {
  const { slug } = params || {}
  const chapterId = slug?.[0]
  const sectionId = slug?.[1]

  const chapter = chapters.find(c => c.id === chapterId)
  const section = chapter?.sections.find(s => s.id === sectionId)

  const fontSizeClasses = {
    sm: 'text-base leading-relaxed',
    md: 'text-lg leading-relaxed',
    lg: 'text-xl leading-loose',
    xl: 'text-2xl leading-loose',
  }

  const [fontSize, setFontSize] = useState('md')

  const allSections = useMemo(() => {
    const list = []
    chapters.forEach((chap) => {
      chap.sections.forEach((sec) => {
        list.push({
          chapterId: chap.id,
          chapterTitle: chap.title,
          sectionId: sec.id,
          sectionTitle: sec.title,
        })
      })
    })
    return list
  }, [])

  const currentIndex = allSections.findIndex(
    item => item.chapterId === chapterId && item.sectionId === sectionId
  )

  const prevSection = currentIndex > 0 ? allSections[currentIndex - 1] : null
  const nextSection = currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null

  if (!chapter || !section) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">الصفحة غير موجودة</h2>
        <Link href="/" className="text-amber-700 hover:underline">
          ← العودة للصفحة الرئيسية
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/70 p-3 rounded-lg border border-amber-200/80 shadow-xs">
        <Link 
          href="/" 
          className="inline-flex items-center text-amber-900 hover:text-amber-700 font-medium text-sm"
        >
          ← العودة إلى الفهرس
        </Link>

        <div className="flex items-center gap-1.5 bg-amber-50/80 p-1 rounded-md border border-amber-200">
          <span className="text-xs text-amber-900 font-semibold px-2 select-none">
            حجم الخط:
          </span>
          {['sm', 'md', 'lg', 'xl'].map((size, idx) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`px-2.5 py-1 text-xs rounded font-bold transition-all ${
                fontSize === size ? 'bg-amber-800 text-white shadow-xs' : 'text-amber-900 hover:bg-amber-200/60'
              }`}
            >
              {['صغير', 'متوسط', 'كبير', 'كبير جداً'][idx]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs md:text-sm font-semibold text-amber-700/90 mb-1">
          {chapter.title}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-amber-950 border-b border-amber-300/60 pb-3">
          {section.title}
        </h1>
      </div>

      <article className="bg-white/80 rounded-lg shadow-sm p-6 md:p-10 border border-amber-200/80">
        <p className={`text-gray-900 transition-all duration-200 ${fontSizeClasses[fontSize]}`}>
          {section.content}
        </p>

        <div className="mt-8 pt-4 border-t border-dashed border-amber-200 text-xs text-amber-800/80 italic">
          — من كتاب «الاستبصار في عجائب الأمصار»، تحقيق د. سعد زغلول عبد الحميد
        </div>
      </article>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-amber-200/60">
        {prevSection ? (
          <Link
            href={`/${prevSection.chapterId}/${prevSection.sectionId}`}
            className="flex flex-col p-4 bg-white/70 hover:bg-amber-50/80 border border-amber-200 rounded-lg text-right"
          >
            <span className="text-xs text-amber-700 font-semibold mb-1">→ القسم السابق</span>
            <span className="text-sm font-bold text-amber-950 line-clamp-1">{prevSection.sectionTitle}</span>
          </Link>
        ) : <div className="hidden sm:block"></div>}

        {nextSection ? (
          <Link
            href={`/${nextSection.chapterId}/${nextSection.sectionId}`}
            className="flex flex-col p-4 bg-white/70 hover:bg-amber-50/80 border border-amber-200 rounded-lg text-left"
          >
            <span className="text-xs text-amber-700 font-semibold mb-1">القسم التالي ←</span>
            <span className="text-sm font-bold text-amber-950 line-clamp-1">{nextSection.sectionTitle}</span>
          </Link>
        ) : <div className="hidden sm:block"></div>}
      </div>

      <div className="pt-2 text-center">
        <Link href="/" className="inline-block py-2.5 px-6 bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 rounded-lg text-sm font-semibold">
          العودة إلى الفهرس الرئيسي
        </Link>
      </div>
    </div>
  )
}
