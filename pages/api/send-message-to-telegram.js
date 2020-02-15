import TelegramBot from 'node-telegram-bot-api'

const TOKEN = '956434053:AAH3N5droBba83EeSChM7LNptodeV1rdq8w'
const CHANNEL_ID = 248888788

const bot = new TelegramBot(TOKEN);

export default (message) => bot.sendMessage(CHANNEL_ID, message)
