let instance

export default class SkillBus {

  constructor() {
    if (instance)
      return instance
    instance = this
    // buff
    this.buffs = {
      1: {
        id: 1,
        name: '剑声·宫',
        max: 1,
        round: -99,
        wuxing: 2,
        profit: true,
      },
      2: {
        id: 2,
        name: '剑声·商',
        max: 1,
        round: -99,
        wuxing: 2,
        profit: true,
      },
      3: {
        id: 3,
        name: '剑声·角',
        max: 1,
        round: -99,
        wuxing: 2,
        profit: true,
      },
      4: {
        id: 4,
        name: '剑声·徵',
        max: 1,
        round: -99,
        wuxing: 2,
        profit: true,
      },
      5: {
        id: 5,
        name: '剑声·羽',
        max: 1,
        round: -99,
        wuxing: 2,
        profit: true,
      },
      6: {
        id: 6,
        name: '龙悟',
        max: 25,
        round: -99,
        wuxing: 1,
        profit: true,
      },
      7: {
        id: 7,
        name: '庐山不动',
        max: 1,
        round: 2,
        wuxing: 1,
        profit: true,
      },
      8: {
        id: 8,
        name: '玄武·刺',
        max: 1,
        round: 2,
        wuxing: 5,
        profit: true,
      },
      9: {
        id: 9,
        name: '玄武·愈',
        max: 1,
        round: 2,
        wuxing: 5,
        profit: true,
      },
      10: {
        id: 10,
        name: '玄武·护',
        max: 1,
        round: 2,
        wuxing: 5,
        profit: true,
      },
      11: {
        id: 11,
        name: '星旗·力',
        max: 1,
        round: 3,
        wuxing: 1,
        profit: true,
      },
      12: {
        id: 12,
        name: '星旗·锐',
        max: 1,
        round: 3,
        wuxing: 1,
        profit: true,
      },
      13: {
        id: 13,
        name: '星旗·破',
        max: 1,
        round: 3,
        wuxing: 1,
        profit: true,
      },
      14: {
        id: 14,
        name: '忘断',
        max: 1,
        round: -99,
        wuxing: 1,
        profit: true,
      },
      15: {
        id: 15,
        name: '链接',
        max: 1,
        round: 4,
        wuxing: 5,
        profit: false,
      }
    }

    // skills
    this.skills = {
      0: {
        id: 0,
        name: '基础拳法',
        cost: 2,
        sourcecost: 0,
        job: 0,
        des: '',
        damagebase: 100,
        damageratiomin: 1.5,
        damageratiomax: 1.5,
        other: 0,
        type: 'damage',
        wuxing: 0,
      },
      1: {
        id: 1,
        name: '回龙斩',
        cost: 2,
        sourcecost: 0,
        job: 2,
        des: '狂龙八斩之中最基本的刀式，造成少量伤害，回复一定狂刀值并增加一层龙悟',
        damagebase: 100,
        damageratiomin: 1.9,
        damageratiomax: 2.1,
        other: 30,
        type: 'damage',
        wuxing: 1,
      },
      2: {
        id: 2,
        name: '离刀斩',
        cost: 0,
        sourcecost: 50,
        job: 2,
        des: '以气御刀，影随刀动，造成中量伤害，增加三层龙悟，有小概率返还消耗狂刀值或增加六层龙悟',
        damagebase: 200,
        damageratiomin: 2.5,
        damageratiomax: 2.6,
        other: 0,
        type: 'damage',
        wuxing: 1,
      },
      3: {
        id: 3,
        name: '庐山不动一刀痕',
        cost: 20,
        sourcecost: 20,
        job: 2,
        des: '双手握刀进入冥想状态，放弃本次行动，但极大的提高自身能力，持续到下回合结束',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 75,
        type: 'other',
        wuxing: 1,
      },
      4: {
        id: 4,
        name: '刀狂·亢龙有悔',
        cost: 50,
        sourcecost: 80,
        job: 2,
        des: '将刀术发挥到极致，使刀与龙产生共鸣，消耗所有龙悟，对目标造成致命伤害，并根据消耗的龙悟回复狂刀值',
        damagebase: 500,
        damageratiomin: 3,
        damageratiomax: 3.5,
        other: 0,
        type: 'damage',
        wuxing: 1,
      },
      5: {
        id: 5,
        name: '刀心·龙悟',
        cost: 0,
        sourcecost: 0,
        job: 2,
        des: '(被动)杀刀融入狂龙之意，强化自身能力，造成伤害时根据龙悟层数回复狂刀值，并强化绝招',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 1,
        type: 'passive',
        wuxing: 1,
      },
      101: {
        id: 101,
        name: '剑一·破',
        cost: 2,
        sourcecost: 10,
        job: 1,
        des: '飘渺剑式第一式，造成少量伤害，随机领悟一种剑声',
        damagebase: 80,
        damageratiomin: 2.2,
        damageratiomax: 2.4,
        other: 0,
        type: 'damage',
        wuxing: 2,
      },
      102: {
        id: 102,
        name: '残雪封桥',
        cost: 0,
        sourcecost: 50,
        job: 1,
        des: '剑光如雪，雪封四方，造成大量伤害，小概率领悟一种没有的剑声',
        damagebase: 300,
        damageratiomin: 2.5,
        damageratiomax: 2.8,
        other: 0,
        type: 'damage',
        wuxing: 2,
      },
      103: {
        id: 103,
        name: '悟剑声',
        cost: 30,
        sourcecost: 0,
        job: 1,
        des: '天外情风吹云立，红尘飞雨悟剑声。消耗所有剑意，每消耗20点剑意随机领悟一种剑声。',
        damagebase: 300,
        damageratiomin: 2.5,
        damageratiomax: 2.8,
        other: 0,
        type: 'other',
        wuxing: 2,
      },
      104: {
        id: 104,
        name: '一式留神',
        cost: 50,
        sourcecost: 80,
        job: 1,
        des: '剑式至高境界，消耗所有剑声，造成大量伤害，如果释放时剑声有五种，则改为烟雨斜阳',
        damagebase: 400,
        damageratiomin: 3.3,
        damageratiomax: 3.8,
        other: 0,
        type: 'damage',
        wuxing: 2,
      },
      105: {
        id: 105,
        name: '观剑不则声',
        cost: 0,
        sourcecost: 0,
        job: 1,
        des: '(被动)根据剑之韵律领悟剑意之声，每回合结束后回复20点剑意，同事根据宫商角徵羽不同音律提升各有不同，而且更可以从五律之中领悟天剑慕容府的绝世剑招·烟雨斜阳',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 0,
        type: 'passive',
        wuxing: 2,
      },
      106: {
        id: 106,
        name: '烟雨斜阳',
        cost: 50,
        sourcecost: 80,
        job: 1,
        des: '天剑慕容，烟雨斜阳，昔日剑神慕容烟雨绝世剑招再现，纵横开阖之势，无招剑境之韵',
        damagebase: 600,
        damageratiomin: 4,
        damageratiomax: 4.5,
        other: 0,
        type: 'damage',
        wuxing: 2,
      },
      200: {
        id: 200,
        name: '星垂平野',
        cost: 10,
        sourcecost: 0,
        job: 3,
        des: '',
        damagebase: 100,
        damageratiomin: 1.8,
        damageratiomax: 2,
        other: 0,
        type: 'damage',
        wuxing: 1,
      },
      201: {
        id: 201,
        name: '金戈回澜',
        cost: 0,
        sourcecost: 3,
        job: 3,
        des: '',
        damagebase: 200,
        damageratiomin: 3,
        damageratiomax: 3.5,
        other: 0,
        type: 'damage',
        wuxing: 1,
      },
      202: {
        id: 202,
        name: '日月吴钩',
        cost: 50,
        sourcecost: 0,
        job: 3,
        des: '',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 0,
        type: 'other',
        wuxing: 1,
      },
      203: {
        id: 203,
        name: '骤雨寒江',
        cost: 100,
        sourcecost: 5,
        job: 3,
        des: '',
        damagebase: 800,
        damageratiomin: 3.6,
        damageratiomax: 3.8,
        other: 0,
        type: 'damage',
        wuxing: 1,
        notmiss: 1,
      },
      204: {
        id: 204,
        name: '断水刃心法',
        cost: 0,
        sourcecost: 0,
        job: 3,
        des: '',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 0,
        type: 'passive',
        wuxing: 1,
      },
      205: {
        id: 205,
        name: '血覆黄泉',
        cost: 20,
        sourcecost: 0,
        job: 3,
        des: '',
        damagebase: 50,
        damageratiomin: 1.1,
        damageratiomax: 1.5,
        other: 0,
        type: 'damage',
        wuxing: 5,
      },
      206: {
        id: 206,
        name: '幽冥窥月',
        cost: 20,
        sourcecost: 1,
        job: 3,
        des: '',
        damagebase: 250,
        damageratiomin: 2.8,
        damageratiomax: 3.2,
        other: 0,
        type: 'damage',
        wuxing: 5,
      },
      1000: {
        id: 1000,
        name: '祈音遍世',
        cost: 0,
        sourcecost: 0,
        job: 0,
        des: '',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 0,
        type: 'passive',
        wuxing: 0,
      },
      1001: {
        id: 1001,
        name: '甘霖普降·洗尽铅华',
        cost: 0,
        sourcecost: 0,
        job: 0,
        des: '',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 0,
        type: 'passive',
        wuxing: 0,
      },
      1002: {
        id: 1002,
        name: "玄武咬",
        cost: 5,
        sourcecost: 0,
        job: 100,
        des: '造成小量物理伤害，并产生一只小玄武',
        damagebase: 50,
        damageratiomin: 1.5,
        damageratiomax: 2.1,
        other: 0,
        type: 'damage',
        wuxing: 5,
      },
      1003: {
        id: 1003,
        name: "玄武盾",
        cost: 10,
        sourcecost: 0,
        job: 100,
        des: '随机获得一种神龟祝福，小玄武越多效果越强大',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 20,
        other: 0,
        type: 'other',
        wuxing: 5,
      },
      1004: {
        id: 1004,
        name: "一只玄武入海了",
        cost: 20,
        sourcecost: 20,
        job: 100,
        des: '一只只小玄武冲向敌人，在重重打击敌人后爬入大海',
        damagebase: 800,
        damageratiomin: 5,
        damageratiomax: 30,
        other: 0,
        type: 'damage',
        notmiss: 1,
        wuxing: 5,
      },
      9999: {
        id: 9999,
        name: "发呆",
        cost: 0,
        sourcecost: 0,
        job: 0,
        des: '',
        damagebase: 800,
        damageratiomin: 5,
        damageratiomax: 30,
        other: 0,
        type: 'other',
        notmiss: 1,
        wuxing: 0,
      },
      10000: {
        id: 10000,
        name: "基础内功",
        cost: 0,
        sourcecost: 0,
        job: 0,
        des: '',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 0,
        type: 'passive',
        wuxing: 0,
      }
    }
  }
}