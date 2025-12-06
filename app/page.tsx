import { getAllPosts } from "@/lib/mdx"
import Link from "next/link"

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="py-16 md:py-24">
      {/* <div className="mb-16 md:mb-24">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          the latest
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl">
          Thoughts, stories, and ideas
        </p>
      </div> */}

      <div className="grid gap-12 md:gap-16">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group relative"
          >
            <Link href={post.slug} className="block">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold group-hover:text-felt-blue transition-colors duration-300">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                    {post.description}
                  </p>
                )}
              </div>
              <div className="mt-6 inline-flex items-center text-felt-blue font-medium group-hover:gap-2 transition-all">
                Read more
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
