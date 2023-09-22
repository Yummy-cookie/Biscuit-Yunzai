import fs from 'fs'
import lodash from 'lodash'
import cfgData from './cfg/CfgData.js'
import { Version } from '#yunzai'

const _path = process.cwd()
const _cfgPath = `${_path}/plugins/genshin/system/components/`
let cfg = {}
let miaoCfg = {}


try {
  cfg = await cfgData.getCfg()
  cfgData.saveCfg(cfg)
  lodash.forEach(cfgData.getCfgSchemaMap(), (cm) => {
    if (cm.miao) {
      miaoCfg[cm.cfgKey] = true
    }
  })
} catch (e) {
  // do nth
}

let Cfg = {
  get (rote) {
    if (Version.isMiao && miaoCfg[rote]) {
      return true
    }
    return lodash.get(cfg, rote)
  },
  set (rote, val) {
    cfg[rote] = val
    cfgData.saveCfg(cfg)
  },
  del (rote) {
    lodash.set(cfg, rote, undefined)
    fs.writeFileSync(_cfgPath + 'cfg.json', JSON.stringify(cfg, null, '\t'))
  },
  getCfg () {
    return cfg
  },
  getCfgSchema () {
    return cfgData.getCfgSchema()
  },
  getCfgSchemaMap () {
    return cfgData.getCfgSchemaMap()
  },
  scale (pct = 1) {
    let scale = Cfg.get('renderScale', 100)
    scale = Math.min(2, Math.max(0.5, scale / 100))
    pct = pct * scale
    return `style=transform:scale(${pct})`
  }
}

export default Cfg
