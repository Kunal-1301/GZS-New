const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const widthRegex = /max-w-\[1440px\]\s+mx-auto\s+px-6\s+md:px-16\s+lg:px-24/g;
const widthRegexAlt = /max-w-\[1440px\]\s+mx-auto/g;

walkDir('./src', function (filePath) {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // Replace width classes
        content = content.replace(widthRegex, 'container-global');
        content = content.replace(widthRegexAlt, 'container-global');

        // Replace section paddings
        content = content.replace(/py-20\s+md:py-28/g, 'section-padding');
        content = content.replace(/py-24\s+md:py-32/g, 'section-padding');
        content = content.replace(/py-16\s+md:py-24/g, 'section-padding');
        content = content.replace(/py-14/g, 'section-padding');
        content = content.replace(/py-16/g, 'section-padding');

        if (content !== original) {
            fs.writeFileSync(filePath, content);
            console.log('Updated', filePath);
        }
    }
});
