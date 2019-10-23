import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_204 extends skill_template {
  constructor() {
    super()
  }

  dopassiveskilleffectbeforebedamage(skill, cast, target, tmppassvalue) {
    if (skill.job == 3) {
      console.log(tmppassvalue.damage)
      var realdamage = Math.floor(tmppassvalue.damage * (1 + 0.1 * skill.sourcecost))
      tmppassvalue.damage = realdamage
    }
    return tmppassvalue
  }
}