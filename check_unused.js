import fs from 'fs';
import path from 'path';

const projectRoot = 'd:/GzoneSphere_Main/GzoneSphere_Codes_Resumes_Team/CODES/Website/Frontend/Frontend-v1/src';

function getAllFiles(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const allFiles = getAllFiles(projectRoot).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
const profileDir = path.join(projectRoot, 'public/pages/profile');
const profileFiles = fs.readdirSync(profileDir).filter(f => f.endsWith('.jsx'));

const usageCount = {};
profileFiles.forEach(f => usageCount[f] = 0);

allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    profileFiles.forEach(pf => {
        const baseName = path.basename(pf, '.jsx');
        // Simple check for import
        if (content.includes(`/${baseName}'`) || content.includes(`/${baseName}"`) || content.includes(`${baseName} = lazy`)) {
            usageCount[pf]++;
        }
    });
});

console.log(JSON.stringify(usageCount, null, 2));
