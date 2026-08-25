const fs = require('fs');

let content = fs.readFileSync('src/pages/index.astro', 'utf8');

// Ensure Button is imported
if (!content.includes('import Button')) {
    content = content.replace('---\n', '---\nimport Button from \'../components/Button.astro\';\n');
}

// Replace Hero buttons
content = content.replace(
    /<button onclick="openOrderModal\(\)" class="px-7 sm:px-8 py-3\.5 bg-\[#1C1917\] hover:bg-stone-800 text-white rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all shadow-lg hover:-translate-y-0\.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-900">\s*Comprar Agora\s*<\/button>/,
    `<Button onclick="openOrderModal()">Comprar Agora</Button>`
);

content = content.replace(
    /<a href="#video-showcase-section" class="px-6 sm:px-7 py-3\.5 bg-white hover:bg-stone-100 border border-stone-300 text-\[#1C1917\] rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center gap-2 hover:-translate-y-0\.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-400">\s*Explorar <iconify-icon icon="solar:arrow-down-linear" class="text-sm"><\/iconify-icon>\s*<\/a>/,
    `<Button href="#video-showcase-section" variant="secondary">Explorar <iconify-icon icon="solar:arrow-down-linear" class="text-sm"></iconify-icon></Button>`
);

// Replace Second Fold buttons
content = content.replace(
    /<button onclick="openOrderModal\(\)" class="px-8 sm:px-10 py-4 bg-\[#1C1917\] hover:bg-stone-800 text-white rounded-none sm:rounded-sm text-xs font-mono tracking-widest uppercase font-bold transition-all shadow-xl hover:-translate-y-0\.5 active:scale-95">\s*RESERVAR INSTRUMENTO\s*<\/button>/,
    `<Button onclick="openOrderModal()" size="lg" shape="square">RESERVAR INSTRUMENTO</Button>`
);

content = content.replace(
    /<a href="#specs-section" class="px-8 sm:px-10 py-4 bg-transparent hover:bg-stone-200\/60 dark:hover:bg-stone-800\/60 border border-\[#1C1917\] dark:border-white text-\[#1C1917\] dark:text-white rounded-none sm:rounded-sm text-xs font-mono tracking-widest uppercase font-bold transition-all hover:-translate-y-0\.5">\s*ESPECIFICAÇÕES\s*<\/a>/,
    `<Button href="#specs-section" variant="outline" size="lg" shape="square">ESPECIFICAÇÕES</Button>`
);

fs.writeFileSync('src/pages/index.astro', content);
