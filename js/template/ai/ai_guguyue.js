import SkillBus from './../skillbus'
import ai_template from './../ai/ai_template'

let skilldata = new SkillBus()

export default class ai_jiayu extends ai_template {
  constructor() {
    super()
  }

  // do buff effect after damage
  work(cast, target) {
    if (target.buffs.hasOwnProperty(15) == false) {
      return skilldata.skills[205]
    }
    if (cast.buffs.hasOwnProperty(17) == true) {
      if (cast.magicnow >= 100 && cast.sourcenow >= 3) {
        return skilldata.skills[208]
      } else {
        return skilldata.skills[206]
      }
    }
    var flag = false
    for (var key in target.buffs) {
      if (skilldata.buffs[key].profit == true) {
        flag = true
        break;
      }
    }
    if (cast.magicnow >= 100 && cast.sourcenow >= 3) {
      return skilldata.skills[208]
    }
    if (flag && cast.magicnow >= 20 && cast.sourcenow >= 1 &&cast.magicnow < 100) {
      return skilldata.skills[206]
    }
    return skilldata.skills[207]
  }
}