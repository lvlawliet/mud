import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_207 extends skill_template {
  constructor() {
    super()
  }

  // do passive skill effect after add buff
  dopassiveskilleffectafteraddbuff(id, imp) {
    if (id >= 18 && id <= 22) {
      var number = 1
      var rand = Math.floor(Math.random() * 100)
      if (rand < 60) {
        number = 1
      } else
      if (rand < 90) {
        number = 2
      } else {
        number = 3
      }
      return number
    }
    return 0
  }
  
}