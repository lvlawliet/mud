import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_3 extends skill_template {
  constructor() {
    super()
  }

  // do not damage or heal skill
  dootherskill(skill, cast, target) {
    var dinfo = []
    var buff = skilldata.buffs[7]
    cast.addbuff(buff.id, 1)
    dinfo.push(cast.name + "通过[" + skill.name + "]获得了[" + buff.name + "]的状态")
    return dinfo
  }
}