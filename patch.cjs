const fs = require('fs');
let lines = fs.readFileSync('src/pages/index.astro', 'utf8').split('\n');
const startIdx = lines.findIndex(l => l.includes('<header id="main-header"'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('</header>'));
if (startIdx !== -1 && endIdx !== -1) {
    lines.splice(startIdx - 3, endIdx - startIdx + 4, '        <Header />');
    if (!lines[0].includes('import Header')) {
        lines.unshift('---\nimport Header from \'../components/Header.astro\';\n---\n');
    }
    fs.writeFileSync('src/pages/index.astro', lines.join('\n'));
}
