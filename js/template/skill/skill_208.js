import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_208 extends skill_template {
  constructor() {
    super()
  }

  doskilleffectbeforebedamage(skill, cast, target, tmppassvalue) {
    if (target.buffs.hasOwnProperty(15) == true) {
      var realdamage = Math.floor(tmppassvalue.damage * 3)
      tmppassvalue.damage = realdamage
    }
    return tmppassvalue
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    if (target.buffs.hasOwnProperty(15) == true) {
      var buff = skilldata.buffs[16]
      target.addbuff(buff.id, 1)
      dinfo.push(cast.name + "的[" + skill.name + "]对" + target.name + "产生了[" + buff.name + "]")
    }
    return dinfo
  }
}