import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_103 extends skill_template {
  constructor() {
    super()
  }

  // do not damage or heal skill
  dootherskill(skill, cast, target) {
    var dinfo = []
    while (cast.sourcenow >= 20) {
      cast.sourcenow -= 20
      var rand = Math.floor(Math.random() * 5) + 1
      var buff = skilldata.buffs[rand]
      cast.addbuff(buff.id, 1)
      dinfo.push(cast.name + "通过[" + skill.name + "]消耗了20点剑意并领悟了[" + buff.name + "]")
    }
    return dinfo
  }
}