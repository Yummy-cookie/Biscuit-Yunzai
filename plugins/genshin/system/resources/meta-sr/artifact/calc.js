let attr = (key, val) => {
  let data = {}
  data[key] = val
  return {
    isStatic: true,
    data
  }
}
export default {
  云无留迹的过客: {
    2: attr('heal', 10)
  },
  野穗伴行的快枪手: {
    2: attr('atkPct', 12),
    4: [attr('speed', 6), {
      title: '普攻伤害提高10%',
      data: {
        aDmg: 10
      }
    }]
  },
  净庭教宗的圣骑士: {
    2: attr('defPct', 15),
    4: {
      title: '护盾强效提高20%',
      data: {
        shield: 20
      }
    }
  },
  密林卧雪的猎人: {
    2: attr('ice', 10),
    4: {
      title: '释放终结技后2回合，爆伤提高25%',
      data: {
        cdmg: 25
      }
    }
  },
  街头出身的拳王: {
    2: attr('phy', 10),
    4: {
      title: '攻击或被攻击5层Buff提高攻击力25%',
      data: {
        atkPct: 25
      }
    }
  },
  熔岩锻铸的火匠: {
    2: attr('fire', 10),
    4: {
      title: '战技造成的伤害提高12%，释放终结技下一次的火属性伤害提高12%',
      data: {
        eDmg: 12,
        dmg: 12 // todo: 检查属性
      }
    }
  },
  繁星璀璨的天才: {
    2: attr('quantum', 10),
    4: {
      title: '对有量子弱点的目标造成伤害时，无视其20%的防御力',
      data: {
        ignore: 20
      }
    }
  },
  激奏雷电的乐队: {
    2: attr('elec', 10),
    4: {
      title: '释放战绩时，攻击力提高20%',
      data: {
        atkPct: 20
      }
    }
  },
  晨昏交界的翔鹰: {
    2: attr('wind', 10)
  },
  流星追迹的怪盗: {
    2: attr('stance', 16),
    4: attr('stance', 16)
  },
  盗匪荒漠的废土客: {
    2: attr('imaginary', 10),
    4: {
      title: '对陷入负面效果的目标的暴击率提高10%，对禁锢状态的目标暴击率提高20%',
      data: {
        cpct: 10
      }
    }
  },
  太空封印站: {
    2: [attr('atkPct', 12), {
      title: '速度大于等于120提高攻击力12%',
      check: ({ calc, attr }) => calc(attr.speed) > 120,
      data: {
        atkPct: 12
      }
    }]
  },
  不老者的仙舟: {
    2: [attr('hpPct', 12), {
      title: '速度大于等于120提高攻击力8%',
      check: ({ calc, attr }) => calc(attr.speed) > 120,
      data: {
        atkPct: 8
      }
    }]
  },
  泛银河商业公司: {
    2: [attr('effPct', 12), {
      title: '基于效果命中提高攻击力[atkPct]%',
      data: {
        atkPct: ({ calc, attr }) => Math.min(25, calc(attr.effPct) / 4 || 0)
      }
    }]
  },
  筑城者的贝洛伯格: {
    2: [attr('defPct', 12), {
      title: '效果命中大于50%时，提高防御力15%',
      check: ({ calc, attr }) => calc(attr.effPct) > 50,
      data: {
        defPct: 15
      }
    }]
  },
  星体差分机: {
    2: attr('cdmg', 16)
  },
  停转的萨尔索图: {
    2: [attr('cpct', 8), {
      title: '终结技与追加攻击造成的伤害提高15%',
      check: ({ attr, calc }) => {
        return calc(attr.cpct) > 50
      },
      data: {
        qDmg: 15,
        a3Dmg: 15
      }
    }]
  },
  盗贼公国塔利亚: {
    2: [attr('stance', 16), {
      title: '速度大于145时，击破特攻提高20%',
      check: ({ calc, attr }) => calc(attr.speed) > 145,
      data: {
        stance: 20
      }
    }]
  },
  生命的翁瓦克: {
    2: attr('recharge', 5)
  }
}
