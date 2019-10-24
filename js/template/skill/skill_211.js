import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_211 extends skill_template {
  constructor() {
    super()
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    if (target.buffs.hasOwnProperty(21) == true) {
      var number = target.buffs[21].number
      var rand = Math.floor(Math.random() * 4) + 18
      if (rand == 21) {
        rand = 22
      }
      var buff = skilldata.buffs[rand]
      var anum = target.addbuff(buff.id, number, cast)
      dinfo.push(cast.name + "的[" + skill.name + "]将" + target.name + "所有[流血·火]("+ number + ")转化为[" + buff.name + "](" + anum + ")")
      target.removebuff(21, 99)
    }
    var tmps = cast.sourceadd(1)
    dinfo.push(cast.name + "的[" + skill.name + "]产生了" + tmps + "点隐")
    return dinfo
  }
}