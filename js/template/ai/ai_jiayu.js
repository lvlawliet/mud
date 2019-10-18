import SkillBus from './../skillbus'
import ai_template from './../ai/ai_template'

let skilldata = new SkillBus()

export default class ai_jiayu extends ai_template {
  constructor() {
    super()
  }

  // do buff effect after damage
  work(cast, target) {
    var flag = false;
    if (cast.sourcenow == 20) {
      return skilldata.skills[1004]
    }
    for (var key in cast.buffs) {
      if (key == 8 || key == 9 || key == 10) {
        flag = true
        break
      }
    }
    if (flag) {
      return skilldata.skills[1002]
    } else {
      return skilldata.skills[1003]
    }
  }
}