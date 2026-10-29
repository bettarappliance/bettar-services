/**
 * Every appliance product page (/appliances/<id>), read from the Firestore catalog at build time
 * so Google can find each product. Uses the public Firestore REST API (same read access as the site).
 * If the catalog can't be reached, the sitemap is still built without product pages.
 */
async function getApplianceProductPaths() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'bettarservices';
  const base = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/appliances`;
  const paths = [];
  let pageToken = '';
  try {
    do {
      const url = `${base}?pageSize=300&mask.fieldPaths=category${pageToken ? `&pageToken=${pageToken}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Firestore responded ${res.status}`);
      const data = await res.json();
      for (const doc of data.documents || []) {
        const id = doc.name.split('/').pop();
        paths.push({
          loc: `/appliances/${encodeURIComponent(id)}`,
          lastmod: doc.updateTime || new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.6,
        });
      }
      pageToken = data.nextPageToken || '';
    } while (pageToken);
  } catch (err) {
    console.warn('[next-sitemap] Could not load appliance product pages:', err.message);
    return [];
  }
  return paths;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.bettarservices.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    '/appliances/admin',
    '/appliances/admin/*',
  ],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority and changefreq for specific pages
    const customConfig = {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    };

    // Homepage gets highest priority
    if (path === '/') {
      customConfig.priority = 1.0;
      customConfig.changefreq = 'daily';
    }

    // Services pages get high priority
    if (path.includes('/services')) {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'monthly';
    }

    // Request service page gets high priority
    if (path === '/request-service') {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'monthly';
    }

    // Contact and about pages
    if (path === '/contact' || path === '/about') {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'monthly';
    }

    // Appliances page
    if (path === '/appliances') {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'monthly';
    }

    // Promotions page — primary nav item, content changes frequently
    if (path === '/promotions') {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'weekly';
    }

    // Gallery page
    if (path === '/gallery') {
      customConfig.priority = 0.7;
      customConfig.changefreq = 'weekly';
    }

    // Appliance category pages
    if (path.startsWith('/appliances/') && path !== '/appliances/admin') {
      customConfig.priority = 0.7;
      customConfig.changefreq = 'weekly';
    }

    return customConfig;
  },
  additionalPaths: async () => getApplianceProductPaths(),
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/appliances/admin'],
      },
    ],
    additionalSitemaps: [
      'https://www.bettarservices.com/sitemap.xml',
    ],
  },
};
