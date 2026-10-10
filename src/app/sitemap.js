import { site } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap() {
  return [
    { url: `${site.url}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/confidentialitate/`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
