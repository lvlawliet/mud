import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_201 extends skill_template {
  constructor() {
    super()
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    var tmps = cast.magicadd(100)
    dinfo.push(cast.name + "的[" + skill.name + "]产生了" + tmps + "点内力")
    return dinfo
  }
}