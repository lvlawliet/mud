import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_1002 extends skill_template {
  constructor() {
    super()
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    if (tmppassvalue.type != -1) {
      var tmps = 0
      if (tmppassvalue.type == 0) {
        tmps = cast.sourceadd(1)
      } else {
        tmps = cast.sourceadd(2)
      }
      dinfo.push(cast.name + "的[" + skill.name + "]造成伤害产生了" + tmps + "只小乌龟")
    }
    return dinfo
  }
}