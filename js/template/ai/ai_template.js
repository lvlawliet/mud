import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class ai_template {
  constructor() {
  }

  // do buff effect after damage
  work(cast, target) {
    return skilldata.skills[9999]
  }
}