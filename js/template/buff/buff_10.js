import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_10 extends buff_template {
  constructor() {
    super()
  }

  // do buff or passive effect before be damage
  dobuffeffectbeforebedamage(skill, cast, target, tmppassvalue) {
    var source = cast.sourcenow
    var percent = 25 + source * 5
    if (percent > 99) {
      percent = 99
    }
    var realdamage = tmppassvalue.damage * (100 - percent) / 100
    tmppassvalue.damage = Math.floor(realdamage)
    return tmppassvalue
  }

  // do buff effect after delete
  doeffectafterdelete(cast) {
    var dinfo = []
    var rand = Math.floor(Math.random() * 100)
    var addn = 2
    if (rand < 10) {
      addn = 2
    } else
    if (rand < 75) {
      addn = 3
    } else
    if (rand < 95) {
      addn = 4
    } else {
      addn = 5
    }
    addn += 1
    var tmps = cast.sourceadd(addn)
    dinfo.push(cast.name + "因为[" + skilldata.buffs[10].name + "]消失，获得了" + tmps + "小玄武")
    return dinfo
  }
}