const puppeteer = require('puppeteer');
// cases for validation
const users = [
    {
        case: "login with invalid name",
        username: "' or 1=1--",
        password: "ggggggggg",
        agentName: "",
        email: "",
        isPositive: false
    }
];

(async () => {

    const browser = await puppeteer.launch({
        headless: true
        // headless: false,
        // slowMo: 5
    });
    const context = await browser.createIncognitoBrowserContext();

    for (let index = 0; index < users.length; index++) {
        let user = users[index];

        const page = await context.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        await page.goto('https://aliaksandr-kasko.outsystemscloud.com/AgentProfileStats/Register.aspx?(Not.Licensed.For.Production)=', { waitUntil: 'networkidle2' });

        //add steps here

        await page.close();
        console.log(`case #${index + 1}: "${user.case}" is finished`);
    }

    await browser.close();
})();