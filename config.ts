import dotenv from 'dotenv'

type Webhook = {
    chat_id: string
    path: string
}

type Webhooks = Webhook[]

type ParsedConfig = {
    webhooks: Webhooks
    apiKeys: {
        telegram: string
    }
}

class Config {
  constructor() {
    dotenv.config()
    //WEBHOOKS="webhook1|path1,webhook2|path2"
    let whString = process.env.WEBHOOKS?.split(",")
    let whArr: Webhooks
    whString.forEach((wh)=>{
        let webhook: Webhook = wh.split("|")
        whArr.push(webhook)
    })
  }

  get parsedConfig() {
    return this.parseConfig()
  }

  private parseConfig = (): ParsedConfig => {

    return {
        webhooks: webhooks
        apiKeys: {
            telegram: process.env.TELEGRAM_KEY
        }
    }
  }
}

const config = new Config()
export default config.parsedConfig