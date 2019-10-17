import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_102 extends skill_template {
  constructor() {
    super()
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    var rand = Math.floor(Math.random() * 100)
    if (rand < 20) {
      for (var i = 1; i <= 5; i++) {
        if (cast.buffs.hasOwnProperty(i) == false) {
          var buff = skilldata.buffs[i]
          cast.addbuff(buff.id, 1)
          dinfo.push(cast.name + "通过[" + skill.name + "]领悟了[" + buff.name + "]")
          break;
        }
      }
    }
    return dinfo
  }
}