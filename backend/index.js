const { Configuration, OpenAIApi }=  require("openai");
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000

const configuration = new Configuration({
    // organization: "org-a8LYcgeOgcuN5AnuCJ9d0UED",
    // apiKey: "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",
    organization: "org-mIMdsM9nkSw5p0micFvfRA8R",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/api/chatbot', async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `I am experiencing the following symptoms: ${req.body.message}. Can you provide me with a list of possible diseases that may be related to these symptoms?`,
        max_tokens: 100,
        temperature: 0.1,
    });
    // console.log(response)
    if(response.data.choices[0].text)
    {
        res.json({
            message : response.data.choices[0].text.trim()
        })
    }

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
