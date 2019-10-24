import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_209 extends skill_template {
  constructor() {
    super()
  }

  dopassiveskilleffectbeforebedamage(skill, cast, target, tmppassvalue) {
    if (target.buffs.hasOwnProperty(15) == true) {
      var realdamage = Math.floor(tmppassvalue.damage * 1.2)
      tmppassvalue.damage = realdamage
    }
    return tmppassvalue
  }

  dopassiveskilleffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    if (target.buffs.hasOwnProperty(15) == true && tmppassvalue.type != -1) {
      var rand = Math.floor(Math.random() * 100)
      if (rand < 25) {
        var buff = skilldata.buffs[17]
        cast.addbuff(buff.id, 1)
        dinfo.push(cast.name + "的[" + skill.name + "]对自身产生了[" + buff.name + "]")
      }
    }
    return dinfo
  }
}