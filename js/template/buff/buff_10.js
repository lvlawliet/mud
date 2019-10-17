import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_10 extends buff_template {
  constructor() {
    super()
  }

  // do buff or passive effect before be damage
  dobuffeffectbeforebedamage(skill, cast, target, tmppassvalue) {
    console.log("fuckkkk")
    var source = cast.sourcenow
    var percent = 25 + source * 5
    var realdamage = tmppassvalue.damage * (100 - percent) / 100
    tmppassvalue.damage = Math.floor(realdamage)
    return tmppassvalue
  }
}