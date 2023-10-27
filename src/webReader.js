const puppeteer = require('puppeteer');

const TextExtractionTypeEntirePage = "TextExtractionTypeEntirePage";
const TextExtractionTypeArticleSelector = "TextExtractionTypeArticleSelector";
const TextExtractionTypeSectionSelector = "TextExtractionTypeSectionSelector";
const TextExtractionTypeMainSelector = "TextExtractionTypeMainSelector";

const textSelectors = [
    TextExtractionTypeArticleSelector, 
    TextExtractionTypeSectionSelector, 
    TextExtractionTypeMainSelector
];

async function extractText(page, textSelectors){
    for (let textSelector of textSelectors) {
        switch (textSelector){
            case TextExtractionTypeArticleSelector: {
                try{
                    const textResults = await page.$eval('article', (el) => el.innerText);
                    if (textResults.length > 0) return textResults;
                }
                catch (ex){
                    //No article element type
                }
                break;
            }
            case TextExtractionTypeSectionSelector: {
                try{
                    const textResults = await page.$eval('section', (el) => el.innerText);
                    if (textResults.length > 0) return textResults;
                }
                catch (ex ){
                    //No section element type
                }
                break;
            }
            case TextExtractionTypeMainSelector: {
                try{
                    const textResults = await page.$eval('main', (el) => el.innerText);
                    if (textResults.length > 0) return textResults;
                }
                catch (ex ){
                    //No main element type
                }
                break;
            }
            default:
            case TextExtractionTypeEntirePage:{
                try{
                    pageText = await page.$eval('*', (el) => el.innerText);
                    return pageText;
                }
                catch (ex){

                }
                break;
            }
        }
    }

    return "";
}

async function webpageToPlainText(url) {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36");
    await page.goto(url, {timeout: 60 * 1000});
    let pageText = await extractText(page, textSelectors);
    await browser.close();
    return pageText;
}

module.exports = { 
    webpageToPlainText
}