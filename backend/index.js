const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;

const configuration = new Configuration({
    organization: "org-mIMdsM9nkSw5p0micFvfRA8R",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Cache object to store previously generated responses
const responseCache = {};

app.post('/api/chatbot', async (req, res) => {
    const userInput = req.body.message;

    // Check if response is already cached
    if (responseCache.hasOwnProperty(userInput)) {
        res.json({ message: responseCache[userInput] });
        return;
    }

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `I am experiencing the following symptoms: ${userInput}. Can you provide me with a list of possible diseases that may be related to these symptoms?`,
            max_tokens: 100,
            temperature: 0.6,
        });

        const chatbotResponse = response.data.choices[0].text.trim();

        // Cache the response for future use
        responseCache[userInput] = chatbotResponse;

        res.json({ message: chatbotResponse });
    } catch (error) {
        console.error("Error processing chatbot request:", error);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
