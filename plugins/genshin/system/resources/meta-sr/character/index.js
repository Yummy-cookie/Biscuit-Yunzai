import { Data, Meta } from '#yunzai'
import { alias } from './alias.js'
import { wifeCfg } from './extra.js'
import lodash from 'lodash'

let data = Data.readJSON('resources/meta-sr/character/data.json', 'miao')
let meta = Meta.create('sr', 'char')
meta.addData(data)
meta.addAlias(alias)

// 老婆设置同样设置到gs下，通用数据
let gsMeta = Meta.create('gs', 'char')
let { wifeData } = gsMeta.getMeta()
lodash.forEach(wifeCfg, (txt, type) => {
  wifeData[type] = wifeData[type] || {}
  Data.eachStr(txt, (name) => {
    let id = meta.getId(name)
    if (id) {
      wifeData[type][id] = true
    }
  })
})
gsMeta.addMeta({ wifeData })

