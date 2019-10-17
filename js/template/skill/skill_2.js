import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_2 extends skill_template {
  constructor() {
    super()
  }
  
  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    var rand = Math.floor(Math.random() * 100)
    if (rand < 25) {
      var rand2 = Math.floor(Math.random() * 100)
      if (rand2 < 50) {
        var buff = skilldata.buffs[6]
        cast.addbuff(buff.id, 3)
        dinfo.push(cast.name + "的[" + skill.name + "]对自身产生了三层[" + buff.name + "]")
      } else {
        var tmps = cast.sourceadd(skill.cost)
        dinfo.push(cast.name + "的[" + skill.name + "]返还了所有消耗的狂刀值")
      }
    }
    return dinfo
  }
}