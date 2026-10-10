import { chapters } from '@/lib/data'
import ClientPage from './client'

export async function generateStaticParams() {
  const params = []
  chapters.forEach((chapter) => {
    chapter.sections.forEach((section) => {
      params.push({ slug: [chapter.id, section.id] })
    })
  })
  return params
}

export default function SectionPage({ params }) {
  return <ClientPage params={params} />
}
