// var puppeteer = require('puppeteer-extra');
// const { amtSelector, dateSelector, bsl_nav_selector, hdfc_date_selector, hdfc_amt_selector, popup } = require('./setup')

// const { executablePath } = require('puppeteer')

// const getInavData = function (sheetData) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             //to launch a browser instance
//             const StealthPlugin = require('puppeteer-extra-plugin-stealth')
//             puppeteer.use(StealthPlugin())

//             const browser = await puppeteer.launch({
//                 //true to avoid opening the browser everytime a request is sent
//                 headless: true,
//                 args: [`--window-size=1920,1080`],
//                 defaultViewport: {
//                     width: 1920,
//                     height: 1080
//                 },
//                 executablePath: executablePath()
//             });

//             const page = await browser.newPage();
//             const responseArray = []
//             for (var i = 0; i < sheetData.length; i++) {
//                 var links = sheetData[i].link;
//                 var id = sheetData[i].id;
//                 try {
//                     if (links.indexOf('www.moneycontrol.com') !== -1) {
//                         var moneyControlLinks = links
//                         console.log(moneyControlLinks)
//                         await page.goto(`${moneyControlLinks}`);

//                         await page.waitForSelector(`${amtSelector}`)
//                         await page.waitForSelector(`${dateSelector}`)
//                         let amount = await page.$eval(`${amtSelector}`, el => el.innerText)
//                         let date = await page.$eval(`${dateSelector}`, date => date.innerText)

//                         amount = amount.split(' ')[1]
//                         date = date.split('(as on ')[1].split(')')[0]
//                         date = date.split(/th|st|nd|rd/).join('')
//                         let formattedDate = new Date(date).toLocaleDateString('en-GB', {
//                             day: '2-digit',
//                             month: 'short',
//                             year: 'numeric'
//                         }).replace(/ /g, '-');

//                         var obj = [id, amount, formattedDate]
//                         responseArray.push(obj)
//                     }
//                 } catch (e) {
//                     console.log("Something went wrong while scraping moneycontrol.com!" + e)
//                 }
//                 try {
//                     if (links.indexOf('www.hdfcfund.com') !== -1) {
//                         var hdfcLinks = links
//                         await page.goto(`${hdfcLinks}`);

//                         const element = await page.$(`${popup}`);
//                         if (element) {
//                             await page.screenshot({ path: 'screenshot.jpg' })
//                             await page.$eval(`${popup}`, el => el.click());
//                             await page.click('#react-tabs-4')

//                             await page.waitForSelector(`${hdfc_amt_selector}`)
//                             await page.waitForSelector(`${hdfc_date_selector}`)
//                             let hdfcNav = await page.$eval(`${hdfc_amt_selector}`, el => el.innerText)
//                             let hdfc_date = await page.$eval(`${hdfc_date_selector}`, date => date.innerText)

//                             let hdfcFormattedDate = new Date(hdfc_date).toLocaleDateString('en-GB', {
//                                 day: '2-digit',
//                                 month: 'short',
//                                 year: 'numeric'
//                             }).replace(/ /g, '-');

//                             var obj2 = [id, hdfcNav, hdfcFormattedDate]
//                             responseArray.push(obj2)
//                         } else {
//                             await page.click('#react-tabs-4')
//                             await page.waitForSelector(`${hdfc_amt_selector}`)
//                             await page.waitForSelector(`${hdfc_date_selector}`)
//                             let hdfcNav = await page.$eval(`${hdfc_amt_selector}`, el => el.innerText)
//                             let hdfc_date = await page.$eval(`${hdfc_date_selector}`, date => date.innerText)

//                             let hdfcFormattedDate = new Date(hdfc_date).toLocaleDateString('en-GB', {
//                                 day: '2-digit',
//                                 month: 'short',
//                                 year: 'numeric'
//                             }).replace(/ /g, '-');

//                             var obj2 = [id, hdfcNav, hdfcFormattedDate]
//                             responseArray.push(obj2)
//                         }
//                     }
//                 }
//                 catch (e) {
//                     console.log("Something went wrong while scraping hdfcfund.com!" + e)
//                 }
//                 try {
//                     if (links.indexOf('mutualfund.adityabirlacapital.com') !== -1) {
//                         var bslLinks = links

//                         await page.goto(`${bslLinks}`);

//                         await page.waitForSelector(`${bsl_nav_selector}`)
//                         let navValue = await page.$eval(`${bsl_nav_selector}`, el => el.innerText)
//                         navValue = navValue.split('- ')[1]
//                         let bslamount = navValue.split(' ')[0]
//                         let bsldate = navValue.split(' (as on ')[1].split(')')[0]

//                         let obj3 = [id, bslamount, bsldate]
//                         responseArray.push(obj3)
//                     }
//                 } catch (e) {
//                     console.log("Something went wrong while scraping aditybirlacapital.com!" + e)
//                 }
//             }
//             await browser.close()
//             resolve(responseArray)
//         } catch (e) {
//             reject("Something went wrong! " + e);
//         }
//     }
//     )
// };

// //getInavData()
// module.exports = { getInavData }


