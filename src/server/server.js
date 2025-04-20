
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const axios = require('axios');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const app = express();
app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth()
});

const ADMIN_NUMBER = '916200083509@c.us';

// Show QR for login
client.on('qr', qr => {
    console.log("📱 Scan this QR code to login:");
    qrcode.generate(qr, { small: true });
});

// On ready
client.on('ready', async () => {
    console.log('✅ WhatsApp Bot is ready!');

    const numbers = fs.readFileSync('numbers.txt', 'utf-8')
        .split('\n')
        .map(n => n.trim())
        .filter(n => n.length > 0);

    for (const number of numbers) {
        const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
        for (const msg of startMessages) {
            await client.sendMessage(chatId, msg);
            await new Promise(r => setTimeout(r, 1000));
        }
    }
});

// On user message
client.on('message', async msg => {
    const sender = msg.from;
    const userMessage = msg.body;

    try {
        const response = await axios.post('http://localhost:5000/ask', {
            sender: sender,
            message: userMessage
        });

        if (response.data && response.data.reply) {
            const reply = response.data.reply;

            if (reply === "__COMPLETE__") {
                const userNumber = sender.split('@')[0];
                await client.sendMessage(ADMIN_NUMBER, `✅ Info collected from user: ${userNumber}`);
                return;
            }

            await msg.reply(reply);
        }
    } catch (err) {
        console.error('❌ Error from Python bot:', err.message);
        const userNumber = sender.split('@')[0];
        await client.sendMessage(ADMIN_NUMBER, `⚠️ Bot error for user: ${userNumber}`);
    }
});

// Admin notify from Python
app.post('/notify', async (req, res) => {
    const { message } = req.body;
    try {
        await client.sendMessage(ADMIN_NUMBER, message);
        res.status(200).send({ status: 'sent' });
    } catch (err) {
        console.error('❌ Failed to notify admin:', err.message);
        res.status(500).send({ error: 'Failed to send message' });
    }
});

app.listen(3000, () => {
    console.log('🌐 Express server running at http://localhost:3000');
});

client.initialize();
