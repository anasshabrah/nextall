// File: C:\Users\hanos\nextall\generate-relations.js
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = __dirname;
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'project-relations.txt');

function extractImportsExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const imports = [];
  const exports = [];
  
  // Match import statements
  const importRegex = /import\s+.*?\s+from\s+['"](.*?)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    if (!match[1].startsWith('.')) continue; // Skip node_modules imports
    const importPath = path.resolve(path.dirname(filePath), match[1]);
    imports.push(path.relative(PROJECT_ROOT, importPath));
  }

  // Match export statements
  const exportRegex = /export\s+(?:default|{[^}]+}\s+from\s+['"](.*?)['"]|function|const|let|var|class)/g;
  while ((match = exportRegex.exec(content)) !== null) {
    if (match[1]) { // Export from
      const exportFrom = path.resolve(path.dirname(filePath), match[1]);
      exports.push(path.relative(PROJECT_ROOT, exportFrom));
    } else { // Local export
      exports.push('(local)');
    }
  }

  return { imports, exports };
}

function analyzeDirectory(dirPath, relations = {}) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file === 'node_modules') return;
      analyzeDirectory(fullPath, relations);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      relations[path.relative(PROJECT_ROOT, fullPath)] = extractImportsExports(fullPath);
    }
  });

  return relations;
}

function generateReport() {
  const relations = analyzeDirectory(PROJECT_ROOT);
  let output = 'Project File Relationships:\n\n';

  for (const [file, data] of Object.entries(relations)) {
    output += `File: ${file}\n`;
    output += `Exports: ${data.exports.join(', ') || 'None'}\n`;
    output += `Imports From:\n${data.imports.map(i => `- ${i}`).join('\n')}\n`;
    output += '\n'.repeat(2);
  }

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`Relationship report generated at ${OUTPUT_FILE}`);
}

generateReport();