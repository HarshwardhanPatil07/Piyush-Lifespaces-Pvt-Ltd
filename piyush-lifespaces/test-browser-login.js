const puppeteer = require('puppeteer');

async function testLoginFlow() {
  let browser;
  try {
    console.log('🚀 Starting comprehensive login flow test...\n');
    
    // Launch browser
    browser = await puppeteer.launch({ 
      headless: false, // Show browser for debugging
      defaultViewport: null,
      args: ['--start-maximized']
    });
    
    const page = await browser.newPage();
    
    // Enable console logging from the page
    page.on('console', msg => console.log('📱 Browser:', msg.text()));
    
    console.log('1. Navigating to admin login page...');
    await page.goto('http://localhost:3000/admin/login');
    await page.waitForSelector('input[name="email"]');
    
    console.log('2. Filling login form...');
    await page.type('input[name="email"]', 'admin@piyushlifespaces.com');
    await page.type('input[name="password"]', 'admin123');
    
    console.log('3. Submitting login form...');
    await page.click('button[type="submit"]');
    
    // Wait for navigation or response
    await page.waitForTimeout(2000);
    
    console.log('4. Current URL after login:', page.url());
    
    // Check if we're on the admin dashboard
    if (page.url().includes('/admin') && !page.url().includes('/admin/login')) {
      console.log('✅ SUCCESS: Redirected to admin dashboard!');
    } else {
      console.log('❌ FAILED: Still on login page or wrong redirect');
    }
    
    console.log('5. Checking for admin dashboard elements...');
    try {
      await page.waitForSelector('h1', { timeout: 5000 });
      const title = await page.$eval('h1', el => el.textContent);
      console.log('   Page title:', title);
    } catch (err) {
      console.log('   Could not find title element');
    }
    
    console.log('\n🎉 Test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the test
testLoginFlow();
