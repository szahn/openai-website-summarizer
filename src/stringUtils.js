const MAX_PARAGRAPHS = 24;

function textToParagraphs(minWordCount, text) {
    if (text == null || text.length === 0) {
        return [];
    }

    const paragraphs = text.split(/\r|\n/gi);    
    return paragraphs.filter(paragraph => {
        const wordCount = paragraph.trim().split(" ").length;
        return wordCount >= minWordCount;
    }).map(p => normalizeText(p));
}

function getParagraphSampleSet(paragraphs, paragraphCount){
    const paragraphChunkSize = Math.round(paragraphCount / 3);
    const midIndex = Math.round(paragraphs.length / 2);
    const paragraphSamples = [];
    for (let i = 0; i < paragraphs.length; i++) {
        if (paragraphSamples.length > MAX_PARAGRAPHS) break;

        if (i <= paragraphChunkSize)
            paragraphSamples.push(paragraphs[i]);
        else if (i >= midIndex - paragraphChunkSize && i <= midIndex + paragraphChunkSize)
            paragraphSamples.push(paragraphs[i]);
        else if (i >= paragraphs.length - paragraphChunkSize)
            paragraphSamples.push(paragraphs[i]);
    }

    return paragraphSamples;    
}

function normalizeText(text) {
    const whitespaceRegEx = /([\s])/gi;
    return text.replaceAll(whitespaceRegEx, ' ').replaceAll(/\s{2,}/gi, ' ') .trim();
}

function countWords(text){
    return text.split(" ").length;
}

module.exports = { normalizeText, countWords, textToParagraphs, getParagraphSampleSet }