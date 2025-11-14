const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to desktop size
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to the demo page
  await page.goto('http://localhost:3000/patient/results/demo');
  
  // Wait for content to load
  await page.waitForTimeout(3000);
  
  // Take full page screenshot
  await page.screenshot({ 
    path: 'lab-results-screenshot.png',
    fullPage: true 
  });
  
  console.log('✅ Screenshot saved as lab-results-screenshot.png');
  
  await browser.close();
})();
