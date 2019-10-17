import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_4 extends skill_template {
  constructor() {
    super()
  }

  // do first use buff
  dofirstusebuff(skill, cast, target, tmppassvalue) {
    var dinfo = []
    var buff = skilldata.buffs[6]
    var tmp = cast.getbuffnumber(6)
    var tmps = cast.sourceadd(tmp * 4)
    cast.removebuff(6, 99)
    dinfo.push(cast.name + "通过[" + skill.name + "]消耗了全部[" + buff.name + "]，并回复了" + tmps + "狂刀值")
    return dinfo
  }
}