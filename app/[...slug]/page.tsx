import { notFound } from "next/navigation"
import { Metadata } from "next"
import { renderMDX } from "@/components/mdx-content"
import { getAllPages, getPageBySlug } from "@/lib/mdx"

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getPageBySlug(slug.join("/"))

  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export async function generateStaticParams() {
  const pages = getAllPages()

  return pages.map((page) => ({
    slug: page.slug.replace('/', '').split('/'),
  }))
}

export default async function PagePage({ params }: PageProps) {
  const { slug } = await params
  const page = getPageBySlug(slug.join("/"))

  if (!page) {
    notFound()
  }

  return (
    <article className="py-16 md:py-24">
      <header className="mb-12 md:mb-16 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {page.description}
          </p>
        )}
      </header>
      <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-4xl prose-headings:font-bold prose-a:text-felt-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
        {await renderMDX(page.content)}
      </div>
    </article>
  )
}
