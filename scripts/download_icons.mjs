import { writeFileSync, mkdirSync, existsSync, statSync, unlinkSync } from 'fs';
import { DATA } from '../src/data/items.js';

const ICONS_DIR = 'public/icons';
const OUTPUT_MAP_FILE = 'src/data/iconUrls.js';

const ALIASES = {
  'Power Crystal': 'empowering crystal',
  'Health Potion VI': 'hp potion vi',
  'Health Potion VII': 'hp potion vii',
  'Health Potion VIII': 'hp potion viii',
  'Essence of Light': 'light essence',
  'Nutrient Water': 'nutritive water',
  'Speed Dust': 'speed powder',
  'Fluid Conductor': 'fluid conduct',
  'Thermo-Magnetic Engine': 'thermo magnetic engine',
  'Plastic Board': 'plastic cloth',
  'Bone Fossil': 'fossil bone',
  'Carved Forest Figure': 'forest wood figure',
  'Poison Treated Crystal': 'poison treated glass',
  'Broom': 'broom spear',
  'Either Sable': 'ether sable',
  'Either Sable II': 'ether sable ii',
  'Either Sable III': 'ether sable iii',
  'Either Sable IV': 'ether sable iv',
  'Either Sable V': 'ether sable v',
  'Ragnarock Big Sword': 'ragnarok big sword',
  'Ragnarock Big Sword II': 'ragnarok big sword ii',
  'Ragnarock Big Sword III': 'ragnarok big sword iii',
  'Ragnarock Big Sword IV': 'ragnarok big sword iv',
  'Ragnarock Big Sword V': 'ragnarok big sword v',
};

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Referer': 'https://moonlighter.fandom.com/'
};

async function getAllWikiImages() {
  console.log('Fetching image catalog from Moonlighter wiki...');
  let allImages = [];
  let aicontinue = undefined;
  while (true) {
    let url = 'https://moonlighter.fandom.com/api.php?action=query&list=allimages&ailimit=500&format=json&origin=*';
    if (aicontinue) url += '&aicontinue=' + encodeURIComponent(aicontinue);
    const res = await fetch(url, { headers: BROWSER_HEADERS });
    const data = await res.json();
    allImages.push(...data.query.allimages);
    if (data.continue && data.continue.aicontinue) {
      aicontinue = data.continue.aicontinue;
    } else {
      break;
    }
  }
  console.log(`Fetched ${allImages.length} images from wiki catalog.`);
  return allImages;
}

async function downloadImage(url, destPath, retries = 3) {
  if (existsSync(destPath)) {
    const st = statSync(destPath);
    if (st.size > 200) return true;
    unlinkSync(destPath);
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, { headers: BROWSER_HEADERS });
      if (res.ok) {
        const buf = await res.arrayBuffer();
        if (buf.byteLength > 200) {
          writeFileSync(destPath, Buffer.from(buf));
          return true;
        }
      }
      if (res.status === 429 || res.status === 403) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
      }
    } catch (err) {
      await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  return false;
}

async function run() {
  mkdirSync(ICONS_DIR, { recursive: true });

  const wikiImages = await getAllWikiImages();
  const byCleanName = new Map();
  for (const img of wikiImages) {
    const base = img.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/_/g, ' ').replace(/-/g, ' ').trim();
    byCleanName.set(base, img);
  }

  const uniqueEn = [...new Set(DATA.map(i => i.en))];
  console.log(`Matching items...`);

  const iconMap = {};
  const downloadQueue = [];

  for (const enName of uniqueEn) {
    const targetKey = (ALIASES[enName] || enName).toLowerCase().replace(/-/g, ' ').trim();
    const match = byCleanName.get(targetKey);
    if (match) {
      const fileName = match.name;
      iconMap[enName] = fileName;
      downloadQueue.push({ url: match.url, fileName });
    }
  }

  const uniqueDownloads = [...new Map(downloadQueue.map(d => [d.fileName, d])).values()];
  console.log(`Checking/downloading ${uniqueDownloads.length} unique icon files...`);

  const BATCH_SIZE = 6;
  let successCount = 0;
  for (let i = 0; i < uniqueDownloads.length; i += BATCH_SIZE) {
    const batch = uniqueDownloads.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async item => {
        const dest = `${ICONS_DIR}/${item.fileName}`;
        const ok = await downloadImage(item.url, dest);
        if (ok) successCount++;
      })
    );
    process.stdout.write(`Progress: ${successCount}/${uniqueDownloads.length} files verified/downloaded\r`);
    await new Promise(r => setTimeout(r, 80));
  }

  console.log(`\nAll done! Successfully verified/downloaded: ${successCount}/${uniqueDownloads.length}`);

  const mapContent = `// Auto-generated icon mapping
// Total items: ${Object.keys(iconMap).length}
export const ICON_MAP = ${JSON.stringify(iconMap, null, 2)};
`;

  writeFileSync(OUTPUT_MAP_FILE, mapContent, 'utf8');
  console.log(`Saved mapping to ${OUTPUT_MAP_FILE}`);
}

run();
