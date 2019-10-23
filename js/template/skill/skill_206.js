import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_206 extends skill_template {
  constructor() {
    super()
  }

  doskilleffectbeforebedamage(skill, cast, target, tmppassvalue) {
    if (target.buffs.hasOwnProperty(15) == true) {
      var realdamage = Math.floor(tmppassvalue.damage * 1.5)
      tmppassvalue.damage = realdamage
    }
    return tmppassvalue
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    if (target.buffs.hasOwnProperty(15) == true) {
      for (var key in target.buffs) {
        if (skilldata.buffs[key].profit == true) {
          var tmpbuff = target.buffs[key]
          target.removebuff(key, 99)
          cast.addbuffimp(tmpbuff)
          dinfo.push(cast.name + '偷取了' + target.name + '的[' + tmpbuff.buff.name + ']效果')
          break
        }
      }
    }
    return dinfo
  }
}