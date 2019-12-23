const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 25
    });
    //const context = await browser.createIncognitoBrowserContext();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    await page.goto('https://aliaksandr-kasko.outsystemscloud.com/AgentProfileStats/', { waitUntil: 'networkidle2' });

    //const username = await page.$x('//label[contains(text(), "Username")]/..//input[@type="text"]')
    //console.log(username)
    //await page.focus(usernameclear)
    //await username.click()
    await page.type('input[type="text"]', '100invalid')
    await page.type('input[type="password"]', '100invalid')
    await page.click('input[type="submit"]')
    await page.waitForXPath('//span[contains(., "Invalid username or password.")]')
    await page.screenshot({ path: 'screenshots/screenshot.png' });

    //await context.close();
    await browser.close();
})();