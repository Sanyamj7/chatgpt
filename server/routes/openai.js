import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from '../index.js';

dotenv.config();
const router=express.Router();

router.post("/text",async (req,res) => {
    try{
        const {text, activeChatId} = req.body;
        console.log('req.body:',req.body);
        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: text,
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        console.log('response data', response.data);
        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            {text: response.data.choices[0].text },
            {
                headers:{
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": process.env.BOT_USER_NAME,
                    "User-Secret": process.env.BOT_USER_SECRET,
                },
            }
        );


        res.status(200).json({ text: response.data.choices[0].text });
    } catch(error){
        console.error("error",error);
        res.status(500).json({ error: error.message});
    }
});
export default router;