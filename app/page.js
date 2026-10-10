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
        hasMatch: chapterMatches || matchingSections.length > 0
      }
    }).filter(chapter => chapter.hasMatch)
  }, [searchQuery])

  return (
    <div className="space-y-6">
      <div className="bg-white/60 rounded-lg p-6 border border-amber-100 shadow-sm">
        <h2 className="text-xl font-bold text-amber-800 mb-3">مقدمة الكتاب</h2>
        <p className="text-lg leading-relaxed text-gray-800">
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
          className="w-full py-3.5 px-4 pr-12 bg-white/90 border border-amber-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-right placeholder-amber-800/40 text-gray-800"
          dir="rtl"
        />
        <span className="absolute right-4 top-4 text-amber-800 text-lg">🔍</span>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute left-4 top-4 text-amber-800/60 hover:text-amber-900 text-sm font-bold bg-amber-100/60 rounded-full w-6 h-6 flex items-center justify-center"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-amber-800">📂 فهرس المحتويات</h2>
        {searchQuery && (
          <span className="text-sm text-amber-700 italic">
            نتائج البحث عن: «{searchQuery}»
          </span>
        )}
      </div>
      
      {filteredChapters.length === 0 ? (
        <div className="text-center py-12 bg-white/40 rounded-lg border border-dashed border-amber-300">
          <p className="text-amber-900 text-lg font-medium">لم يتم العثور على نتائج تطابق بحثك.</p>
          <button 
            onClick={() => setSearchQuery('')} 
            className="mt-3 text-sm text-amber-700 hover:underline font-semibold"
          >
            ← العرض الكامل للفهرس
          </button>
        </div>
      ) : (
        filteredChapters.map((chapter) => {
          const isOpen = searchQuery.trim() ? true : openChapter === chapter.id

          return (
            <div key={chapter.id} className="border border-amber-200 rounded-lg mb-2 overflow-hidden bg-white/40">
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full text-right py-4 px-6 border-b border-amber-200 hover:bg-amber-50 transition-colors flex items-center justify-between font-medium text-lg"
              >
                <span>{chapter.title}</span>
                {!searchQuery.trim() && (
                  <span className="text-amber-700 text-xl">{openChapter === chapter.id ? '▼' : '▶'}</span>
                )}
              </button>
              
              {isOpen && (
                <div className="bg-amber-50/60">
                  {chapter.sections.map((section) => (
                    <Link
                      key={section.id}
                      href={`/${chapter.id}/${section.id}`}
                      className="block py-3.5 px-8 text-gray-700 hover:text-amber-900 hover:bg-amber-100/50 transition-colors border-b border-dashed border-amber-200/60"
                    >
                      <div className="font-semibold">{section.title}</div>
                      {searchQuery && (
                        <div className="text-xs text-gray-500 mt-1 line-clamp-1 italic">
                          {section.content}
                        </div>
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
