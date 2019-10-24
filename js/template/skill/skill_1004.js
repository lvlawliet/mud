import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_1004 extends skill_template {
  constructor() {
    super()
  }

  doskilleffectbeforebedamage(skill, cast, target, tmppassvalue) {
    console.log(tmppassvalue.damage)
    var realdamage = tmppassvalue.damage + Math.floor(Math.random() * 1000)
    tmppassvalue.damage = realdamage
    return tmppassvalue
  }

  // big skill extra describe
  bigskilldes(skill, cast, target) {
    var dinfo = []
    dinfo.push(skill.des)
    return dinfo
  }
}