import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/settings', '/today', '/profile', '/timeline', '/insights'],
      },
    ],
    sitemap: 'https://astrapulse.app/sitemap.xml',
  };
}
