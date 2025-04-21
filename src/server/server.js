
import { Client, LocalAuth } from 'whatsapp-web.js';
import express from 'express';
import axios from 'axios';
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth()
});

const ADMIN_NUMBER = '916200083509@c.us';

// Try to load start messages from file
let startMessages = [];
try {
    const startMessagesPath = join(__dirname, '../../start_messages.txt');
    startMessages = fs.readFileSync(startMessagesPath, 'utf-8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    console.log(`✅ Loaded ${startMessages.length} start messages`);
} catch (err) {
    console.warn(`⚠️ Could not load start_messages.txt: ${err.message}`);
    console.log('Create a start_messages.txt file in the root directory to send initial messages');
    startMessages = ["Hello! I'm a recruitment bot. I'll be asking you a few questions. Reply to continue."];
}

// Show QR for login
client.on('qr', qr => {
    console.log("📱 Scan this QR code to login:");
    qrcode.generate(qr, { small: true });
});

// On ready
client.on('ready', async () => {
    console.log('✅ WhatsApp Bot is ready!');

    try {
        const numbersPath = join(__dirname, '../../numbers.txt');
        const numbers = fs.readFileSync(numbersPath, 'utf-8')
            .split('\n')
            .map(n => n.trim())
            .filter(n => n.length > 0);
        
        console.log(`📋 Loaded ${numbers.length} numbers to message`);
        
        for (const number of numbers) {
            const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
            for (const msg of startMessages) {
                await client.sendMessage(chatId, msg);
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    } catch (err) {
        console.warn(`⚠️ Could not load numbers.txt: ${err.message}`);
        console.log('Create a numbers.txt file in the root directory with one phone number per line');
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
