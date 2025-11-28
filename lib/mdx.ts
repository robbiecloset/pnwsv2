import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')
const pagesDirectory = path.join(process.cwd(), 'content/pages')

export interface Post {
  slug: string
  title: string
  description?: string
  date: string
  content: string
}

export interface Page {
  slug: string
  title: string
  description?: string
  content: string
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }
  return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
}

export function getAllPosts(): Post[] {
  const files = getMDXFiles(postsDirectory)

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: `/posts/${slug}`,
      title: data.title,
      description: data.description,
      date: data.date,
      content,
    }
  })

  // Sort posts by date
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: `/posts/${slug}`,
      title: data.title,
      description: data.description,
      date: data.date,
      content,
    }
  } catch {
    return null
  }
}

export function getAllPages(): Page[] {
  const files = getMDXFiles(pagesDirectory)

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const fullPath = path.join(pagesDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: `/${slug}`,
      title: data.title,
      description: data.description,
      content,
    }
  })
}

export function getPageBySlug(slug: string): Page | null {
  try {
    const fullPath = path.join(pagesDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: `/${slug}`,
      title: data.title,
      description: data.description,
      content,
    }
  } catch {
    return null
  }
}
