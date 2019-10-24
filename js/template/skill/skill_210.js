import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_210 extends skill_template {
  constructor() {
    super()
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    var buff = skilldata.buffs[21]
    var number = target.addbuff(buff.id, 1, cast)
    dinfo.push(cast.name + "的[" + skill.name + "]对" + target.name + "产生了[" + buff.name + "](" + number + ")")
    var tmps = cast.sourceadd(1)
    dinfo.push(cast.name + "的[" + skill.name + "]产生了" + tmps + "点隐")
    return dinfo
  }
}