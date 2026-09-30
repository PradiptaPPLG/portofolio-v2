import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1080});
  
  try {
    await page.goto('http://localhost:4173/');
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: 'C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\1dc109a1-98c9-441a-8c2b-5050bf91f8fc\\local_4173_snap.png'});
    console.log("Screenshot taken!");
  } catch(e) {
    console.error(e);
  }
  
  await browser.close();
})();
