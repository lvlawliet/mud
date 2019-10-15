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
      },
      2: {
        id: 2,
        name: '剑声·商',
        max: 1,
      },
      3: {
        id: 3,
        name: '剑声·角',
        max: 1,
      },
      4: {
        id: 4,
        name: '剑声·徵',
        max: 1,
      },
      5: {
        id: 5,
        name: '剑声·羽',
        max: 1,
      },
    }

    // skills
    this.skills = {
      1: {
        id: 1,
        name: '回龙斩',
        cost: 0,
        des: '狂龙八斩之中最基本的刀式，造成少量伤害，回复一定狂刀值并增加一层龙悟',
        damagebase: 100,
        damageratiomin: 1.9,
        damageratiomax: 2.1,
        other: 30,
        type: 'damage',
      },
      2: {
        id: 2,
        name: '离刀斩',
        cost: 30,
        des: '以气御刀，影随刀动，造成中量伤害，增加三层龙悟，有小概率返还消耗刀气或增加六层龙悟',
        damagebase: 200,
        damageratiomin: 2.5,
        damageratiomax: 2.6,
        other: 0,
        type: 'damage',
      },
      3: {
        id: 3,
        name: '庐山不动一刀痕',
        cost: 30,
        des: '双手握刀进入冥想状态，消耗所有刀气，大幅度降低下一次伤害并回复消耗的双倍刀气',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 75,
        type: 'other',
      },
      4: {
        id: 4,
        name: '刀狂·亢龙有悔',
        cost: 80,
        des: '将刀术发挥到极致，使刀与龙产生共鸣，消耗所有龙悟，对目标造成致命伤害',
        damagebase: 500,
        damageratiomin: 3,
        damageratiomax: 3.5,
        other: 0,
        type: 'damage',
      },
      5: {
        id: 5,
        name: '刀心·龙悟',
        cost: 0,
        des: '(被动)杀刀融入狂龙之意，提高自己的伤害能力，并强化绝招',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 1,
        type: 'passive',
      },
      101: {
        id: 101,
        name: '剑一·破',
        cost: 10,
        des: '飘渺剑式第一式，造成少量伤害，随机领悟一种剑声',
        damagebase: 80,
        damageratiomin: 2.2,
        damageratiomax: 2.4,
        other: 0,
        type: 'damage',
      },
      102: {
        id: 102,
        name: '残雪封桥',
        cost: 50,
        des: '剑光如雪，雪封四方，造成大量伤害，小概率领悟一种没有的剑声',
        damagebase: 300,
        damageratiomin: 2.5,
        damageratiomax: 2.8,
        other: 0,
        type: 'damage',
      },
      103: {
        id: 103,
        name: '悟剑声',
        cost: 0,
        des: '天外情风吹云立，红尘飞雨悟剑声。消耗所有剑意，每消耗20点剑意随机领悟一种剑声。',
        damagebase: 300,
        damageratiomin: 2.5,
        damageratiomax: 2.8,
        other: 0,
        type: 'other',
      },
      104: {
        id: 104,
        name: '一式留神',
        cost: 80,
        des: '剑式至高境界，消耗所有剑声，造成大量伤害，如果释放时剑声有五种，则改为烟雨斜阳',
        damagebase: 400,
        damageratiomin: 3.3,
        damageratiomax: 3.8,
        other: 0,
        type: 'damage',
      },
      105: {
        id: 105,
        name: '观剑不则声',
        cost: 0,
        des: '根据剑之韵律领悟剑意之声，每回合结束后回复20点剑意，同事根据宫商角徵羽不同音律提升各有不同，而且更可以从五律之中领悟天剑慕容府的绝世剑招·烟雨斜阳',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 0,
        type: 'passive',
      },
      106: {
        id: 106,
        name: '烟雨斜阳',
        cost: 80,
        des: '天剑慕容，烟雨斜阳，昔日剑神慕容烟雨绝世剑招再现，纵横开阖之势，无招剑境之韵',
        damagebase: 600,
        damageratiomin: 4,
        damageratiomax: 4.5,
        other: 0,
        type: 'damage',
      },
      1000: {
        id: 1000,
        name: '祈音遍世',
        cost: 0,
        des: '',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 0,
        type: 'passive',
      },
      1001: {
        id: 1001,
        name: '甘霖普降·洗尽铅华',
        cost: 0,
        des: '',
        damagebase: 0,
        damageratiomin: 0,
        damageratiomax: 0,
        other: 0,
        type: 'passive',
      },
    }
  }

  checkcost(player, skill) {
    if (player.sourcenow < skill.cost) {
      return false
    }
    player.sourcenow -= skill.cost
    return true
  }

  checkhit(skill, cast, target) {
    if (skill.type != 'damage') {
      return true;
    }
    var hitpercent = 75 + (cast.getshenfa() - target.getshenfa()) / 8
    var rand = Math.floor(Math.random() * 100)
    if (hitpercent >= rand) {
      return true
    }
    return false
  }

  calculatedamage(skill, cast, target) {
    var type = 0
    //var more = Math.floor(Math.random() * (skill.damageratiomax - skill.damageratiomin) * cast.getphyattack()) / 100 * 50
    var more = (Math.random() * (skill.damageratiomax - skill.damageratiomin) + skill.damageratiomin) * cast.getphyattack()
    var damage = Math.floor(skill.damagebase + more)
    damage -= target.getphydefence()
    // crit
    var critpercent = cast.getcrit()
    var rand = Math.floor(Math.random() * 100)
    if (critpercent >= rand) {
      type = 1
      damage = Math.floor(damage * 1.5)
    }
    target.hpadd(-damage)
    return {
      0: type,
      1: damage
    }
  }

  endround(cast, target) {
    var dinfo = []
    for (var key in cast.passiveskills) {
      var effect = this.dopassiveskills(cast.passiveskills[key], cast, target)
      for (var i = 0; i < effect.length; i++) {
        dinfo.push(effect[i])
      }
    }
    for (var key in target.passiveskills) {
      var effect = this.dopassiveskills(target.passiveskills[key], target, cast)
      for (var i = 0; i < effect.length; i++) {
        dinfo.push(effect[i])
      }
    }
    return dinfo
  }

  // check alive
  checkalive(playerA, playerB) {
    var dinfo = []
    if (playerA.hpnow <= 0) {
      dinfo.push(playerA.name + "被" + playerB.name + "打成重伤")
      for (var key in playerA.passiveskills) {
        var effect = this.dodeadeffect(playerA.passiveskills[key], playerA, playerB)
        for (var i = 0; i < effect.length; i++) {
          dinfo.push(effect[i])
        }
      }
    }
    if (playerB.hpnow <= 0) {
      dinfo.push(playerB.name + "被" + playerA.name + "打成重伤")
      for (var key in playerB.passiveskills) {
        var effect = this.dodeadeffect(playerB.passiveskills[key], playerB, playerA)
        for (var i = 0; i < effect.length; i++) {
          dinfo.push(effect[i])
        }
      }
    }
    if (playerA.hpnow <= 0 && playerB.hpnow <= 0) {}
    if (playerA.hpnow <= 0) {
      return {
        result: 2,
        info: dinfo
      }
    }
    if (playerB.hpnow <= 0) {
      return {
        result: 1,
        info: dinfo
      }
    }
    return {
      result: 0,
      info: dinfo
    }
  }

  // skill main work
  work(id, cast, target) {
    var dinfo = []
    var skill = this.skills[id]
    // source 
    if (this.checkcost(cast, skill) == false) {
      dinfo.push(cast.getsourcename() + "不足以释放[" + skill.name + "]")
      return dinfo
    }
    // skill replace
    skill = this.checkreplace(skill, cast, target)
    // hit or not
    if (this.checkhit(skill, cast, target) == false) {
      //dinfo.push(target.name + "轻轻侧身，躲过了" + cast.name + "的[" + skill.name + "]")
      dinfo.push(cast.name + "手上略感吃力," + "[" + skill.name + "]并未击中" + target.name)
    } else {
      var bdes = this.bigskilldes(skill, cast, target)
      for (var i = 0; i < bdes.length; i++) {
        dinfo.push(bdes[i])
      }
      if (skill.type == 'damage') {
        //var more = Math.floor(Math.random() * (skill.damageratiomax - skill.damageratiomin) * cast.getphyattack()) / 100 * 50
        //var damage = Math.floor(skill.damagebase + more)
        var re = this.calculatedamage(skill, cast, target, type)
        var type = re[0]
        var damage = re[1]
        if (type == 0) {
          dinfo.push(cast.name + "的[" + skill.name + "]对" + target.name + "造成了" + damage + "伤害")
        } else {
          dinfo.push(cast.name + "的[" + skill.name + "]对" + target.name + "产生了致命一击，造成了" + damage + "伤害")
        }
      } else if (skill.type == 'other') {
        var tmpd = this.dootherskill(skill, cast, target)
        for (var i = 0; i < tmpd.length; i++) {
          dinfo.push(tmpd[i])
        }
      }
    }
    // effect
    var effect = this.doeffectafterdamage(skill, cast, target)
    for (var i = 0; i < effect.length; i++) {
      dinfo.push(effect[i])
    }
    return dinfo
  }

  // do not damage or heal skill
  dootherskill(skill, cast, target) {
    var dinfo = []
    if (skill.id == 103) {
      while (cast.sourcenow >= 20) {
        cast.sourcenow -= 20
        var rand = Math.floor(Math.random() * 5) + 1
        var buff = this.buffs[rand]
        cast.buffs[buff.id] = {
          buff: buff,
          number: 1
        }
        dinfo.push(cast.name + "通过[" + skill.name + "]消耗了20点剑意并领悟了[" + buff.name + "]")
      }
    }
    return dinfo
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target) {
    var dinfo = []
    if (skill.id == 101) {
      var rand = Math.floor(Math.random() * 5) + 1
      var buff = this.buffs[rand]
      cast.buffs[buff.id] = {
        buff: buff,
        number: 1
      }
      dinfo.push(cast.name + "的[" + skill.name + "]对自身产生了[" + buff.name + "]")
    } else
    if (skill.id == 102) {
      var rand = Math.floor(Math.random() * 100)
      if (rand < 20) {
        for (var i = 1; i <= 5; i++) {
          if (cast.buffs.hasOwnProperty(i) == false) {
            var buff = this.buffs[i]
            cast.buffs[i] = {
              buff: buff,
              number: 1
            }
            dinfo.push(cast.name + "通过[" + skill.name + "]领悟了[" + buff.name + "]")
            break;
          }
        }
      }
    } else
    if (skill.id == 106) {
      dinfo.push(cast.name + "的[" + skill.name + "]消耗掉了全部剑声")
      for (var i = 1; i <= 5; i++) {
        delete cast.buffs[i]
      }
    }

    return dinfo
  }

  // do passive
  dopassiveskills(skill, cast, target) {
    var dinfo = []
    if (skill.id == 105) {
      var tmps = cast.sourceadd(20)
      dinfo.push(cast.name + "通过[" + skill.name + "]恢复了" + tmps + "点剑意")
    } else
    if (skill.id == 1000) {
      var tmps = cast.hpadd(1 * cast.getgengu())
      dinfo.push(cast.name + "受到玄武真道教宗的[" + skill.name + "]祝福，恢复了" + tmps + "点生命")

    }
    return dinfo
  }

  // check skill replace
  checkreplace(skill, cast, target) {
    if (skill.id == 104) {
      console.log(cast.buffs)
      var flag = true
      for (var i = 1; i <= 5; i++) {
        if (cast.buffs.hasOwnProperty(i) == false) {
          flag = false
          break;
        }
      }
      if (flag == true) {
        return this.skills[106]
      } else {
        return skill
      }
    }
    return skill
  }

  dodeadeffect(skill, cast, target) {
    var dinfo = []
    if (skill.id == 1001) {
      if (cast.hpnow > -600) {
        cast.hpnow = cast.gethpmax()
        dinfo.push(cast.name + "受到的伤害并未至死，并且受到玄武真神[" + skill.name + "]神力的庇护，伤势痊愈。玄武真道，齐天寿甲！")
      }
    }
    return dinfo
  }

  // big skill extra describe
  bigskilldes(skill, cast, target) {
    var dinfo = []
    if (skill.id == 106) {
      dinfo.push(skill.des)
    }
    return dinfo
  }

}