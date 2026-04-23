import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const out = path.join(root, 'dist-renderer');

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  fs.cpSync(src, dst, { recursive: true });
}

function copyFile(src, dst) {
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

if (!exists(out)) {
  console.error(`Missing build output folder: ${out}`);
  process.exit(1);
}

// Keep relative paths working in production:
// - index.html expects VID/... and MP3/... beside it
// - smoke/fire frames folders are referenced by name
// - images/gifs referenced by filename
const copyDirs = [
  'VID',
  'MP3',
  'footagecrate-ground-fire-10',
  'FootageCrate-Smoke_Plume_Accent_2',
];

for (const d of copyDirs) {
  const src = path.join(root, d);
  if (!exists(src)) continue;
  copyDir(src, path.join(out, d));
}

// Top-level image/gif assets
const topLevelFiles = fs.readdirSync(root, { withFileTypes: true })
  .filter((e) => e.isFile())
  .map((e) => e.name)
  .filter((n) => /\.(png|gif|ico)$/i.test(n));

for (const f of topLevelFiles) {
  copyFile(path.join(root, f), path.join(out, f));
}

// Also copy scoring key JSON(s) that the renderer reads (embedded in index.html too, but keep file present)
['scoring-key-VA.json', 'scoring-key-VB.json', 'scoring-key-VC.json'].forEach((f) => {
  const src = path.join(root, f);
  if (exists(src)) copyFile(src, path.join(out, f));
});

console.log('Static assets copied into dist-renderer/');

