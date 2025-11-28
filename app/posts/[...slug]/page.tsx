import { notFound } from "next/navigation"
import { Metadata } from "next"
import { renderMDX } from "@/components/mdx-content"
import { getAllPosts, getPostBySlug } from "@/lib/mdx"

interface PostProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug.join("/"))

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug.replace('/posts/', '').split('/'),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params
  const post = getPostBySlug(slug.join("/"))

  if (!post) {
    notFound()
  }

  return (
    <article className="py-16 md:py-24">
      <header className="mb-12 md:mb-16 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {post.description}
          </p>
        )}
      </header>
      <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-4xl prose-headings:font-bold prose-a:text-felt-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
        {await renderMDX(post.content)}
      </div>
    </article>
  )
}
