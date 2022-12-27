var puppeteer = require('puppeteer-extra');
const { iifl_nav_selector, iifl_date_selector, close_popup_btn } = require('./setup')

const { executablePath } = require('puppeteer')

const getInavData = function (sheetData) {
   
    return new Promise(async (resolve, reject) => {
        try {
            //to launch a browser instance
            const StealthPlugin = require('puppeteer-extra-plugin-stealth')
            puppeteer.use(StealthPlugin())

            const browser = await puppeteer.launch({
                //true to avoid opening the browser everytime a request is sent
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                // args: [`--window-size=1920,1080`],
                // defaultViewport: {
                //     width: 1920,
                //     height: 1080
                // },
                executablePath: executablePath()
            });

            const page = await browser.newPage();
            const responseArray = []
            for (var i = 0; i < sheetData.length; i++) {
                var iifl_links = sheetData[i].url;
                var id = sheetData[i].id;
                try {
                    await page.goto(`${iifl_links}`);
                    console.log(iifl_links)
                    const element = await page.$(`${close_popup_btn}`);
                    if (element) {
                        await page.$eval(`${close_popup_btn}`, el => el.click());
                        //await page.click(`${close_popup_btn}`)

                        await page.waitForSelector(`${iifl_nav_selector}`)
                        await page.waitForSelector(`${iifl_date_selector}`)
                        let nav = await page.$eval(`${iifl_nav_selector}`, el => el.innerText)
                        let date = await page.$eval(`${iifl_date_selector}`, date => date.innerText)

                        var obj = [id, nav, date]
                        responseArray.push(obj)
                    } else {

                        await page.waitForSelector(`${iifl_nav_selector}`)
                        await page.waitForSelector(`${iifl_date_selector}`)
                        let nav = await page.$eval(`${iifl_nav_selector}`, el => el.innerText)
                        let date = await page.$eval(`${iifl_date_selector}`, date => date.innerText)

                        var obj = [id, nav, date]
                        responseArray.push(obj)
                    }

                } catch (e) {
                    console.log("Something went wrong while scraping indiainfoline.com! "+ e)
                }
            }
            //await browser.close()
            //console.log(responseArray)
            resolve(responseArray)
        } catch (e) {
            reject("Something went wrong! " + e);
        }
    })
};

//getInavData()
module.exports = { getInavData }


