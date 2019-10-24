import SkillBus from './template/skillbus'
import SkillRegister from './template/skillregister'
import BuffRegister from './template/buffregister'
import Template from './template/template'

let skilldata = new SkillBus()
let rs = new SkillRegister()
let br = new BuffRegister()
let tempman = new Template()

let instance

export default class Fight {
  constructor() {
    if (instance)
      return instance
    instance = this
  }

  checkcost(player, skill) {
    if (player.magicnow < skill.cost) {
      return false
    }
    if (player.sourcenow < skill.sourcecost) {
      return false
    }
    player.sourcenow -= skill.sourcecost
    player.magicnow -= skill.cost
    return true
  }

  checkhit(skill, cast, target) {
    if (skill.type != 'damage') {
      return true;
    }
    if (typeof(skill.notmiss) != "undefined") {
      return true
    }
    var hitpercent = 85 + (cast.getshenfa() - target.getshenfa()) / 8 + cast.getextrahit()
    var rand = Math.floor(Math.random() * 100)
    if (hitpercent >= rand) {
      return true
    }
    return false
  }

  calculatedamage(skill, cast, target) {
    var type = 0
    var more = (Math.random() * (skill.damageratiomax - skill.damageratiomin) + skill.damageratiomin) * cast.getphyattack()
    var damage = Math.floor(skill.damagebase + more)
    damage -= target.getphydefence()
    // wuxing
    var percent = 1
    for (var i = 0; i < target.wuxing.length; i++) {
      percent = percent * tempman.wuxingrestrain[skill.wuxing][target.wuxing[i]]
    }
    damage = damage * percent
    // crit
    var critpercent = cast.getcrit()
    var rand = Math.floor(Math.random() * 100)
    if (critpercent >= rand) {
      type = 1
      damage = Math.floor(damage * 1.5)
    } else  {
      damage = Math.floor(damage)
    }
    var temp = {
      'type': type,
      'damage': damage,
    }
    temp = rs.sr[skill.id].doskilleffectbeforebedamage(skill, cast, target, temp)
    temp = this.dobuffandpassiveeffectbeforebedamage(skill, cast, target, temp)
    temp = this.dobuffandpassiveeffectbeforebedamage(skill, target, cast, temp)
    target.hpadd(-temp.damage)
    return {
      0: temp.type,
      1: temp.damage
    }
  }

  endround(cast, target) {
    var dinfo = []
    // do passive
    for (var key in cast.passiveskills) {
      var effect = this.dopassiveskills(cast.passiveskills[key], cast, target)
      for (var i = 0; i < effect.length; i++) {
        dinfo.push(effect[i])
      }
    }
    // do buff
    for (var key in cast.buffs) {
      var buff = skilldata.buffs[key]
      var effect = br.br[key].doeffectonroundend(cast, target)
      for (var i = 0; i < effect.length; i++) {
        dinfo.push(effect[i])
      }
      if (cast.buffs[key].round != -99) {
        cast.buffs[key].round--
        if (cast.buffs[key].round <= 0) {
          cast.removebuff(key, 99)
          dinfo.push("[" + buff.name + "]" + "从" + cast.name + "身上消失")
          var effect = br.br[key].doeffectafterdelete(cast)
          for (var i = 0; i < effect.length; i++) {
            dinfo.push(effect[i])
          }
        }
      }
    }
    // do passive
    for (var key in target.passiveskills) {
      var effect = this.dopassiveskills(target.passiveskills[key], target, cast)
      for (var i = 0; i < effect.length; i++) {
        dinfo.push(effect[i])
      }
    }
    // do buff
    for (var key in target.buffs) {
      var effect = br.br[key].doeffectonroundend(target, cast)
      for (var i = 0; i < effect.length; i++) {
        dinfo.push(effect[i])
      }
      if (target.buffs[key].round != -99) {
        var buff = skilldata.buffs[key]
        target.buffs[key].round--
        if (target.buffs[key].round <= 0) {
          delete target.buffs[key]
          dinfo.push("[" + buff.name + "]" + "从" + target.name + "身上消失")
          var effect = br.br[key].doeffectafterdelete(target)
          for (var i = 0; i < effect.length; i++) {
            dinfo.push(effect[i])
          }
        }
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
    if (playerA.hpnow <= 0 && playerB.hpnow <= 0) { }
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
    var skill = skilldata.skills[id]
    // check 
    skill = this.checkbuffcontrol(skill, cast, target)
    // source 
    if (this.checkcost(cast, skill) == false) {
      dinfo.push(cast.getsourcename() + "不足以释放[" + skill.name + "]")
      return dinfo
    }
    // skill replace
    skill = this.checkreplace(skill, cast, target)
    // hit or not
    var type = -1
    var tmppassvalue = {
      'type': -1,
      'damage': 0,
    }
    if (this.checkhit(skill, cast, target) == false) {
      //dinfo.push(target.name + "轻轻侧身，躲过了" + cast.name + "的[" + skill.name + "]")
      dinfo.push(cast.name + "手上略感吃力," + "[" + skill.name + "]并未击中" + target.name)
    } else {
      var bdes = this.bigskilldes(skill, cast, target)
      for (var i = 0; i < bdes.length; i++) {
        dinfo.push(bdes[i])
      }
      if (skill.type == 'damage') {
        var re = this.calculatedamage(skill, cast, target, type)
        type = re[0]
        var damage = re[1]
        tmppassvalue['type'] = type
        tmppassvalue['damage'] = damage
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
    // do first use buff
    var effect = this.dofirstusebuff(skill, cast, target, tmppassvalue)
    for (var i = 0; i < effect.length; i++) {
      dinfo.push(effect[i])
    }
    // do buff && passive effect after damage
    var effect = this.dobuffandpassiveeffectafterdamage(skill, cast, target, tmppassvalue)
    for (var i = 0; i < effect.length; i++) {
      dinfo.push(effect[i])
    }
    var effect = this.dobuffandpassiveeffectafterbedamage(skill, target, cast, tmppassvalue)
    for (var i = 0; i < effect.length; i++) {
      dinfo.push(effect[i])
    }
    // effect
    var effect = this.doeffectafterdamage(skill, cast, target, tmppassvalue)
    for (var i = 0; i < effect.length; i++) {
      dinfo.push(effect[i])
    }
    return dinfo
  }

  // do not damage or heal skill
  dootherskill(skill, cast, target) {
    var dinfo = []
    var effect = rs.sr[skill.id].dootherskill(skill, cast, target)
    for (var i = 0; i < effect.length; i++) {
      dinfo.push(effect[i])
    }
    return dinfo
  }

  // do first use buff
  dofirstusebuff(skill, cast, target, tmppassvalue) {
    var dinfo = []
    var effect = rs.sr[skill.id].dofirstusebuff(skill, cast, target, tmppassvalue)
    for (var i = 0; i < effect.length; i++) {
      dinfo.push(effect[i])
    }
    return dinfo
  }

  // do buff or passive effect before be damage
  dobuffandpassiveeffectbeforebedamage(skill, cast, target, tmppassvalue) {
    // buff
    for (var key in cast.buffs) {
      tmppassvalue = br.br[key].dobuffeffectbeforebedamage(skill, cast, target, tmppassvalue)
    }
    for (var i = 0; i < cast.passiveskills.length; i++) {
      tmppassvalue = rs.sr[cast.passiveskills[i].id].dopassiveskilleffectbeforebedamage(skill, cast, target, tmppassvalue)
    }
    return tmppassvalue
  }

  // do buff or passive effect after damage
  dobuffandpassiveeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    // buff
    for (var key in cast.buffs) {
      var effect = br.br[key].dobuffeffectafterdamage(skill, cast, target, tmppassvalue)
      for (var i = 0; i < effect.length; i++) {
        dinfo.push(effect[i])
      }
    }
    // skill
    for (var key in cast.passiveskills) {
      var effect = rs.sr[cast.passiveskills[key].id].dopassiveskilleffectafterdamage(skill, cast, target, tmppassvalue)
      for (var i = 0; i < effect.length; i++) {
        dinfo.push(effect[i])
      }
    }
    return dinfo
  }

  // do buff or passive effect after be damage
  dobuffandpassiveeffectafterbedamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    // buff
    for (var key in cast.buffs) {
      var effect = br.br[key].dobuffeffectafterbedamage(skill, cast, target, tmppassvalue)
      for (var i = 0; i < effect.length; i++) {
        dinfo.push(effect[i])
      }
    }
    return dinfo
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    var effect = rs.sr[skill.id].doeffectafterdamage(skill, cast, target, tmppassvalue)
    for (var i = 0; i < effect.length; i++) {
      dinfo.push(effect[i])
    }
    return dinfo
  }

  // do passive
  dopassiveskills(skill, cast, target) {
    var dinfo = []
    var effect = rs.sr[skill.id].dopassiveskills(skill, cast, target)
    for (var i = 0; i < effect.length; i++) {
      dinfo.push(effect[i])
    }
    return dinfo
  }

  // check skill replace
  checkreplace(skill, cast, target) {
    return rs.sr[skill.id].checkreplace(skill, cast, target)
  }

  // check buff control
  checkbuffcontrol(skill, cast, target) {
    var tmpskill = skill
    for (var key in cast.buffs) {
      tmpskill = br.br[key].dobuffcontrol(skill, cast, target)
    }
    return tmpskill
  }

  dodeadeffect(skill, cast, target) {
    var dinfo = []
    var effect = rs.sr[skill.id].dodeadeffect(skill, cast, target)
    for (var i = 0; i < effect.length; i++) {
      dinfo.push(effect[i])
    }
    return dinfo
  }

  // big skill extra describe
  bigskilldes(skill, cast, target) {
    var dinfo = []
    var effect = rs.sr[skill.id].bigskilldes(skill, cast, target)
    for (var i = 0; i < effect.length; i++) {
      dinfo.push(effect[i])
    }
    return dinfo
  }

}