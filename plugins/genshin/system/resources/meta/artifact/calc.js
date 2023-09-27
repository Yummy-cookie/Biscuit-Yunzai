const attr = function (key, val, elem = '', unit = '%') {
  const keyMap = {
    hp: '生命值',
    hpPlus: '生命值',
    atk: '攻击力',
    def: '防御力',
    cpct: '暴击率',
    dmg: '元素伤害',
    phy: '物理伤害',
    shield: '护盾强效',
    heal: '治疗',
    mastery: '元素精通'
  }
  let ret = {
    title: `${keyMap[key]}提高${val}${unit}`,
    isStatic: true,
    data: {}
  }
  ret.data[key] = val
  if (elem) {
    ret.elem = elem
  }
  return ret
}

const buffs = {

  行者之心: {
    2: attr('atkPct', 18),
    4: {
      title: '重击的暴击率提高30%',
      data: {
        a2Cpct: 30
      }
    }
  },

  勇士之心: {
    2: attr('atkPct', 18),
    4: {
      title: '对生命值高于50%的敌人，造成的伤害增加30%',
      data: {
        dmg: 30
      }
    }
  },

  守护之心: {
    2: attr('defPct', 30)
  },

  奇迹: {},

  战狂: {
    2: attr('cpct', 12),
    4: {
      title: '生命值低于70%时，暴击率提升24%',
      data: {
        cpct: 24
      }
    }
  },

  武人: {
    2: {
      title: '普攻与重击造成的伤害提高15%',
      data: {
        aDmg: 15,
        a2Dmg: 15
      }
    },
    4: {
      title: '施放元素战技后的8秒内，普攻和重击伤害提升25%',
      data: {
        aDmg: 25,
        a2Dmg: 25
      }
    }
  },

  教官: {
    2: attr('mastery', 80),
    4: {
      title: '触发元素反应后，队伍中所有角色的元素精通提高120点',
      data: {
        mastery: 120,
        masteryInc: 120
      }
    }
  },

  赌徒: {
    2: {
      title: '元素战技造成的伤害提升20%',
      data: {
        eDmg: 20
      }
    }
  },

  流放者: {
    2: attr('recharge', 20)
  },

  冒险家: {
    2: attr('hpPlus', 1000, '', '点')
  },

  幸运儿: {
    2: attr('defPlus', 100, '', '点')
  },

  学士: {
    2: attr('recharge', 20)
  },

  // TODO 此处是受治疗
  游医: {
    2: attr('heal', 20)
  },

  冰风迷途的勇士: {
    2: attr('dmg', 15, '冰'),
    4: {
      check: ({ element }) => element === '冰',
      title: '攻击处于冰元素影响下的敌人时，暴击率提高20%',
      data: {
        cpct: 20
      }
    }
  },

  平息鸣雷的尊者: {
    4: {
      check: ({ element }) => element === '雷',
      title: '对处于雷元素影响下的敌人造成的伤害提升35%',
      data: {
        dmg: 35
      }
    }
  },

  渡过烈火的贤人: {
    4: {
      check: ({ element }) => element === '火',
      title: '对处于火元素影响下的敌人造成的伤害提升35%',
      data: {
        dmg: 35
      }
    }
  },

  被怜爱的少女: {
    2: attr('heal', 15),
    4: {
      title: '施放元素战技或元素爆发后，受治疗效果加成提高20%',
      data: {
        healInc: 20
      }
    }
  },

  角斗士的终幕礼: {
    2: attr('atkPct', 18),
    4: {
      check: ({ weaponTypeName }) => ['单手剑', '双手剑', '长柄武器'].includes(weaponTypeName),
      title: '角色普通攻击造成的伤害提高35%',
      data: {
        aDmg: 35
      }
    }
  },

  翠绿之影: {
    2: attr('dmg', 15, '风'),
    4: {
      title: '扩散反应造成的伤害提升60%，降低对应元素抗性40%',
      sort: 5,
      data: {
        swirl: 60,
        fykx: 40
      }
    }
  },

  流浪大地的乐团: {
    2: attr('mastery', 80),
    4: {
      check: ({ weaponTypeName }) => ['法器', '弓'].includes(weaponTypeName),
      title: '角色重击造成的伤害提高35%',
      data: {
        a2Dmg: 35
      }
    }
  },

  如雷的盛怒: {
    2: attr('dmg', 15, '雷'),
    4: {
      title: '超载、感电、超导反应造成的伤害提升40%，超激化反应带来的伤害提升提高20%',
      data: {
        overloaded: 40,
        electroCharged: 40,
        superConduct: 40,
        aggravate: 20
      }
    }
  },

  炽烈的炎之魔女: {
    2: attr('dmg', 15, '火'),
    4: {
      check: ({ element }) => element === '火',
      title: '蒸发、融化伤害提高15%，[buffCount]层额外提高[dmg]%火元素伤害加成，超载、燃烧、烈绽放反应造成的伤害提升40%',
      data: {
        vaporize: 15,
        melt: 15,
        overloaded: 40,
        burning: 40,
        burgeon: 40,
        dmg: ({ params }) => (params.monv || 1) * 7.5,
        buffCount: ({ params }) => params.monv || 1
      }
    }
  },

  昔日宗室之仪: {
    2: {
      title: '元素爆发造成的伤害提升20%',
      data: {
        qDmg: 20
      }
    },
    4: {
      title: '施放元素爆发后，攻击力提升20%',
      check: ({ currentTalent }) => !currentTalent || currentTalent === 'q',
      data: {
        atkPct: 20
      }
    }
  },

  染血的骑士道: {
    2: attr('phy', 25),
    4: {
      title: '染血4：击败敌人后的10秒内，重击造成的伤害提升50%',
      data: {
        a2Dmg: 50
      }
    }
  },

  悠古的磐岩: {
    2: attr('dmg', 15, '岩'),
    4: {
      title: '获得元素反应晶片，对应元素伤害提高35%',
      data: {
        dmg: 35
      }
    }
  },

  逆飞的流星: {
    2: attr('shield', 35),
    4: {
      title: '处于护盾庇护下时，获得40%普攻和重击伤害加成',
      data: {
        aDmg: 40,
        a2Dmg: 40
      }
    }
  },

  沉沦之心: {
    2: attr('dmg', 15, '水'),
    4: {
      title: '施放元素战技后，普攻与重击伤害提高30%',
      data: {
        aDmg: 30,
        a2Dmg: 30
      }
    }
  },

  千岩牢固: {
    2: attr('hpPct', 20),
    4: {
      title: '元素战技命中敌人后，攻击力提升20%',
      data: {
        atkPct: 20
      }
    }
  },

  苍白之火: {
    2: attr('phy', 25),
    4: {
      title: '2层提高18%攻击力，物理伤害额外提高25%',
      data: {
        atkPct: 18,
        phy: 25
      }
    }
  },

  追忆之注连: {
    2: attr('atkPct', 18),
    4: {
      title: '施放元素战技后，普通攻击、重击、下落攻击造成的伤害提高50%',
      data: {
        aDmg: 50,
        a2Dmg: 50,
        a3Dmg: 50
      }
    }
  },

  绝缘之旗印: {
    2: attr('recharge', 20),
    4: {
      title: '基于元素充能效率提高元素爆发[qDmg]%伤害',
      data: {
        qDmg: ({ attr }) => Math.min(75, (attr.recharge.base + attr.recharge.plus) * 0.25)
      }
    }
  },

  华馆梦醒形骸记: {
    2: attr('defPct', 30),
    4: {
      title: '满层获得24%防御及24%岩伤加成',
      sort: 0,
      data: {
        defPct: 24,
        dmg: 24
      }
    }
  },

  海染砗磲: {
    2: attr('heal', 15)
  },

  辰砂往生录: {
    2: attr('atkPct', 18),
    4: {
      title: '满层提高48%攻击力',
      data: {
        atkPct: 48
      }
    }
  },

  来歆余响: {
    2: attr('atkPct', 18),
    4: {
      title: '触发提高普攻[aPlus]伤害',
      sort: 10,
      data: {
        aPlus: ({ attr }) => (attr.atk.base + attr.atk.plus + attr.atk.pct * attr.atk.base / 100) * 0.35
      }
    }
  },

  深林的记忆: {
    2: attr('dmg', 15, '草'),
    4: {
      title: '元素战技或元素爆发命中敌人后，使命中目标的草元素抗性降低30%',
      check: ({ element }) => element === '草',
      data: {
        kx: 30
      }
    }
  },

  饰金之梦: {
    2: attr('mastery', 80),
    4: {
      title: '队伍存在其他3个不同元素类型角色时，精通提高150',
      sort: 0,
      data: {
        mastery: 150
      }
    }
  },

  沙上楼阁史话: {
    2: attr('dmg', 15, '风'),
    4: {
      title: '重击命中敌人后，普攻重击与下落攻击伤害提升40',
      data: {
        aDmg: 40,
        a2Dmg: 40,
        a3Dmg: 40
      }
    }
  },

  乐园遗落之花: {
    2: attr('mastery', 80),
    4: {
      title: '满层提高绽放、超绽放、烈绽放反应造成的伤害提升80%',
      data: {
        bloom: 80,
        burgeon: 80,
        hyperBloom: 80
      }
    }
  },

  水仙之梦: {
    2: attr('dmg', 15, '水'),
    4: {
      title: '3层Buff下提高攻击力25%，水伤15%',
      data: {
        atkPct: 25,
        dmg: 15
      }
    }
  },

  花海甘露之光: {
    2: attr('hpPct', 20),
    4: {
      title: '5层Buff下提高元素战技与元素爆发伤害50%',
      data: {
        eDmg: 50,
        qDmg: 50
      }
    }
  },

  逐影猎人: {
    2: {
      title: '普通攻击与重击造成的伤害提高15%',
      data: {
        aDmg: 15,
        a2Dmg: 15
      }
    },
    4: {
      title: '3层Buff下提高暴击率36%',
      data: {
        cpct: 36
      }
    }
  },

  黄金剧团: {
    2: {
      title: '元素战技造成的伤害提升20%',
      data: {
        eDmg: 20
      }
    },
    4: {
      title: '满层时元素战技造成的伤害提升50%',
      data: {
        eDmg: 50
      }
    }
  }
}
export default buffs
