/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://robindesToits.fr',
  generateRobotsTxt: false,
  changefreq: 'monthly',
  priority: 0.7,
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/services': 0.9,
      '/galerie': 0.8,
      '/contact': 0.8,
      '/mentions-legales': 0.3,
    }
    return {
      loc: path,
      changefreq: path === '/' ? 'weekly' : 'monthly',
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
