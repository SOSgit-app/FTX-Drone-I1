import fs from 'node:fs';
import path from 'node:path';

// Compile output goes to electron/dist/main.js (CommonJS). We want electron/main.cjs.
const root = path.resolve(process.cwd());
const jsPath = path.join(root, 'electron', 'dist', 'main.js');
const cjsPath = path.join(root, 'electron', 'main.cjs');

if (!fs.existsSync(jsPath)) {
  console.error(`Expected compiled file not found: ${jsPath}`);
  process.exit(1);
}

fs.copyFileSync(jsPath, cjsPath);
console.log('Wrote electron/main.cjs');

