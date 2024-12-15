import { Telegraf } from 'telegraf'
import { ChatMemberUpdated, Update } from 'telegraf/typings/core/types/typegram'
import express, { Request, Response } from 'express';

type WebhookDefinition = {
  channel_id: string
  path: string
}

export default class Telegram {
  private exp
  private whPort: string | undefined
  private bot: Telegraf
  private config
  constructor(apiKey: string) {
    this.bot = new Telegraf(apiKey)
    this.exp = express()
    this.exp.use(express.json())
    this.config = require("../config.json")
    this.whPort = process.env.WEBHOOK_PORT
  }

  launch = async () => {
    this.bot.launch()

    this.bot.on('channel_post', ctx => {
      console.log(ctx.channelPost.chat)
    })

    this.config.webhooks.forEach ((wh: WebhookDefinition)=>{
      let webhookStr: string = this.config.webhook_key+"/"+wh.path
      this.exp.post(webhookStr, (req: Request, res: Response) => {
        console.info(req)
      })
    })

    this.exp.listen(this.whPort, () => {
      console.log(`Webhooks are running on port ${this.whPort}`)
    })
    
    // once this promise resolves, bot is active
    // https://github.com/telegraf/telegraf/issues/1749
    return await this.bot.telegram.getMe()
  }

  stop = async () => {
    this.bot?.stop()
  }
}