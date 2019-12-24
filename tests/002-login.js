const puppeteer = require('puppeteer');

const users = [
    {
        case: "invalid_name",
        username: "' or 1=1--",
        password: "ggggggggg",
        isPositive: false
    },
    {
        case: "invalid_password",
        username: "ggggggggg",
        password: "' or 1=1--",
        isPositive: false
    },
    {
        case: "positive_login",
        username: "ggggggggg",
        password: "ggggggggg",
        isPositive: true
    }
];

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 5
    });
    const context = await browser.createIncognitoBrowserContext();

    for (let index = 0; index < users.length; index++) {
        let user = users[index];
        const page = await context.newPage();
        await page.setViewport({
            width: 1920,
            height: 1080
        });
        await page.goto('https://aliaksandr-kasko.outsystemscloud.com/AgentProfileStats/', { waitUntil: 'networkidle2' });
        await page.type('input[type="text"]', user.username);
        await page.type('input[type="password"]', user.password);
        await page.click('input[type="submit"]');

        if (user.isPositive) {
            await page.waitForXPath(`//a[@title="Agent Profile" and contains(., ${user.name})]`);
            await page.screenshot({ path: `screenshots/screenshot-${user.case}.png` });
        }
        else {
            await page.screenshot({ path: `screenshots/screenshot-${user.case}.png` });
        }

        await page.close();
        console.log(`case #${index + 1}: "${user.case}" is finished`);
    }

    await browser.close();
})();