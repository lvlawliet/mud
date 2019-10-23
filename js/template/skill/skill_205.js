import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_205 extends skill_template {
  constructor() {
    super()
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    var buff = skilldata.buffs[15]
    target.addbuff(buff.id, 1)
    dinfo.push(cast.name + "的[" + skill.name + "]对" + target.name + "产生了[" + buff.name + "]")
    var tmps = cast.sourceadd(2)
    dinfo.push(cast.name + "的[" + skill.name + "]产生了" + tmps + "点隐")
    return dinfo
  }
}