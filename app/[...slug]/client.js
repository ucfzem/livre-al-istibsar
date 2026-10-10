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
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
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
        <h2 className="text-2xl font-bold text-accent mb-4">الصفحة غير موجودة</h2>
        <Link href="/" className="text-gold hover:underline">
          ← العودة للصفحة الرئيسية
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-3 rounded-lg border border-line shadow-sm">
        <Link
          href="/"
          className="inline-flex items-center text-accent hover:text-gold font-medium text-sm"
        >
          ← العودة إلى الفهرس
        </Link>

        <div className="flex items-center gap-1.5 bg-panel p-1 rounded-md border border-line">
          <span className="text-xs text-muted font-semibold px-2 select-none">
            حجم الخط:
          </span>
          {['sm', 'md', 'lg', 'xl'].map((size, idx) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`px-2.5 py-1 text-xs rounded font-bold transition-all ${
                fontSize === size ? 'bg-green text-white' : 'text-ink hover:bg-gold hover:text-white'
              }`}
            >
              {['صغير', 'متوسط', 'كبير', 'كبير جداً'][idx]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs md:text-sm font-semibold text-muted mb-1">
          {chapter.title}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-accent border-b border-line pb-3">
          {section.title}
        </h1>
      </div>

      <article className="bg-card rounded-lg shadow-sm p-6 md:p-10 border border-line border-s-4 border-s-gold">
        <div className={`font-book text-ink transition-all duration-200 ${fontSizeClasses[fontSize]}`}>
          {section.content.split('\n').filter((p) => p.trim()).map((para, i) => (
            <p key={i} className={`text-justify leading-loose ${i > 0 ? 'mt-4' : ''}`}>
              {para}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-line text-xs text-muted italic">
          — من كتاب «الاستبصار في عجائب الأمصار»، تحقيق د. سعد زغلول عبد الحميد
        </div>
      </article>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-line">
        {prevSection ? (
          <Link
            href={`/${prevSection.chapterId}/${prevSection.sectionId}`}
            className="flex flex-col p-4 bg-card hover:bg-panel border border-line rounded-lg text-right transition-colors"
          >
            <span className="text-xs text-gold font-semibold mb-1">→ القسم السابق</span>
            <span className="text-sm font-bold text-ink line-clamp-1">{prevSection.sectionTitle}</span>
          </Link>
        ) : <div className="hidden sm:block"></div>}

        {nextSection ? (
          <Link
            href={`/${nextSection.chapterId}/${nextSection.sectionId}`}
            className="flex flex-col p-4 bg-card hover:bg-panel border border-line rounded-lg text-left transition-colors"
          >
            <span className="text-xs text-gold font-semibold mb-1">القسم التالي ←</span>
            <span className="text-sm font-bold text-ink line-clamp-1">{nextSection.sectionTitle}</span>
          </Link>
        ) : <div className="hidden sm:block"></div>}
      </div>

      <div className="pt-2 text-center">
        <Link href="/" className="inline-block py-2.5 px-6 bg-green text-white hover:opacity-90 rounded-lg text-sm font-semibold transition-opacity">
          العودة إلى الفهرس الرئيسي
        </Link>
      </div>
    </div>
  )
}
