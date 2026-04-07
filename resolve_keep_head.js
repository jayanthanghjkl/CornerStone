const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
      results = results.concat(walk(file));
    } else if (stat && stat.isFile()) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(__dirname);
let fixedFiles = 0;

for (const file of files) {
  try {
    const ext = path.extname(file);
    if (!['.ts', '.tsx', '.js', '.jsx', '.json'].includes(ext)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<<<<<<< HEAD')) {
      // Replace entire conflict block with just the HEAD content
      const regex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n([\s\S]*?)>>>>>>> [a-f0-9]+\r?\n?/g;
      
      const newContent = content.replace(regex, '$1');
      fs.writeFileSync(file, newContent, 'utf8');
      fixedFiles++;
      console.log(`Fixed conflicts in ${file}`);
    }
  } catch (e) {
  }
}
console.log(`Total fixed: ${fixedFiles}`);
