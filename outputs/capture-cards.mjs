import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = `file://${path.join(__dirname, 'story-cards.html')}`;
const outDir = path.join(__dirname, 'cards');
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
});
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
await page.goto(htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 2000));

const totalCards = await page.$$eval('.card', cards => cards.length);
console.log(`Found ${totalCards} cards, capturing...`);
for (let i = 1; i <= totalCards; i++) {
  const el = await page.$(`#card-${i}`);
  if (!el) continue;
  const outPath = path.join(outDir, `card-${i}.png`);
  await el.screenshot({ path: outPath, type: 'png' });
  const stat = fs.statSync(outPath);
  console.log(`card-${i}.png — ${Math.round(stat.size / 1024)}KB`);
}
await browser.close();
console.log('Done!');
