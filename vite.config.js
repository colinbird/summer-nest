import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// Function to get all HTML files in a directory
function getHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    const htmlFiles = {};
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const name = path.parse(file).name;
            htmlFiles[name] = path.join(dir, file);
        }
    });
    return htmlFiles;
}

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                invoices: 'invoices.html',
                products: 'products.html',
                funnel: 'funnel.html',
		        casino: 'casino.html',
                payout: 'payout.html',
                ...getHtmlFiles('debriefs')
            }
        }
    }
});
