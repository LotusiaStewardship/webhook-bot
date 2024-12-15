import Telegram from './lib/telegram'
import dotenv from 'dotenv'
// parse configuration into environment
dotenv.config()
const apiKey = process.env.TELEGRAM_APIKEY
if (!apiKey) {
  throw new Error('TELEGRAM_APIKEY is not defined. Please add this into your .env file.')
}
const telegram = new Telegram(apiKey)
const main = async () => {
  const getMe = await telegram.launch()
  console.log(getMe)
  //console.log(await telegram.fetchChannelList())
}

process.on('SIGINT', async () => {
  await telegram.stop()
  //process.exit(0)
})

main().catch(e => console.error(`uncaught exception: ${e}`))
