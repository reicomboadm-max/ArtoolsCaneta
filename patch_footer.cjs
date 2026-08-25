const fs = require('fs');

// 1. Process index.astro
let lines = fs.readFileSync('src/pages/index.astro', 'utf8').split('\n');
const startIdx = lines.findIndex(l => l.includes('<footer class="relative'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('</footer>'));

if (startIdx !== -1 && endIdx !== -1) {
    const footerContent = lines.slice(startIdx, endIdx + 1).join('\n');
    
    // Write Footer.astro
    fs.writeFileSync('src/components/Footer.astro', `---\n// Footer.astro\n---\n${footerContent}`);
    
    // Replace in index.astro
    // Also remove the preceding comment block if present
    let removeStart = startIdx;
    if (lines[startIdx - 1].includes('================')) removeStart -= 3;
    
    lines.splice(removeStart, endIdx - removeStart + 1, '        <Footer />');
    
    // Add import if needed
    const importStmt = "import Footer from '../components/Footer.astro';";
    if (!lines.join('\n').includes(importStmt)) {
        // we know there is a frontmatter because we added one for Header
        const secondDashes = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
        if (secondDashes !== -1) {
            lines.splice(secondDashes, 0, importStmt);
        }
    }
    
    fs.writeFileSync('src/pages/index.astro', lines.join('\n'));
}

// 2. Process Layout.astro
let layoutLines = fs.readFileSync('src/layouts/Layout.astro', 'utf8').split('\n');
if (!layoutLines.join('\n').includes('import Footer')) {
    const frontmatterEnd = layoutLines.findIndex((l, i) => i > 0 && l.trim() === '---');
    if (frontmatterEnd !== -1) {
        layoutLines.splice(frontmatterEnd, 0, "import Footer from '../components/Footer.astro';");
    }
}
const bodyEnd = layoutLines.findIndex(l => l.includes('</body>'));
if (bodyEnd !== -1 && !layoutLines.join('\n').includes('<Footer />')) {
    layoutLines.splice(bodyEnd, 0, '\t\t<Footer />');
}
fs.writeFileSync('src/layouts/Layout.astro', layoutLines.join('\n'));
