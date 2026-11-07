import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const pagesDir = 'brochure-page-renders-hires';
const outInd = 'vinayaga-associates/assets/images/industries';
const outOff = 'vinayaga-associates/assets/images/office';
const outTeam = 'vinayaga-associates/assets/images/team';
const outCert = 'vinayaga-associates/assets/images/certificates';
const outLogo = 'vinayaga-associates/assets/images/logo';
const outBan = 'vinayaga-associates/assets/images/banners';

async function crop(page, x, y, w, h, dest) {
  const img = await loadImage(path.join(pagesDir, page));
  const cx = Math.max(0, x);
  const cy = Math.max(0, y);
  const cw = Math.min(w, img.width - cx);
  const ch = Math.min(h, img.height - cy);
  const canvas = createCanvas(cw, ch);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, cx, cy, cw, ch, 0, 0, cw, ch);
  fs.writeFileSync(dest, canvas.toBuffer('image/png'));
  console.log(path.basename(dest), `${cw}x${ch}`);
}

// Office — photo rectangles only (exclude titles)
await crop('page-12.png', 250, 390, 1580, 520, path.join(outOff, 'clients-meeting.png'));
await crop('page-12.png', 250, 1180, 1580, 500, path.join(outOff, 'interview-hall.png'));
await crop('page-12.png', 250, 1980, 1580, 560, path.join(outOff, 'client-interview.png'));

// Staff page 10 — photos only
await crop('page-10.png', 220, 360, 1640, 600, path.join(outOff, 'staff-office-1.png'));
await crop('page-10.png', 220, 1220, 780, 1000, path.join(outOff, 'staff-office-2.png'));
await crop('page-10.png', 1100, 1220, 780, 1000, path.join(outOff, 'staff-office-3.png'));

// Team — tighter portrait windows
await crop('page-08.png', 1320, 260, 560, 700, path.join(outTeam, 'dr-narasimman.png'));
await crop('page-08.png', 220, 1600, 560, 700, path.join(outTeam, 'mrs-gunasundari.png'));
await crop('page-09.png', 680, 400, 740, 1050, path.join(outTeam, 'rajan-sekar.png'));
await crop('page-11.png', 680, 380, 720, 900, path.join(outTeam, 'alex-selvam.png'));
await crop('page-11.png', 220, 2140, 1640, 560, path.join(outTeam, 'malaysia-team.png'));

// CNC tiles — inset into photo area (reduce orange chrome)
await crop('page-13.png', 210, 320, 480, 280, path.join(outInd, 'cnc-lathe.png'));
await crop('page-13.png', 800, 320, 480, 280, path.join(outInd, 'cnc-grinding.png'));
await crop('page-13.png', 1390, 320, 480, 280, path.join(outInd, 'cnc-milling.png'));
await crop('page-13.png', 160, 720, 380, 260, path.join(outInd, 'cnc-turning.png'));
await crop('page-13.png', 620, 720, 380, 260, path.join(outInd, 'edm-wirecut.png'));
await crop('page-13.png', 1080, 720, 380, 260, path.join(outInd, 'welding.png'));
await crop('page-13.png', 1540, 720, 380, 260, path.join(outInd, 'general-workers.png'));
await crop('page-13.png', 160, 300, 1760, 700, path.join(outInd, 'cnc-manufacturing.png'));

// Civil tiles inset
await crop('page-13.png', 170, 1260, 400, 240, path.join(outInd, 'brick-mason.png'));
await crop('page-13.png', 630, 1260, 400, 240, path.join(outInd, 'civil-engineer.png'));
await crop('page-13.png', 1090, 1260, 400, 240, path.join(outInd, 'construction-manager.png'));
await crop('page-13.png', 1550, 1260, 400, 240, path.join(outInd, 'construction-workers.png'));
await crop('page-13.png', 150, 1240, 1780, 1450, path.join(outInd, 'civil-construction.png'));

// Plantation / hospitals — photo heavy areas
await crop('page-14.png', 180, 340, 1720, 820, path.join(outInd, 'plantation.png'));
await crop('page-14.png', 180, 1380, 1720, 1000, path.join(outInd, 'hospitals-hotels.png'));
await crop('page-14.png', 200, 380, 800, 620, path.join(outInd, 'plantation-work.png'));
await crop('page-14.png', 200, 1480, 800, 620, path.join(outInd, 'hospitality-staff.png'));

// Banner: landmarks photo strip only
await crop('page-03.png', 100, 1850, 1880, 780, path.join(outBan, 'global-reach.png'));

// Certificates — full bottom board as one clear strip + individuals
await crop('page-20.png', 160, 1780, 1760, 1000, path.join(outCert, 'certificates-board.png'));
await crop('page-20.png', 280, 1900, 560, 400, path.join(outCert, 'gst.png'));
await crop('page-20.png', 1180, 1900, 560, 400, path.join(outCert, 'msme.png'));
await crop('page-20.png', 280, 2400, 560, 400, path.join(outCert, 'mea.png'));
await crop('page-20.png', 1180, 2400, 560, 400, path.join(outCert, 'emigrate.png'));

// Logo badge clean center
await crop('page-01.png', 760, 1020, 560, 560, path.join(outLogo, 'manpower-badge.png'));

console.log('final photo crops done');
