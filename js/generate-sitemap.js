const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://support.apexwallcare.com';
const rootDir = path.resolve(__dirname, '..');
const sitemapPath = path.join(rootDir, 'sitemap.xml');

// Standard pages we want to index
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'blog.html', priority: '0.8', changefreq: 'weekly' },
  { path: 'realisation.html', priority: '0.8', changefreq: 'weekly' },
  { path: 'contact.html', priority: '0.6', changefreq: 'monthly' }
];

console.log('--- GENERATING SITEMAP.XML ---');

let urls = [];

// 1. Add static pages
staticPages.forEach(p => {
  const urlPath = p.path ? `/${p.path}` : '/';
  urls.push({
    loc: `${DOMAIN}${urlPath}`,
    priority: p.priority,
    changefreq: p.changefreq,
    lastmod: new Date().toISOString().split('T')[0]
  });
});

// 2. Scan services directory
const servicesDir = path.join(rootDir, 'services');
if (fs.existsSync(servicesDir)) {
  const files = fs.readdirSync(servicesDir).filter(file => file.endsWith('.html'));
  files.forEach(file => {
    urls.push({
      loc: `${DOMAIN}/services/${file}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: new Date().toISOString().split('T')[0]
    });
  });
}

// 3. Scan zones directory
const zonesDir = path.join(rootDir, 'zones');
if (fs.existsSync(zonesDir)) {
  const files = fs.readdirSync(zonesDir).filter(file => file.endsWith('.html'));
  files.forEach(file => {
    urls.push({
      loc: `${DOMAIN}/zones/${file}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: new Date().toISOString().split('T')[0]
    });
  });
}

// Build XML string
let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

urls.forEach(u => {
  xmlContent += `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>
`;
});

xmlContent += `</urlset>\n`;

// Write file
fs.writeFileSync(sitemapPath, xmlContent, 'utf8');
console.log(`Sitemap generated successfully with ${urls.length} links at ${sitemapPath}`);
