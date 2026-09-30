import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to 1920x1080
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Visiting Vercel...');
  await page.goto('https://pradipta-endra-maulana.vercel.app/', { waitUntil: 'networkidle0' });
  
  const vercelData = await page.evaluate(() => {
    const svgs = Array.from(document.querySelectorAll('.stroke-text__svg'));
    return svgs.map(s => {
      const rect = s.getBoundingClientRect();
      const parent = s.parentElement;
      const parentRect = parent.getBoundingClientRect();
      return {
        svgWidth: rect.width, svgY: rect.y,
        svgHeight: rect.height,
        parentWidth: parentRect.width,
        viewBox: s.getAttribute('viewBox'),
        inlineStyle: parent.getAttribute('style')
      };
    });
  });
  
  console.log('Vercel Metrics:', JSON.stringify(vercelData, null, 2));
  await page.screenshot({ path: 'vercel_screenshot.png' });

  // Now checking local (assuming npm run preview is on 5173)
  console.log('Visiting Localhost (preview)...');
  try {
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    const localData = await page.evaluate(() => {
      const svgs = Array.from(document.querySelectorAll('.stroke-text__svg'));
      return svgs.map(s => {
        const rect = s.getBoundingClientRect();
        const parent = s.parentElement;
        const parentRect = parent.getBoundingClientRect();
        return {
          svgWidth: rect.width, svgY: rect.y,
          svgHeight: rect.height,
          parentWidth: parentRect.width,
          viewBox: s.getAttribute('viewBox'),
          inlineStyle: parent.getAttribute('style')
        };
      });
    });
    console.log('Local Metrics:', JSON.stringify(localData, null, 2));
    await page.screenshot({ path: 'local_5173.png' });
  } catch (e) {
    console.log('Localhost failed:', e.message);
  }
  
  await browser.close();
})();
