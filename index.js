const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Token bot Telegram Anda
const token = '7169148449:AAFogjpEeT72NPq4X7rmxQqtJa4wbvBPrXo';

// Token API ChatGPT/OpenAI Anda
const openaiToken = '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';

// Inisialisasi bot
const bot = new TelegramBot(token, { polling: true });

// Event mendengarkan pesan
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    try {
        if (text) {
            // Kirim permintaan ke API ChatGPT/OpenAI
            const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
                prompt: text,
                max_tokens: 150
            }, {
                headers: {
                    'Authorization': `Bearer ${openaiToken}`,
                    'Content-Type': 'application/json'
                }
            });

            // Ambil teks hasil dari API
            const aiText = response.data.choices[0].text.trim();

            // Kirim balasan teks ke pengguna
            bot.sendMessage(chatId, aiText);
        }

        if (msg.photo) {
            // Jika pesan berisi foto, balas dengan teks
            bot.sendMessage(chatId, 'Terima kasih telah mengirim foto!');
        }
    } catch (error) {
        console.error('Error:', error);
        bot.sendMessage(chatId, 'Maaf, terjadi kesalahan.');
    }
});

// Event mendengarkan foto
bot.on('photo', (msg) => {
    const chatId = msg.chat.id;

    // Balas dengan teks ketika menerima foto
    bot.sendMessage(chatId, 'Terima kasih telah mengirim foto!');
});
