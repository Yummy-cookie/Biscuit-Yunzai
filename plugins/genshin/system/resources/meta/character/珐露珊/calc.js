export const details = [{
  title: '开Q提供风系伤害',
  dmg: ({ attr }) => {
    return {
      avg: (attr.atk.base || 0) * 0.32
    }
  }
}, {
  title: 'E减抗后Q伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [{
  title: '珐露珊6命：Q提升暴击伤害40%',
  cons: 6,
  data: {
    cdmg: 40
  }
}, {
  title: '诡风之祸：降低敌人风抗[kx]%',
  data: {
    kx: ({ talent }) => talent.q['风元素抗性降低']
  }
}, {
  title: '祈风之赐：获得风伤加成[dmg]%',
  data: {
    dmg: ({ talent }) => talent.q['风元素伤害加成']
  }
}]
