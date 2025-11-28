import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import Image from 'next/image'

const components = {
  Image,
}

export async function renderMDX(source: string) {
  const code = String(await compile(source, { outputFormat: 'function-body', development: false }))
  const { default: Content } = await run(code, { ...runtime, baseUrl: import.meta.url } as any)
  return <Content components={components} />
}
