import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const dir = 'brochure-page-renders-hires';
const out = 'brochure-page-renders-hires/_grids';
fs.mkdirSync(out, { recursive: true });

async function grid(name) {
  const img = await loadImage(path.join(dir, name));
  const scale = 0.35;
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  ctx.strokeStyle = 'rgba(0,255,0,0.55)';
  ctx.fillStyle = 'red';
  ctx.font = '11px sans-serif';
  ctx.lineWidth = 1;
  for (let x = 0; x < img.width; x += 100) {
    const sx = x * scale;
    ctx.beginPath();
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, h);
    ctx.stroke();
    ctx.fillText(String(x), sx + 1, 12);
  }
  for (let y = 0; y < img.height; y += 100) {
    const sy = y * scale;
    ctx.beginPath();
    ctx.moveTo(0, sy);
    ctx.lineTo(w, sy);
    ctx.stroke();
    ctx.fillText(String(y), 2, sy + 11);
  }
  const dest = path.join(out, name.replace('.png', '-grid.png'));
  fs.writeFileSync(dest, canvas.toBuffer('image/png'));
  console.log(dest, img.width, img.height);
}

for (const p of ['page-08.png', 'page-09.png', 'page-10.png', 'page-11.png', 'page-12.png', 'page-13.png', 'page-14.png', 'page-20.png']) {
  await grid(p);
}
