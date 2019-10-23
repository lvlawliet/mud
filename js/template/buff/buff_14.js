import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_14 extends buff_template {
  constructor() {
    super()
  }

  // do buff or passive effect before be damage
  dobuffeffectbeforebedamage(skill, cast, target, tmppassvalue) {
    var realdamage = tmppassvalue.damage * 0.2
    tmppassvalue.damage = Math.floor(realdamage)
    var percent = 1 - (cast.hpnow / cast.gethpmax())
    cast.sourceadd(Math.ceil(5 * percent) + 2)
    cast.removebuff(14, 99)
    return tmppassvalue
  }
}