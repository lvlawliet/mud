import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_9999 extends skill_template {
  constructor() {
    super()
  }

  // do not damage or heal skill
  dootherskill(skill, cast, target) {
    var dinfo = []
    dinfo.push(cast.name + "只是呆呆的看着你，似乎毫无出手之意")
    return dinfo
  }
}