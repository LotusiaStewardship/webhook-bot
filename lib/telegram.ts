import { Telegraf } from 'telegraf'
import { ChatMemberUpdated, Update } from 'telegraf/typings/core/types/typegram'

export default class Telegram {
  private bot: Telegraf
  constructor(apiKey: string) {
    this.bot = new Telegraf(apiKey)
  }

  launch = async () => {
    this.bot.launch()
    this.bot.on('channel_post', ctx => {
      console.log(ctx.channelPost.chat)
    })
    // once this promise resolves, bot is active
    // https://github.com/telegraf/telegraf/issues/1749
    return await this.bot.telegram.getMe()
  }

  stop = async () => {
    this.bot?.stop()
  }
}
