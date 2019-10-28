import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_203 extends skill_template {
  constructor() {
    super()
  }

  doskilleffectbeforebedamage(skill, cast, target, tmppassvalue) {
    var percent = 2 - (target.hpnow / target.gethpmax())
    var realdamage = tmppassvalue.damage * percent
    tmppassvalue.damage = Math.floor(realdamage)
    return tmppassvalue
  }
}