'use client'
import { useState, useMemo } from 'react'
import { chapters } from '@/lib/data'
import Link from 'next/link'

export default function Home() {
  const [openChapter, setOpenChapter] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleChapter = (id) => {
    setOpenChapter(openChapter === id ? null : id)
  }

  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapters
    const query = searchQuery.toLowerCase()

    return chapters.map(chapter => {
      const matchingSections = chapter.sections.filter(section =>
        section.title.toLowerCase().includes(query) ||
        section.content.toLowerCase().includes(query)
      )
      const chapterMatches = chapter.title.toLowerCase().includes(query)

      return {
        ...chapter,
        sections: chapterMatches ? chapter.sections : matchingSections,
        hasMatch: chapterMatches || matchingSections.length > 0,
      }
    }).filter(chapter => chapter.hasMatch)
  }, [searchQuery])

  return (
    <div className="space-y-6">
      <div className="bg-card border border-line rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-accent mb-3">مقدمة الكتاب</h2>
        <p className="font-book text-lg text-ink">
          كتاب «الاستبصار في عجائب الأمصار» من أعظم كتب الجغرافيا في العهد الموحدي،
          ألفه مؤلف مجهول عاش بمراكش وفاس في القرن السادس الهجري / الثاني عشر الميلادي.
          يصف الكتاب الحجاز، مصر، إفريقية، المغرب والأندلس بتفاصيل نادرة لا توجد في مصدر آخر.
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="ابحث في محتوى الكتاب (مثلاً: مراكش، الأهرامات، فاس...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3.5 px-4 pr-12 bg-card border border-line text-ink rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold text-right placeholder-muted"
          dir="rtl"
        />
        <span className="absolute right-4 top-4 text-gold text-lg">🔍</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-4 top-4 text-muted hover:text-ink text-sm font-bold bg-panel rounded-full w-6 h-6 flex items-center justify-center"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-accent">📂 فهرس المحتويات</h2>
        {searchQuery && (
          <span className="text-sm text-muted italic">
            نتائج البحث عن: «{searchQuery}»
          </span>
        )}
      </div>

      {filteredChapters.length === 0 ? (
        <div className="text-center py-12 bg-panel rounded-lg border border-dashed border-line">
          <p className="text-ink text-lg font-medium">لم يتم العثور على نتائج تطابق بحثك.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 text-sm text-accent hover:underline font-semibold"
          >
            ← العرض الكامل للفهرس
          </button>
        </div>
      ) : (
        filteredChapters.map((chapter) => {
          const isOpen = searchQuery.trim() ? true : openChapter === chapter.id

          return (
            <div key={chapter.id} className="border border-line rounded-lg mb-2 overflow-hidden bg-card">
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full text-right py-4 px-6 hover:bg-panel transition-colors flex items-center justify-between font-semibold text-lg text-ink"
              >
                <span>{chapter.title}</span>
                {!searchQuery.trim() && (
                  <span className="text-gold text-xl">{openChapter === chapter.id ? '▼' : '▶'}</span>
                )}
              </button>

              {isOpen && (
                <div className="bg-panel border-t border-line">
                  {chapter.sections.map((section) => (
                    <Link
                      key={section.id}
                      href={`/${chapter.id}/${section.id}`}
                      className="block py-3 px-6 border-b border-line text-ink hover:bg-gold hover:text-white transition-colors last:border-b-0"
                    >
                      <span className="font-semibold">{section.title}</span>
                      {searchQuery && (
                        <span className="block mt-1 text-xs text-muted line-clamp-1">{section.content}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}
