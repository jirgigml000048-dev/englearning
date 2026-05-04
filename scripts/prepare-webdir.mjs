#!/usr/bin/env node
/**
 * 把网页静态文件复制到 dist/ 给 Capacitor 用。
 * dist/ 不进 git, 每次 CI 重新生成。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const DIST = path.join(ROOT, 'dist');

const ITEMS = [
  'index.html',
  'manifest.json',
  'service-worker.js',
  'css',
  'js',
  'assets',
  'audio'
];

function copyRecursive(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dst, child));
    }
  } else {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

let copied = 0;
for (const item of ITEMS) {
  const src = path.join(ROOT, item);
  if (!fs.existsSync(src)) {
    console.log(`· skip (missing) ${item}`);
    continue;
  }
  copyRecursive(src, path.join(DIST, item));
  copied++;
  console.log(`✓ ${item}`);
}

console.log(`\nCopied ${copied} items to dist/`);
