const fs = require('fs');
const sharp = require('sharp');

const srcPath = 'C:/Users/Sai kiran/.gemini/antigravity-ide/brain/a425b2a3-ff10-4c6c-b3ab-76581dea4b75/hero_portrait_1782047369130.png';

const outputs = [
  {
    path: 'public/assets/hero1.png',
    width: 373,
    height: 489,
    format: 'png'
  },
  {
    path: 'public/assets/sai-about.png',
    width: 572,
    height: 1024,
    format: 'jpeg' // original file format check was jpeg
  },
  {
    path: 'public/assets/sai-footer.jpeg',
    width: 1024,
    height: 572,
    format: 'png' // original file format check was png
  }
];

async function replace() {
  console.log(`Processing source image: ${srcPath}`);
  
  if (!fs.existsSync(srcPath)) {
    console.error('Source image does not exist! Please check the path.');
    return;
  }

  for (const out of outputs) {
    try {
      console.log(`Generating ${out.path} (${out.width}x${out.height})...`);
      
      let pipeline = sharp(srcPath)
        .resize(out.width, out.height, {
          fit: 'cover',
          position: 'entropy' // smart cropping around main features
        });

      if (out.format === 'png') {
        await pipeline.png().toFile(out.path);
      } else {
        await pipeline.jpeg({ quality: 100 }).toFile(out.path);
      }

      console.log(`Saved successfully to ${out.path}`);
    } catch (e) {
      console.error(`Error processing ${out.path}:`, e.message);
    }
  }
}

replace();
