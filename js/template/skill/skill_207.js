import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_207 extends skill_template {
  constructor() {
    super()
  }

  doskilleffectbeforebedamage(skill, cast, target, tmppassvalue) {
    if (target.buffs.hasOwnProperty(15) == true) {
      var realdamage = Math.floor(tmppassvalue.damage * 2)
      tmppassvalue.damage = realdamage
    }
    return tmppassvalue
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    if (target.buffs.hasOwnProperty(15) == true) {
      var tmps = cast.magicadd(20)
      dinfo.push(cast.name + "的[" + skill.name + "]产生了" + tmps + "点内力")
      var tmps = cast.sourceadd(1)
      dinfo.push(cast.name + "的[" + skill.name + "]产生了" + tmps + "点隐")
    }
    return dinfo
  }
}