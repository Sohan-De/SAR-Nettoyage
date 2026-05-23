'use strict';

const fs = require('fs');
const path = require('path');
const { cities, ZONE_NAV_LABEL } = require('./zones-data');

const root = path.join(__dirname, '..');

function walkHtml(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name !== 'node_modules' && name !== 'zones') walkHtml(full, files);
    } else if (name.endsWith('.html')) files.push(full);
    }
  return files;
}

function dropdownItems(zonesHrefPrefix) {
  return cities
    .map((c) => `<li><a href="${zonesHrefPrefix}${c.slug}.html">${c.name}</a></li>`)
    .join('\n                            ');
}

function patchNav(html, rel) {
  const isZone = rel.startsWith('zones/');
  const isService = rel.startsWith('services/');
  const areaHref = isZone ? '../index.html#area' : isService ? '../index.html#area' : rel === 'index.html' ? '#area' : 'index.html#area';
  const zonesPrefix = isZone ? '' : isService ? '../zones/' : 'zones/';

  const items = dropdownItems(zonesPrefix);
  const re =
    /(<li class="nav-item-dropdown">\s*<a href="[^"]*" class="nav-link[^"]*dropdown-toggle">)Zone(?: d'intervention)?(\s*<span class="dropdown-arrow">▼<\/span><\/a>\s*<ul class="dropdown-menu">)\s*[\s\S]*?(<\/ul>\s*<\/li>)/;

  if (!re.test(html)) return html;

  return html.replace(
    re,
    `$1${ZONE_NAV_LABEL}$2\n                            ${items}\n                        $3`
  );
}

function patchIndexArea(html) {
  const icon =
    '<div class="area-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>';

  const cards = cities
    .map(
      (c) => `                    <a href="zones/${c.slug}.html" class="area-card area-card--link">
                        ${icon}
                        <h4>${c.name}</h4>
                        <p>${c.cardSub}</p>
                    </a>`
    )
    .join('\n');

  const cta = `                    <div class="area-card area-card--cta">
                        <div class="area-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></div>
                        <h4>Hors zone ?</h4>
                        <p>Contactez-nous : nous étudions chaque demande autour de Béziers.</p>
                    </div>`;

  const sectionRe =
    /(<section id="area" class="area-section">[\s\S]*?<p class="section-desc">)[^<]*(<\/p>\s*<\/div>\s*<div class="area-grid scroll-reveal">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/;

  const newDesc =
    "Basés à Béziers, nous intervenons dans un rayon d'environ 30 km : littoral, vignoble et communes de l'agglomération. Votre ville est listée ci-dessous ?";

  return html.replace(sectionRe, `$1${newDesc}$2\n${cards}\n${cta}\n                $3`);
}

let count = 0;
for (const file of walkHtml(root)) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  html = patchNav(html, rel);
  if (rel === 'index.html') html = patchIndexArea(html);
  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    console.log('Patched:', rel);
    count++;
  }
}

console.log(`Done. ${count} file(s) updated.`);
