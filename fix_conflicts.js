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
let logs = "";

for (const file of files) {
  try {
    const ext = path.extname(file);
    if (!['.ts', '.tsx', '.js', '.jsx', '.json'].includes(ext)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<<<<<<< HEAD')) {
      logs += `Found conflicts in ${file}\n`;
      const regex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n([\s\S]*?)>>>>>>> [a-f0-9]+/g;
      
      let match;
      while ((match = regex.exec(content)) !== null) {
        logs += `\nIn ${file}:\n`;
        logs += `--HEAD CONTENT--\n${match[1]}--END HEAD--\n`;
        logs += `--REMOTE CONTENT--\n${match[2]}--END REMOTE--\n`;
      }
    }
  } catch (e) {
  }
}
fs.writeFileSync('conflicts_output_utf8.txt', logs, 'utf8');
