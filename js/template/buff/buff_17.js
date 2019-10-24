import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_17 extends buff_template {
  constructor() {
    super()
  }

  // do buff effect after damage
  dobuffeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    var tmpm = cast.magicadd(skill.cost)
    var tmps = cast.sourceadd(skill.sourcecost)
    dinfo.push(cast.name + "通过[" + skilldata.buffs[17].name + "]回复了" + tmps + "点隐和" + tmpm + '点内力')
    cast.removebuff(17, 99)
    dinfo.push("[" + skilldata.buffs[17].name + "]" + "从" + cast.name + "身上消失")
    return dinfo
  }

}