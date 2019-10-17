import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_104 extends skill_template {
  constructor() {
    super()
  }

  // check skill replace
  checkreplace(skill, cast, target) {
    var flag = true
    for (var i = 1; i <= 5; i++) {
      if (cast.buffs.hasOwnProperty(i) == false) {
        flag = false
        break;
      }
    }
    if (flag == true) {
      return skilldata.skills[106]
    } else {
      return skill
    }
    return skill
  }
}