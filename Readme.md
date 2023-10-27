# OpenAI Website Summarizer

This NodeJS app parses a website and converts it to text, then takes a sample set of paragraphsa as a context to ask ChatGPT for the summary, key words and mood of the website article. The application demonstrates using a function to retrieve text from a website as part of the prompt. To reduce the risk of reaching API limits, only a sample set of paragraphs are included from the website.

## Setup

Create a `.env` file with the `OPENAI_API_KEY` environment variable set to your OpenAI API Key. Run `npm install` once to install dependencies.

## Execution

Run `npm start` or pass the website url as an argument like `npm start https://www.wired.com/story/amazon-google-microsoft-green-clouds-and-hyperscale-data-centers/`

## Example

```bash
npm start
What website should you like to analyze? https://www.wired.com/story/amazon-google-microsoft-green-clouds-and-hyperscale-data-centers/
Fetching https://www.wired.com/story/amazon-google-microsoft-green-clouds-and-hyperscale-data-centers/...
Got https://www.wired.com/story/amazon-google-microsoft-green-clouds-and-hyperscale-data-centers/
Analyzing 22/52 paragraphs
Summary: This article from Wired examines the environmental impact and sustainability efforts of three leading cloud providers: Amazon, Google, and Microsoft. The author explores their renewable energy usage, carbon emissions, and initiatives to minimize their environmental footprint in data centers. Each company has different approaches and goals regarding 
renewable energy adoption and reduction of carbon emissions.

Key words: Amazon, Google, Microsoft, cloud providers, greenest cloud, environmental impact, renewable energy, carbon emissions, data centers.

Mood: Informative, Analytical
What else? What is the greenest cloud provider?
{
  role: 'assistant',
  content: 'Based on the provided information, it is difficult to determine the greenest cloud provider without further analysis. The article mentions the environmental efforts and initiatives of three major cloud providers: Amazon, Google, and Microsoft. Each company has implemented various strategies to reduce carbon emissions and increase the use of renewable energy in their data centers. Amazon and Google have committed to using 100% renewable energy, while Microsoft has been carbon neutral since 2012 and uses a combination of renewable energy and carbon offsets. To determine the greenest provider, a more comprehensive evaluation of their environmental practices and performance would be required.'
}
```