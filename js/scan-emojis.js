'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const skip = new Set(['js/replace-emojis.js', 'js/scan-emojis.js']);
const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{1F1E6}-\u{1F1FF}]/gu;
const symRe = /[▼▲◀▶✓✗★☆]/g;

function walk(dir, out = []) {
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        if (fs.statSync(full).isDirectory()) {
            if (name !== 'node_modules' && name !== '.git') walk(full, out);
        } else if (/\.(html|js|css|md|json)$/i.test(name)) out.push(full);
    }
    return out;
}

const found = [];
for (const file of walk(root)) {
    const rel = path.relative(root, file).replace(/\\/g, '/');
    if (skip.has(rel)) continue;
    const text = fs.readFileSync(file, 'utf8');
    for (const re of [emojiRe, symRe]) {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(text))) {
            const line = text.slice(0, m.index).split('\n').length;
            found.push({
                file: rel,
                line,
                char: m[0],
                code: re === emojiRe ? 'U+' + m[0].codePointAt(0).toString(16).toUpperCase() : 'symbol',
                context: text.slice(Math.max(0, m.index - 30), m.index + 35).replace(/\s+/g, ' '),
            });
        }
    }
}

if (!found.length) {
    console.log('No emojis or dropdown symbols found in user-facing files.');
} else {
    console.log(JSON.stringify(found, null, 2));
    console.log('\nTotal:', found.length);
}
