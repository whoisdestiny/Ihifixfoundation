import type { MetadataRoute } from 'next'
import { programmes, site } from '@/lib/site-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/programmes', '/impact', '/partners', '/partner-with-us', '/get-involved', '/donate', '/resources', '/contact', '/policies']
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: 'monthly' as const, priority: r === '' ? 1 : 0.7 })),
    ...programmes.map((p) => ({ url: `${site.url}/programmes/${p.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ]
}
