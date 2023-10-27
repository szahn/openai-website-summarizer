const {OpenAI} = require("openai");
const {config} = require('./config');

const {webpageToPlainText} = require("./webReader");
const {textToParagraphs, getParagraphSampleSet} = require("./stringUtils")

const MAX_PARAGRAPHS = 24;

const openai = new OpenAI({
    apiKey: config.openai.key,
});

const chatFunctions = [
    {
        name: "get_website_article",
        description: "get website article paragraphs",
        parameters: {
            "type": "object",
            "properties": {
                "website": {
                    "type": "string",
                    "description": "The website article url"
                }
            },
            "required": ["website"]
        }
    }
]

async function createChatCompletion(chatHistory) {
    const response  = await openai.chat.completions.create({
        messages: chatHistory,
        functions: chatFunctions,
        function_call: "auto",
        model: config.openai.model,
    }).catch((err) => {
        if (err instanceof OpenAI.APIError) {
            console.error(`${err.status} ${err.name}. ${err.message}`);
        } else {
            console.error(err);
        }
    });

    const responseMessage = response.choices[0].message;
    chatHistory.push(responseMessage);

    if (responseMessage.function_call) {
        const availableFunctions = {
            get_website_article: getWebsiteArticle,
        };
        const functionName = responseMessage.function_call.name;
        const functionToCall = availableFunctions[functionName];
        const functionArgs = JSON.parse(responseMessage.function_call.arguments);
        const functionResponse = await functionToCall(
            functionArgs.website,
        );
        
        chatHistory.push({
            "role": "function",
            "name": functionName,
            "content": functionResponse,
        });
        
        const secondResponse = await openai.chat.completions.create({
            model: config.openai.model,
            messages: chatHistory,
        });

        return secondResponse.choices[0].message.content;
    }

    return responseMessage;

}

async function getWebsiteArticle(website) {
    const paragraphs = await getParagraphsFromWebsite(16, website);
    if (paragraphs == null || paragraphs.length === 0){
        console.error("No paragraphs found.");
    }
    return JSON.stringify(paragraphs);
}

async function getParagraphsFromWebsite(paragraphCount, url) {
    console.log(`Fetching ${url}...`);
    const websiteText = await webpageToPlainText(url);
    if (websiteText.length === 0) return [];

    console.log(`Got ${url}`)
    const paragraphs = textToParagraphs(5, websiteText);
    const paragraphSampleSet = getParagraphSampleSet(paragraphs, paragraphCount);
    console.log(`Analyzing ${paragraphSampleSet.length}/${paragraphs.length} paragraphs`);
    return paragraphSampleSet;
}

module.exports = { createChatCompletion }