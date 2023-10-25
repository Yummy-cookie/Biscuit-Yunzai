import './config/init.js'
import ListenerLoader from './listener/loader.js'
import { Client } from 'icqq'
import cfg from './config/config.js'

export default class Yunzai extends Client {
  // eslint-disable-next-line no-useless-constructor
  constructor (uin, conf) {
    super(uin, conf)
  }

  /** 登录机器人 */
  static async run () {
    const bot = new Yunzai(cfg.bot)
    await bot.star(bot)
    /** 加载oicq事件监听 */
    await ListenerLoader.load(bot)
    await bot.login(cfg.qq, cfg.pwd)
    bot[bot.uin]=bot
    return bot
  }
  async star(bot) {
                let num = await redis.get('Yz:count:bot')
                if (num && !isNaN(num)) {
                        bot.stat.start_time = num
                        num = Math.floor(Date.now() / 1000) - num
                        await redis.set('Yz:count:bot', bot.stat.start_time - num)
                } else {
                        await redis.set('Yz:count:bot', bot.stat.start_time)
                }
  }
}
