const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const API_KEY = "PASTE_NEW_KEY_HERE"; // ⚠️ apna NEW key

// 🤖 AI QUIZ GENERATE
app.get("/quiz", async (req, res) => {

    const prompt = "Generate 3 MCQ questions on C programming in JSON format: [{q, options, answer}]";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method:"POST",
        headers:{
            "Authorization":`Bearer ${API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            model:"gpt-4o-mini",
            messages:[{role:"user",content:prompt}]
        })
    });

    const data = await response.json();
    res.json(data);
});

// 🤖 CHAT
app.post("/chat", async (req, res) => {

    const msg = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method:"POST",
        headers:{
            "Authorization":`Bearer ${API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            model:"gpt-4o-mini",
            messages:[{role:"user",content:msg}]
        })
    });

    const data = await response.json();
    res.json(data);
});

app.listen(3000, ()=>console.log("Server running"));