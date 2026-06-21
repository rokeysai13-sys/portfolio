const sharp = require('sharp');

const files = [
  'public/assets/hero1.png',
  'public/assets/sai-about.png',
  'public/assets/sai-footer.jpeg',
  'C:/Users/Sai kiran/.gemini/antigravity-ide/brain/a425b2a3-ff10-4c6c-b3ab-76581dea4b75/hero_portrait_1782047369130.png'
];

async function check() {
  for (const f of files) {
    try {
      const meta = await sharp(f).metadata();
      console.log(`${f}: ${meta.width}x${meta.height} (${meta.format})`);
    } catch (e) {
      console.error(`Error reading ${f}:`, e.message);
    }
  }
}

check();
