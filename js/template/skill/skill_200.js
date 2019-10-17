import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_200 extends skill_template {
  constructor() {
    super()
  }

  // do passive
  dopassiveskills(skill, cast, target) {
    var dinfo = []
    var tmps = cast.sourceadd(40)
    dinfo.push(cast.name + "恢复了" + tmps + "点影")
    return dinfo
  }
}