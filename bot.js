const puppeteer = require('puppeteer');
const Citation = require('./Citation')

async function CreateCitation(citationId) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 825 })
    await page.goto('https://prdwmq.etimspayments.com/pbw/include/philadelphia_parking/web_upload.jsp');
    
    // Simulate click on 'here' link
    await page.click('a[href="online_hear_rights.jsp"]')
    // Simulate click on 'Accept' button
    await page.click('input[value=Accept]')
    // Simulate typing in citation ID and clicking 'Submit' button
    await page.type('input[name=ticket]', `${citationId}`)
    await page.click('input[value=Submit]')

    // Scrape table data and save in an array
    const data = await page.evaluate(() => {
        let array = []
        let tableData = document.querySelectorAll('td.bodySmall')
        let violation = document.querySelectorAll('td[colspan="4"]')

        tableData.forEach(td => {
            if (td.innerText.length > 0) {
                let text = td.innerText
                array.push(text.slice(1))
            }
        }) 

        violation.forEach(td => {
            if (td.innerText.length > 0) {
                let text = td.innerText
                array.push(text.slice(1))
            }
        }) 
        return array   
    });

    await browser.close();

    // Create new Citation object with table data
    const citation = new Citation(data[0], data[2], data[8], data[4], data[1], data[3])
    console.log(citation)
    return citation 
};

module.exports = CreateCitation