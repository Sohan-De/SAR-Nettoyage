'use strict';

const fs = require('fs');
const path = require('path');
const { ICON, trustRowHtml, footerContactHtml, footerContactSpansHtml, ratingStarsHtml, blogModalMeta } = require('./icon-snippets');

const root = path.join(__dirname, '..');

function walkHtml(dir, files = []) {
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        if (fs.statSync(full).isDirectory()) {
            if (name !== 'node_modules') walkHtml(full, files);
        } else if (name.endsWith('.html')) files.push(full);
    }
    return files;
}

function replaceAll(content) {
    let s = content;

    s = s.replace(/<span class="badge fade-in">✨ ([^<]+)<\/span>/g, `<span class="badge fade-in">${ICON.sparkles} $1</span>`);
    s = s.replace(/<span class="svc-hero-badge">✨ ([^<]+)<\/span>/g, `<span class="svc-hero-badge">${ICON.sparkles} $1</span>`);
    s = s.replace(/<span class="zone-hero-badge">📍 ([^<]+)<\/span>/g, `<span class="zone-hero-badge">${ICON.pin} $1</span>`);

    s = s.replace(/<span class="blog-hero-badge">✦ ([^<]+)<\/span>/g, `<span class="blog-hero-badge">${ICON.sparkles} $1</span>`);
    s = s.replace(/<span class="realisation-hero-badge">✦ ([^<]+)<\/span>/g, `<span class="realisation-hero-badge">${ICON.sparkles} $1</span>`);
    s = s.replace(/<span class="legal-hero-badge">✦ ([^<]+)<\/span>/g, `<span class="legal-hero-badge">${ICON.sparkles} $1</span>`);

    s = s.replace(
        /<div class="zone-hero-trust">\s*<span>⭐️ 4,9\/5 avis clients<\/span>\s*<span>⚡ Réponse sous 15 min<\/span>\s*<span>🛡️ Garantie satisfaction<\/span>\s*<\/div>/g,
        `<div class="zone-hero-trust">${trustRowHtml()}\n                    </div>`
    );
    s = s.replace(
        /<div class="svc-hero-trust">\s*<span>⭐️ 4,9\/5 avis clients<\/span>\s*<span>⚡ Réponse sous 15 min<\/span>\s*<span>🛡️ Garantie satisfaction<\/span>\s*<\/div>/g,
        `<div class="svc-hero-trust">${trustRowHtml()}\n                    </div>`
    );

    s = s.replace(/<span>⭐️ Note 4,9\/5 \(250\+ avis\)<\/span>/g, `<span class="trust-inline">${ICON.star} Note 4,9/5 (250+ avis)</span>`);
    s = s.replace(/<div class="rating">⭐️⭐️⭐️⭐️⭐️<\/div>/g, ratingStarsHtml());

    s = s.replace(
        /<p class="footer-contact-details"><span>📞 Tél\. : <a href="tel:\+33664334035">\+33 6 64 33 40 35<\/a><\/span><span>✉️ Email : <a href="mailto:support@apexwallcare\.com">support@apexwallcare\.com<\/a><\/span><\/p>/g,
        footerContactHtml()
    );
    s = s.replace(
        /<span>📞 Tél\. : <a href="tel:\+33664334035">\+33 6 64 33 40 35<\/a><\/span>\s*<span>✉️ Email : <a href="mailto:support@apexwallcare\.com">support@apexwallcare\.com<\/a><\/span>/g,
        footerContactSpansHtml()
    );

    s = s.replace(/<span>📅 ([^<]+)<\/span>/g, `<span class="meta-inline">${ICON.calendar} $1</span>`);
    s = s.replace(/<span>⏱ ([^<]+)<\/span>/g, `<span class="meta-inline">${ICON.clock} $1</span>`);
    s = s.replace(/<span>🔒 ([^<]+)<\/span>/g, `<span class="meta-inline">${ICON.lock} $1</span>`);
    s = s.replace(/<span>📍 ([^<]+)<\/span>/g, (m, text) => {
        if (m.includes('zone-hero-badge')) return m;
        return `<span class="meta-inline">${ICON.pin} ${text}</span>`;
    });

    return s;
}

function replaceScriptJs(content) {
    const metas = [
        ['15 Mai 2026', '6 min de lecture'],
        ['3 Mai 2026', '5 min de lecture'],
        ['20 Avr 2026', '7 min de lecture'],
        ['12 Avr 2026', '8 min de lecture'],
        ['28 Mar 2026', '6 min de lecture'],
        ['15 Mar 2026', '4 min de lecture'],
        ['2 Mar 2026', '5 min de lecture'],
        ['18 Fév 2026', '4 min de lecture'],
        ['5 Fév 2026', '6 min de lecture'],
    ];
    let s = content;
    for (const [date, time] of metas) {
        const old = `meta: '📅 ${date} · ⏱ ${time}'`;
        const neu = `meta: '${blogModalMeta(date, time).replace(/'/g, "\\'")}'`;
        s = s.replace(old, neu);
    }
    return s;
}

let changed = 0;
for (const file of walkHtml(root)) {
    const before = fs.readFileSync(file, 'utf8');
    const after = replaceAll(before);
    if (after !== before) {
        fs.writeFileSync(file, after, 'utf8');
        console.log('Updated:', path.relative(root, file));
        changed++;
    }
}

const scriptPath = path.join(root, 'js', 'script.js');
const scriptBefore = fs.readFileSync(scriptPath, 'utf8');
const scriptAfter = replaceScriptJs(scriptBefore);
if (scriptAfter !== scriptBefore) {
    fs.writeFileSync(scriptPath, scriptAfter, 'utf8');
    console.log('Updated: js/script.js');
    changed++;
}

console.log(`Done. ${changed} file(s) updated.`);
