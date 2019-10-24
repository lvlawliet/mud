import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_16 extends buff_template {
  constructor() {
    super()
  }

  // do buff control
  dobuffcontrol(skill, cast, target) {
    return skilldata.skills[9999]
  }

}