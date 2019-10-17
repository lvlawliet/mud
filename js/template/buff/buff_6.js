import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_6 extends buff_template {
  constructor() {
    super()
  }

  // do buff effect after damage
  dobuffeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    if (tmppassvalue.type != -1) {
      var num = cast.buffs[6].number
      var tmps = cast.sourceadd(num)
      dinfo.push(cast.name + "通过[" + skilldata.buffs[6].name + "]回复了" + tmps + "点狂刀值")
    }
    return dinfo
  }
}