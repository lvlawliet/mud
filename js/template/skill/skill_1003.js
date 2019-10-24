import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_1003 extends skill_template {
  constructor() {
    super()
  }

  // do not damage or heal skill
  dootherskill(skill, cast, target) {
    var dinfo = []
    //var rand = Math.floor(Math.random() * 3) + 8
    var buffid = 10
    var percent = Math.floor(cast.hpnow / cast.gethpmax() * 100)
    var rand = Math.floor(Math.random() * 100)
    if (rand > percent) {
      buffid = 10
    } else {
      var rand1 = Math.floor(Math.random() * 100)
      if (percent > rand1) {
        buffid = 8
      } else {
        buffid = 9
      }
    }
    var buff = skilldata.buffs[buffid]
    cast.addbuff(buff.id, 1)
    dinfo.push(cast.name + "通过[" + skill.name + "]获得玄武[" + buff.name + "]的祝福")
    cast.sourceadd(1)
    dinfo.push(cast.name + "通过[" + skill.name + "]获得了一只玄武")
    return dinfo
  }
}