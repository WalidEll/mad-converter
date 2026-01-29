import type {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();

  const paths = ['/ar', '/fr', '/en'];

  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '/ar' ? 1 : 0.8
  }));
}
