const PORT = 8000
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/images",async(req,res) => {
    console.log(req.body.message);
    try {
        const response = await openai.createImage({
          prompt: req.body.message,
          n: 6,
          size: "1024x1024",
        });
        console.log(response.data.data);
        res.send(response.data.data)
    } catch (error) {
        console.log("error => ",error.message)
    }

})

app.listen(PORT, () => console.log('Your server is running on PORT '+ PORT))
