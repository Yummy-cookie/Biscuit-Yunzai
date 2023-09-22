import { usefulAttr as usefulAttrGS } from '../../resources/meta/artifact/artis-mark.js'
import { usefulAttr as usefulAttrSR } from '../../resources/meta-sr/artifact/artis-mark.js'
import lodash from 'lodash'

const CharArtis = {

  getCharArtisCfg (char, profile, artis) {
    let { attr, weapon } = profile
    let { isGs } = char
    let usefulAttr = isGs ? usefulAttrGS : usefulAttrSR

    let rule = function (title, attrWeight) {
      return {
        title,
        attrWeight
      }
    }

    let def = function (attrWeight) {
      let title = []

      let weight = lodash.extend({}, attrWeight || usefulAttr[char.name] || { atk: 75, cpct: 100, cdmg: 100, dmg: 100 })
      let check = (key, max = 75, maxPlus = 75, isWeapon = true) => {
        let original = weight[key] || 0
        if (original < max) {
          let plus = isWeapon ? maxPlus * (1 + weapon.affix / 5) / 2 : maxPlus
          weight[key] = Math.min(Math.round(original + plus), max)
          return true
        }
        return false
      }

      let wn = weapon?.name || ''

      if (isGs) {
        // 对原神一些特殊情况做适配与判定

        // 增加攻击力或直接伤害类武器判定
        const weaponCfg = {
          磐岩结绿: {
            attr: 'hp',
            abbr: '绿剑'
          },
          赤角石溃杵: {
            attr: 'def',
            abbr: '赤角'
          },
          猎人之径: {
            attr: 'mastery'
          },
          薙草之稻光: {
            attr: 'recharge',
            abbr: '薙刀'
          }
        }

        if (weight.atk > 0 && weaponCfg[wn]) {
          let wCfg = weaponCfg[wn]
          if (check(wCfg.attr, wCfg.max || 75, wCfg.plus || 75)) {
            title.push(wCfg.abbr || wn)
          }
        }

        // 不与攻击力挂钩的武器判定
        if (wn === '辰砂之纺锤' && check('def')) {
          title.push('纺锤')
        }

        // 圣遗物判定，如果是绝缘4，将充能权重拉高至沙漏圣遗物当前最高权重齐平
        let maxWeight = Math.max(weight.atk || 0, weight.hp || 0, weight.def || 0, weight.mastery || 0)
        if (artis.is('绝缘4') && check('recharge', maxWeight, 75, false)) {
          title.push('绝缘4')
        }
      }

      title = title.length > 0 ? title.join('') : '通用'
      return {
        title: `${char.abbr}-${title}`,
        attrWeight: weight
      }
    }

    let charRule = char.getArtisCfg() || function ({ def }) {
      return def(usefulAttr[char.name] || { atk: 75, cpct: 100, cdmg: 100 })
    }

    if (charRule) {
      return charRule({ attr, artis, rule, def, weapon, cons: profile.cons })
    }
  }
}
export default CharArtis
