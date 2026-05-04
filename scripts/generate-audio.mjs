#!/usr/bin/env node
/**
 * 用 ElevenLabs API 生成所有单词 + 课文段落的 MP3 文件。
 *
 * 用法（在项目根目录运行）：
 *   ELEVENLABS_API_KEY=sk-xxx node scripts/generate-audio.mjs
 *
 * 可选环境变量：
 *   ELEVENLABS_VOICE_ID    指定 voice id (默认 EXAVITQu4vr4xnSDxMaL = Sarah, 适合儿童)
 *   ELEVENLABS_MODEL       默认 eleven_multilingual_v2
 *   FORCE                  =1 时强制重新生成已存在的文件
 *
 * 推荐 voice id (摘自 ElevenLabs 官方库):
 *   EXAVITQu4vr4xnSDxMaL  Sarah     美国女声, 温柔清晰, ★默认
 *   21m00Tcm4TlvDq8ikWAM  Rachel    美国女声, 标准
 *   AZnzlk1XvdvUeBnXmlld  Domi      美国女声, 活泼
 *   bIHbv24MWmeRgasZH58o  Will      美国男声, 清晰
 *   pFZP5JQG7iQjIQuC4Bku  Lily      英国女声
 *
 * 输出：
 *   audio/words/<slug>.mp3      每个单词
 *   audio/paragraphs/<id>.mp3   每个课文段落
 *
 * 大概用量：
 *   ~127 个单词 × 6 字符 ≈ 760
 *   ~24 篇课文 × 5 段 × 80 字符 ≈ 9600
 *   总计约 10k 字符, ElevenLabs 免费层每月 10k 刚好够
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error('❌ Missing ELEVENLABS_API_KEY. Run with:');
  console.error('   ELEVENLABS_API_KEY=sk-xxx node scripts/generate-audio.mjs');
  process.exit(1);
}

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
const FORCE = process.env.FORCE === '1';

// --- Load CURRICULUM by eval-ing data.js -------------------------------
const dataCode = fs.readFileSync(path.join(ROOT, 'js/data.js'), 'utf8');
const win = {};
new Function('window', dataCode)(win);
const C = win.CURRICULUM;

// 收集所有要生成的项 ----------------------------------------------------
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

// Strip HTML tags from sentences (e.g. <b>...</b>) before TTS
const stripHtml = (s) => String(s || '').replace(/<[^>]*>/g, '');

const items = [];

// 1) Words
const wordsSeen = new Set();
for (const u of C.units) {
  for (const w of u.words) {
    if (wordsSeen.has(w.en)) continue;
    wordsSeen.add(w.en);
    items.push({
      out: path.join(ROOT, 'audio', 'words', slugify(w.en) + '.mp3'),
      text: w.en
    });
  }
}

// 2) Reading paragraphs
for (const u of C.units) {
  for (const r of u.readings) {
    r.paragraphs.forEach((p, i) => {
      items.push({
        out: path.join(ROOT, 'audio', 'paragraphs', `${r.id}-p${i}.mp3`),
        text: stripHtml(p)
      });
    });
  }
}

// 3) Example sentences for words (for "听一听例句" feature)
for (const u of C.units) {
  for (const w of u.words) {
    items.push({
      out: path.join(ROOT, 'audio', 'sentences', slugify(w.en) + '.mp3'),
      text: stripHtml(w.sentence)
    });
  }
}

console.log(`📋 Plan: ${items.length} audio files`);
console.log(`   Voice: ${VOICE_ID} | Model: ${MODEL}`);
console.log(`   Force regenerate: ${FORCE ? 'YES' : 'no'}`);

// --- Calls ------------------------------------------------------------
async function tts(text, outPath) {
  if (!FORCE && fs.existsSync(outPath)) {
    return { skipped: true };
  }
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const body = {
    text,
    model_id: MODEL,
    voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.2, use_speaker_boost: true }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.text();
    return { error: `${res.status} ${err}` };
  }

  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
  return { bytes: buf.length };
}

let ok = 0, skipped = 0, failed = 0;
const failures = [];

for (let i = 0; i < items.length; i++) {
  const { out, text } = items[i];
  const tag = `[${String(i + 1).padStart(3, ' ')}/${items.length}]`;
  const rel = path.relative(ROOT, out);
  process.stdout.write(`${tag} ${rel.padEnd(45)} `);

  try {
    const r = await tts(text, out);
    if (r.skipped) { console.log('· skip (exists)'); skipped++; }
    else if (r.error) { console.log('✗ ' + r.error); failed++; failures.push({ out, error: r.error }); }
    else { console.log(`✓ ${r.bytes} bytes`); ok++; }
  } catch (e) {
    console.log('✗ ' + e.message);
    failed++; failures.push({ out, error: e.message });
  }

  // Rate limit gentle: 250ms between calls
  if (!FORCE && fs.existsSync(out) === false) await new Promise(r => setTimeout(r, 250));
}

console.log('');
console.log(`Done. ✓ ${ok} generated · · ${skipped} skipped · ✗ ${failed} failed`);
if (failures.length) {
  console.log('\nFailures:');
  failures.slice(0, 10).forEach(f => console.log('  ' + path.basename(f.out) + ' — ' + f.error));
}
