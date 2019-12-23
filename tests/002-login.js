const puppeteer = require('puppeteer');

const users = {
    user1: {
        username: "anyinvalid",
        password: "anyinvalid",
        isPositive: false
    },
    user2: {
        username: "' or '1'='1",
        password: "anyinvalid",
        isPositive: false
    },
    user3: {
        username: "anyinvalid",
        password: "anyinvalid",
        isPositive: true
    }
}

    (async () => {

        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 25
        });
        const context = await browser.createIncognitoBrowserContext();

        users.forEach((user) => {
            const page = await context.newPage();
            await page.setViewport({
                width: 1920,
                height: 1080
            });
            await page.goto('https://aliaksandr-kasko.outsystemscloud.com/AgentProfileStats/', { waitUntil: 'networkidle2' });

            //const username = await page.$x('//label[contains(text(), "Username")]/..//input[@type="text"]')
            //console.log(username)
            //await page.focus(usernameclear)
            //await username.click()
            await page.type('input[type="text"]', user.username)
            await page.type('input[type="password"]', user.password)
            await page.click('input[type="submit"]')
            //await page.waitForXPath('//span[contains(., "Invalid username or password.")]')
            user.isPositive ? await page.screenshot({ path: `screenshots/screenshot-${user.password}.png` }) : console.log('invalid')

            //await context.close();
            await page.close();

        })

        await browser.close();
    })();