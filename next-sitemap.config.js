/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bettarservices.com',
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
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/appliances/admin'],
      },
    ],
    additionalSitemaps: [
      'https://bettarservices.com/sitemap.xml',
    ],
  },
};
