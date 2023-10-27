require('dotenv').config();
const { createChatCompletion } = require('./chatHelper');
const readline = require('readline');

const readlineUI = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function summarizeWebsite(url) {
    const chatMessages = [
        { role: "system", content: `What are the summary, key words, and mood of the following website article: "${url}"?`}
    ];

    const chatResponse = await createChatCompletion(chatMessages);
    console.log(chatResponse);    
    continueChat(chatMessages);
}

function continueChat(chatHistory) {
    readlineUI.question("What else? ", async (response) => {
        if (response == null || response == ""){
            readlineUI.close();
            return;
        }

        chatHistory.push({ role: "user", content: response});

        const chatResponse = await createChatCompletion(chatHistory);     
        if (chatResponse != null) console.log(chatResponse.content); 
        continueChat(chatHistory);
    });
}

async function main() {
    if (process.argv.length >= 3 && process.argv[2].toLocaleLowerCase().startsWith("http")){
        summarizeWebsite(process.argv[2]);
        return;
    }

    readlineUI.question("What website should you like to analyze? ", async (website) => {
        if (website == null){
            console.error("No website specified");
            readlineUI.close();
            return;
        }

        summarizeWebsite(website);        
    });
}

main();