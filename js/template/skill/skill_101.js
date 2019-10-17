import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_101 extends skill_template {
  constructor() {
    super()
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    var rand = Math.floor(Math.random() * 5) + 1
    var buff = skilldata.buffs[rand]
    cast.addbuff(buff.id, 1)
    dinfo.push(cast.name + "的[" + skill.name + "]对自身产生了[" + buff.name + "]")
    return dinfo
  }
}