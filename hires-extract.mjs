import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath =
  'c:/Users/acer/.cursor/projects/d-VJOBS/attachments/4a2a039c-d3fa-4662-8885-e56ae9cb1f28/Vinayaga_Associates_Broucher__2__compressed.pdf';
const pagesDir = 'brochure-page-renders-hires';
const out = {
  logo: 'vinayaga-associates/assets/images/logo',
  team: 'vinayaga-associates/assets/images/team',
  clients: 'vinayaga-associates/assets/images/clients',
  certificates: 'vinayaga-associates/assets/images/certificates',
  office: 'vinayaga-associates/assets/images/office',
  banners: 'vinayaga-associates/assets/images/banners',
  industries: 'vinayaga-associates/assets/images/industries',
};

fs.mkdirSync(pagesDir, { recursive: true });
Object.values(out).forEach((d) => fs.mkdirSync(d, { recursive: true }));

const scale = 3.5; // sharper source than previous 2x render
const neededPages = [1, 3, 4, 8, 9, 10, 11, 12, 13, 14, 17, 18, 20];

console.log('Rendering selected brochure pages at scale', scale);
const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await getDocument({ data, verbosity: 0 }).promise;

for (const pageNum of neededPages) {
  const page = await doc.getPage(pageNum);
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext('2d');
  await page.render({
    canvasContext: context,
    viewport,
    canvasFactory: {
      create(w, h) {
        const c = createCanvas(w, h);
        return { canvas: c, context: c.getContext('2d') };
      },
      reset(canvasAndContext, w, h) {
        canvasAndContext.canvas.width = w;
        canvasAndContext.canvas.height = h;
      },
      destroy() {},
    },
  }).promise;
  const file = path.join(pagesDir, `page-${String(pageNum).padStart(2, '0')}.png`);
  fs.writeFileSync(file, canvas.toBuffer('image/png'));
  console.log('rendered', file, Math.round(viewport.width), 'x', Math.round(viewport.height));
}

async function crop(pageFile, box, dest, { circle = false, qualityBoost = true } = {}) {
  const img = await loadImage(path.join(pagesDir, pageFile));
  const { x, y, w, h } = box;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  if (circle) {
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
  }
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  fs.writeFileSync(dest, canvas.toBuffer('image/png'));
  console.log('cropped', dest, `${w}x${h}`);
}

// Page size at scale 3.5 ≈ 2084 x 2947 (was 1191 x 1684 at 2x)
// Factor from old coords: 3.5/2 = 1.75
const F = 3.5 / 2;

function scaled(box) {
  return {
    x: Math.round(box.x * F),
    y: Math.round(box.y * F),
    w: Math.round(box.w * F),
    h: Math.round(box.h * F),
  };
}

console.log('Cropping clear brochure photos...');

// Cover badge / logo mark
await crop('page-01.png', scaled({ x: 395, y: 560, w: 400, h: 400 }), path.join(out.logo, 'manpower-badge.png'));
await crop('page-01.png', scaled({ x: 545, y: 35, w: 100, h: 95 }), path.join(out.logo, 'ganesha-icon.png'));

// Leadership — tighter face/torso crops from brochure portraits
await crop('page-08.png', scaled({ x: 730, y: 160, w: 360, h: 430 }), path.join(out.team, 'dr-narasimman.png'));
await crop('page-08.png', scaled({ x: 110, y: 940, w: 360, h: 430 }), path.join(out.team, 'mrs-gunasundari.png'));
await crop('page-09.png', scaled({ x: 340, y: 230, w: 510, h: 680 }), path.join(out.team, 'rajan-sekar.png'));
await crop('page-11.png', scaled({ x: 360, y: 250, w: 470, h: 520 }), path.join(out.team, 'alex-selvam.png'));
await crop('page-11.png', scaled({ x: 100, y: 1220, w: 990, h: 340 }), path.join(out.team, 'malaysia-team.png'));

// Office / infrastructure photos — crop photo frames only
await crop('page-10.png', scaled({ x: 100, y: 200, w: 990, h: 380 }), path.join(out.office, 'staff-office-1.png'));
await crop('page-10.png', scaled({ x: 100, y: 700, w: 460, h: 620 }), path.join(out.office, 'staff-office-2.png'));
await crop('page-10.png', scaled({ x: 620, y: 700, w: 460, h: 620 }), path.join(out.office, 'staff-office-3.png'));
await crop('page-12.png', scaled({ x: 100, y: 220, w: 990, h: 360 }), path.join(out.office, 'clients-meeting.png'));
await crop('page-12.png', scaled({ x: 100, y: 700, w: 460, h: 620 }), path.join(out.office, 'interview-hall.png'));
await crop('page-12.png', scaled({ x: 620, y: 700, w: 460, h: 620 }), path.join(out.office, 'client-interview.png'));

// Certificates
await crop('page-04.png', scaled({ x: 120, y: 220, w: 950, h: 360 }), path.join(out.certificates, 'license-1.png'));
await crop('page-04.png', scaled({ x: 120, y: 650, w: 950, h: 360 }), path.join(out.certificates, 'license-2.png'));
await crop('page-04.png', scaled({ x: 120, y: 1090, w: 950, h: 360 }), path.join(out.certificates, 'license-3.png'));
await crop('page-20.png', scaled({ x: 70, y: 1000, w: 240, h: 240 }), path.join(out.certificates, 'gst.png'));
await crop('page-20.png', scaled({ x: 340, y: 1000, w: 240, h: 240 }), path.join(out.certificates, 'msme.png'));
await crop('page-20.png', scaled({ x: 610, y: 1000, w: 240, h: 240 }), path.join(out.certificates, 'mea.png'));
await crop('page-20.png', scaled({ x: 880, y: 1000, w: 240, h: 240 }), path.join(out.certificates, 'emigrate.png'));

// Client logo boards
await crop('page-17.png', scaled({ x: 90, y: 250, w: 1010, h: 560 }), path.join(out.clients, 'middle-east-clients.png'));
await crop('page-18.png', scaled({ x: 90, y: 250, w: 1010, h: 860 }), path.join(out.clients, 'malaysia-gabon-clients.png'));

// Industry trade photos — split CNC / civil / plantation / hospitals into clearer tiles
await crop('page-13.png', scaled({ x: 90, y: 210, w: 320, h: 280 }), path.join(out.industries, 'cnc-lathe.png'));
await crop('page-13.png', scaled({ x: 430, y: 210, w: 320, h: 280 }), path.join(out.industries, 'cnc-grinding.png'));
await crop('page-13.png', scaled({ x: 770, y: 210, w: 320, h: 280 }), path.join(out.industries, 'cnc-milling.png'));
await crop('page-13.png', scaled({ x: 90, y: 520, w: 240, h: 260 }), path.join(out.industries, 'cnc-turning.png'));
await crop('page-13.png', scaled({ x: 350, y: 520, w: 240, h: 260 }), path.join(out.industries, 'edm-wirecut.png'));
await crop('page-13.png', scaled({ x: 600, y: 520, w: 240, h: 260 }), path.join(out.industries, 'welding.png'));
await crop('page-13.png', scaled({ x: 850, y: 520, w: 240, h: 260 }), path.join(out.industries, 'general-workers.png'));
await crop('page-13.png', scaled({ x: 90, y: 920, w: 500, h: 420 }), path.join(out.industries, 'civil-construction.png'));
await crop('page-13.png', scaled({ x: 610, y: 920, w: 480, h: 420 }), path.join(out.industries, 'construction-team.png'));
await crop('page-13.png', scaled({ x: 90, y: 180, w: 1010, h: 620 }), path.join(out.industries, 'cnc-manufacturing.png'));

await crop('page-14.png', scaled({ x: 90, y: 210, w: 500, h: 420 }), path.join(out.industries, 'plantation.png'));
await crop('page-14.png', scaled({ x: 610, y: 210, w: 480, h: 420 }), path.join(out.industries, 'plantation-work.png'));
await crop('page-14.png', scaled({ x: 90, y: 920, w: 500, h: 420 }), path.join(out.industries, 'hospitals-hotels.png'));
await crop('page-14.png', scaled({ x: 610, y: 920, w: 480, h: 420 }), path.join(out.industries, 'hospitality-staff.png'));

// Banners
await crop('page-03.png', scaled({ x: 50, y: 1000, w: 1090, h: 480 }), path.join(out.banners, 'global-reach.png'));
await crop('page-03.png', scaled({ x: 80, y: 180, w: 1030, h: 520 }), path.join(out.banners, 'about-content.png'));

console.log('Done — brochure-only high-res assets ready');
