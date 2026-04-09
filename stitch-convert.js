const fs = require('fs');

try {
    const html = fs.readFileSync('stitch_screen.html', 'utf8');

    // 1. Extract Tailwind config
    const configMatch = html.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\})\s*<\/script>/);
    if (configMatch) {
        const configStr = configMatch[1];
        const fn = new Function('return ' + configStr);
        const config = fn();
        if (config && config.theme && config.theme.extend && config.theme.extend.colors) {
            const colors = config.theme.extend.colors;
            
            let twConfig = fs.readFileSync('tailwind.config.ts', 'utf8');
            const colorStr = Object.entries(colors).map(([k,v]) => `        '${k}': '${v}',`).join('\n');
            twConfig = twConfig.replace(/colors: \{/, `colors: {\n${colorStr}`);
            fs.writeFileSync('tailwind.config.ts', twConfig);
            console.log("Updated tailwind.config.ts colors");
        }
    }

    // 2. Extract Body HTML and convert to JSX
    let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    if (bodyMatch) {
        let bodyHtml = bodyMatch[1];
        
        // Convert to JSX
        bodyHtml = bodyHtml.replace(/class=/g, 'className=')
                           .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
                           .replace(/<img(.*?)>/g, (m, c) => (c.endsWith('/') ? m : `<img${c} />`))
                           .replace(/<br([^>]*)>/g, (m, c) => (c.endsWith('/') ? m : `<br${c} />`))
                           .replace(/<hr([^>]*)>/g, (m, c) => (c.endsWith('/') ? m : `<hr${c} />`))
                           .replace(/<input(.*?)>/g, (m, c) => (c.endsWith('/') ? m : `<input${c} />`));

        // Fix style tags specifically for the material icons output
        bodyHtml = bodyHtml.replace(/style="font-variation-settings:\s*'FILL'\s*1;"/g, `style={{fontVariationSettings: "'FILL' 1"}}`);

        const jsx = `import React from 'react';

export function StitchPage() {
    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen">
            ${bodyHtml}
        </div>
    );
}
`;
        fs.writeFileSync('src/app/(app)/StitchPage.tsx', jsx);
        console.log("Created StitchPage.tsx component");
    }
} catch (e) {
    console.error("Error during conversion:", e);
}
