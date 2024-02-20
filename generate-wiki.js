const fs = require('fs');
const path = require('path');

const rootDirectory = '.';  // 루트 디렉토리로 가정

function isMarkdownFile(name) {
    return name.endsWith('.md') && !name.startsWith('README');
}

function sanitizeFileName(name) {
    return name.replace(/\s/g, '%20');
}

function hasMarkdownFiles(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);

        if (isMarkdownFile(file)) {
            return true;
        } else if (fs.statSync(filePath).isDirectory()) {
            if (hasMarkdownFiles(filePath)) {
                return true;
            }
        }
    }

    return false;
}

function generateWiki(directory, level) {
    const files = fs.readdirSync(directory);

    let wikiContent = '';

    for (const file of files) {
        const filePath = path.join(directory, file);

        if (isMarkdownFile(file)) {
            wikiContent += `- [${file}](${sanitizeFileName(filePath)})\n`;
        } else if (fs.statSync(filePath).isDirectory() && hasMarkdownFiles(filePath)) {
            const heading = '#'.repeat(level + 1);
            wikiContent += `\n${heading} [${sanitizeFileName(file)}](${filePath}/README.md)\n`;
            
            wikiContent += generateWiki(filePath, level + 1);
        }
    }

    return wikiContent;
}

function generateReadme(directory) {
    let readmeContent = '# 프로젝트 위키\n\n' +
        '## 프로젝트명\n\n' +
        '프로젝트명 (프로젝트에 대한 간략한 설명)\n\n' +
        '## 소개\n\n' +
        '프로젝트의 목적과 주요 기능에 대한 간략한 소개를 제공합니다.\n\n' +
        '## 시작하기\n\n' +
        '프로젝트를 실행하고 개발에 참여하기 위한 기본 단계를 안내합니다.\n\n' +
        '## 사용법\n\n' +
        '프로젝트의 기능과 사용법에 대한 자세한 설명을 제공합니다.\n';

    readmeContent += generateWiki(directory, 1);

    readmeContent += '\n### 예시\n\n' +
        '프로젝트의 사용 예시 코드나 명령어를 제공합니다.\n\n' +
        '```javascript\n' +
        'const example = new Example();\n' +
        'example.run();\n' +
        '```\n';

    return readmeContent;
}

const readmeContent = generateReadme(rootDirectory);

fs.writeFileSync('README.md', readmeContent);
console.log('README.md generated successfully.');
