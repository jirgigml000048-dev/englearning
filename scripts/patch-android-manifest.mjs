#!/usr/bin/env node
/**
 * 在 Capacitor 生成的 AndroidManifest.xml 里幂等加入麦克风权限。
 * 必须 cap add android 之后、cap sync 之前跑。
 *
 * 加入:
 *   - RECORD_AUDIO        (跟读关录音必需)
 *   - MODIFY_AUDIO_SETTINGS (有些 ROM 需要才能改 audio source)
 *
 * 已存在则跳过, 不重复添加。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MANIFEST = path.join(ROOT, 'android/app/src/main/AndroidManifest.xml');

if (!fs.existsSync(MANIFEST)) {
  console.error('❌ AndroidManifest.xml not found at', MANIFEST);
  process.exit(1);
}

const PERMS = [
  'android.permission.RECORD_AUDIO',
  'android.permission.MODIFY_AUDIO_SETTINGS'
];

let xml = fs.readFileSync(MANIFEST, 'utf8');
let changed = false;

for (const perm of PERMS) {
  if (xml.includes(perm)) {
    console.log(`· skip (already present) ${perm}`);
    continue;
  }
  // 在 </manifest> 前插入权限声明
  const tag = `    <uses-permission android:name="${perm}" />\n`;
  xml = xml.replace(/(\s*<\/manifest>)/, '\n' + tag + '$1');
  console.log(`✓ add ${perm}`);
  changed = true;
}

if (changed) {
  fs.writeFileSync(MANIFEST, xml);
  console.log('\nAndroidManifest.xml updated.');
} else {
  console.log('\nNo changes needed.');
}
