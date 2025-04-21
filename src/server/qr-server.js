
import express from 'express';
import { Client, LocalAuth } from 'whatsapp-web.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
    }
});

let qrCodeData = null;

client.on('qr', (qr) => {
    qrCodeData = qr;
});

client.on('ready', () => {
    console.log('WhatsApp client is ready!');
    qrCodeData = null;
});

app.get('/init-bot', (req, res) => {
    if (!client.isInitialized) {
        client.initialize();
    }
    
    if (qrCodeData) {
        res.json({ qrCode: qrCodeData });
    } else {
        res.json({ message: 'Initializing...' });
    }
});

app.listen(3000, () => {
    console.log('QR code server running on port 3000');
});
