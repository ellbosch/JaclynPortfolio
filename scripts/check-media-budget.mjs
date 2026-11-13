// Media budget check: run with `npm run check:media` before a deploy.
// Fails if a bucket file referenced by the site is missing resized copies/poster,
// or if any file the browser will actually download is over budget.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BUCKET = 'https://storage.googleapis.com/jaclyn-portfolio-20d22-media/';
const IMAGE_MAX = 1.5e6; // largest image variant a browser may pick
const VIDEO_MAX = 15e6; // per video file
const manifest = JSON.parse(readFileSync('src/data/mediaManifest.json', 'utf8'));

const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(p) && files.push(p); });
walk('src');
const urls = new Set(files.flatMap((f) => readFileSync(f, 'utf8').match(/https:\/\/storage\.googleapis\.com\/jaclyn-portfolio-20d22-media\/[^'"`\s)]+/g) ?? []));

const problems = [];
const size = async (u) => Number((await fetch(u, { method: 'HEAD' })).headers.get('content-length'));
for (const u of urls) {
  const e = manifest[u];
  const isVideo = /\.(mp4|mov|webm)$/i.test(u);
  if (!e) { problems.push(`no optimized copies: ${u.replace(BUCKET, '')}`); continue; }
  if (isVideo) {
    if (!e.poster) problems.push(`no poster: ${u.replace(BUCKET, '')}`);
    const s = await size(u);
    if (s > VIDEO_MAX) problems.push(`video ${(s / 1e6).toFixed(1)} MB > ${VIDEO_MAX / 1e6} MB: ${u.replace(BUCKET, '')}`);
  } else {
    const biggest = e.variants?.at(-1)?.[1];
    const s = biggest ? await size(biggest) : 0;
    if (s > IMAGE_MAX) problems.push(`image ${(s / 1e6).toFixed(1)} MB > ${IMAGE_MAX / 1e6} MB: ${u.replace(BUCKET, '')}`);
  }
}
console.log(`${urls.size} media files checked, ${problems.length} over budget or unoptimized`);
problems.forEach((p) => console.log(' - ' + p));
process.exit(problems.length ? 1 : 0);
