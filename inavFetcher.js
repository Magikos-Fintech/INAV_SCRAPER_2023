var puppeteer = require('puppeteer-extra');
const { iifl_nav_selector, iifl_date_selector, close_popup_btn } = require('./setup')

const { executablePath } = require('puppeteer')

const getInavData = function (sheetData) {
    // sheetData = [
    //     {
    //         id: '1',
    //         symbol: 'IVZINNIFTY-NSE',
    //         URL_ID: '99615593',
    //         url: 'https://www.indiainfoline.com/mutualfunds/Invesco-India-Nifty-50-ETF/99615593',
    //         inav: '',
    //         asOnDate: ''
    //     },
    //     {
    //         id: '2',
    //         symbol: 'IBMFNIFTY-NSE',
    //         URL_ID: '313646410',
    //         url: 'https://www.indiainfoline.com/mutualfunds/Indiabulls-Nifty50-Exchange-Traded-Fund/313646410',
    //         inav: '',
    //         asOnDate: ''
    //     },
    //     {
    //         id: '3',
    //         symbol: 'DSPN50ETF-BSE',
    //         URL_ID: '330810249',
    //         url: 'https://www.indiainfoline.com/mutualfunds/DSP-Nifty-50-ETF/330810249',
    //         inav: '',
    //         asOnDate: ''
    //     },
    //     {
    //         id: '4',
    //         symbol: 'NETF-NSE',
    //         URL_ID: '303862944',
    //         url: 'https://www.indiainfoline.com/mutualfunds/Tata-Nifty-50-Exchange-Traded-Fund/303862944',
    //         inav: '',
    //         asOnDate: ''
    //     },
    //     {
    //         id: '5',
    //         symbol: 'MOM50-NSE',
    //         URL_ID: '89046650',
    //         url: 'https://www.indiainfoline.com/mutualfunds/Motilal-Oswal-Nifty-50-ETF/89046650',
    //         inav: '',
    //         asOnDate: ''
    //     }]
    return new Promise(async (resolve, reject) => {
        try {
            //to launch a browser instance
            const StealthPlugin = require('puppeteer-extra-plugin-stealth')
            puppeteer.use(StealthPlugin())

            const browser = await puppeteer.launch({
                //true to avoid opening the browser everytime a request is sent
                headless: true,
<<<<<<< HEAD
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                // args: [`--window-size=1920,1080`],
                // defaultViewport: {
                //     width: 1920,
                //     height: 1080
                // },
                executablePath: executablePath()
=======
                args: [`--window-size=1920,1080`],
                defaultViewport: {
                    width: 1920,
                    height: 1080
                }
>>>>>>> 1146913901fc9c7aa47a0cb37de3ac974f39d199
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


