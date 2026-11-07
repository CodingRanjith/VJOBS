import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

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
Object.values(out).forEach((d) => fs.mkdirSync(d, { recursive: true }));

async function crop(page, x, y, w, h, dest) {
  const img = await loadImage(path.join(pagesDir, page));
  // clamp
  const cx = Math.max(0, Math.min(x, img.width - 1));
  const cy = Math.max(0, Math.min(y, img.height - 1));
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

// Hires page size ~2083 x 2947
// ---- PAGE 01 logo badge ----
await crop('page-01.png', 720, 980, 640, 640, path.join(out.logo, 'manpower-badge.png'));
await crop('page-01.png', 960, 60, 160, 150, path.join(out.logo, 'ganesha-icon.png'));

// ---- PAGE 08 leadership ----
await crop('page-08.png', 1280, 220, 620, 780, path.join(out.team, 'dr-narasimman.png'));
await crop('page-08.png', 180, 1550, 620, 780, path.join(out.team, 'mrs-gunasundari.png'));

// ---- PAGE 09 CEO ----
await crop('page-09.png', 620, 360, 840, 1180, path.join(out.team, 'rajan-sekar.png'));

// ---- PAGE 11 Alex + Malaysia team ----
await crop('page-11.png', 640, 360, 800, 980, path.join(out.team, 'alex-selvam.png'));
await crop('page-11.png', 180, 2100, 1720, 620, path.join(out.team, 'malaysia-team.png'));

// ---- PAGE 10 staff photos (3 stacked/side) ----
await crop('page-10.png', 180, 280, 1720, 700, path.join(out.office, 'staff-office-1.png'));
await crop('page-10.png', 180, 1150, 820, 1100, path.join(out.office, 'staff-office-2.png'));
await crop('page-10.png', 1080, 1150, 820, 1100, path.join(out.office, 'staff-office-3.png'));

// ---- PAGE 12 infrastructure — photo regions only ----
await crop('page-12.png', 200, 300, 1680, 620, path.join(out.office, 'clients-meeting.png'));
await crop('page-12.png', 200, 1080, 1680, 620, path.join(out.office, 'interview-hall.png'));
await crop('page-12.png', 200, 1860, 1680, 720, path.join(out.office, 'client-interview.png'));

// ---- PAGE 13 CNC individual tiles (approx parallelogram boxes) ----
await crop('page-13.png', 170, 300, 560, 360, path.join(out.industries, 'cnc-lathe.png'));
await crop('page-13.png', 760, 300, 560, 360, path.join(out.industries, 'cnc-grinding.png'));
await crop('page-13.png', 1350, 300, 560, 360, path.join(out.industries, 'cnc-milling.png'));
await crop('page-13.png', 120, 700, 430, 340, path.join(out.industries, 'cnc-turning.png'));
await crop('page-13.png', 580, 700, 430, 340, path.join(out.industries, 'edm-wirecut.png'));
await crop('page-13.png', 1040, 700, 430, 340, path.join(out.industries, 'welding.png'));
await crop('page-13.png', 1500, 700, 430, 340, path.join(out.industries, 'general-workers.png'));
// CNC collage for cards
await crop('page-13.png', 140, 280, 1800, 780, path.join(out.industries, 'cnc-manufacturing.png'));
// Civil tiles
await crop('page-13.png', 140, 1220, 430, 300, path.join(out.industries, 'brick-mason.png'));
await crop('page-13.png', 600, 1220, 430, 300, path.join(out.industries, 'civil-engineer.png'));
await crop('page-13.png', 1060, 1220, 430, 300, path.join(out.industries, 'construction-manager.png'));
await crop('page-13.png', 1520, 1220, 430, 300, path.join(out.industries, 'construction-workers.png'));
await crop('page-13.png', 140, 1220, 1800, 1500, path.join(out.industries, 'civil-construction.png'));

// ---- PAGE 14 plantation / hospitals ----
await crop('page-14.png', 140, 280, 1800, 900, path.join(out.industries, 'plantation.png'));
await crop('page-14.png', 140, 1300, 1800, 1100, path.join(out.industries, 'hospitals-hotels.png'));
await crop('page-14.png', 160, 320, 860, 700, path.join(out.industries, 'plantation-work.png'));
await crop('page-14.png', 160, 1400, 860, 700, path.join(out.industries, 'hospitality-staff.png'));

// ---- PAGE 03 banners ----
await crop('page-03.png', 80, 1750, 1920, 900, path.join(out.banners, 'global-reach.png'));
await crop('page-03.png', 160, 280, 1760, 900, path.join(out.banners, 'about-content.png'));

// ---- PAGE 04 licences ----
await crop('page-04.png', 180, 320, 1720, 680, path.join(out.certificates, 'license-1.png'));
await crop('page-04.png', 180, 1080, 1720, 680, path.join(out.certificates, 'license-2.png'));
await crop('page-04.png', 180, 1840, 1720, 680, path.join(out.certificates, 'license-3.png'));

// ---- PAGE 17/18 clients ----
await crop('page-17.png', 140, 400, 1800, 1100, path.join(out.clients, 'middle-east-clients.png'));
await crop('page-18.png', 140, 400, 1800, 1700, path.join(out.clients, 'malaysia-gabon-clients.png'));

// ---- PAGE 20 certificates 2x2 on navy section ----
await crop('page-20.png', 220, 1850, 720, 480, path.join(out.certificates, 'gst.png'));
await crop('page-20.png', 1120, 1850, 720, 480, path.join(out.certificates, 'msme.png'));
await crop('page-20.png', 220, 2360, 720, 480, path.join(out.certificates, 'mea.png'));
await crop('page-20.png', 1120, 2360, 720, 480, path.join(out.certificates, 'emigrate.png'));

console.log('precise crop complete');
