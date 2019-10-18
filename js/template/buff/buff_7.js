import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_7 extends buff_template {
  constructor() {
    super()
  }

  // do buff or passive effect before be damage
  dobuffeffectbeforebedamage(skill, cast, target, tmppassvalue) {
    var realdamage = tmppassvalue.damage * 2
    tmppassvalue.damage = Math.floor(realdamage)
    return tmppassvalue
  }
}