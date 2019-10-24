import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_212 extends skill_template {
  constructor() {
    super()
  }

  // do not damage or heal skill
  dootherskill(skill, cast, target) {
    var dinfo = []
    var number = 0
    for (var i = 18; i <= 22; i++) {
      if (target.buffs.hasOwnProperty(i)) {
        number += target.buffs[i].number
      }
    }
    var tmps = cast.magicadd(number * 10)
    dinfo.push(cast.name + "通过[" + skill.name + "]恢复了" + tmps + "内力")
    return dinfo
  }
}