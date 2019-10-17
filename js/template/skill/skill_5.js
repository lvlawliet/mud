import skill_template from './skill_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class skill_5 extends skill_template {
  constructor() {
    super()
  }

  // do not damage or heal skill
  dootherskill(skill, cast, target) {
    var dinfo = []
    return dinfo
  }


  // do first use buff
  dofirstusebuff(skill, cast, target, tmppassvalue) {
    var dinfo = []
    return dinfo
  }

  // do buff effect after damage
  dobuffeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    return dinfo
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    return dinfo
  }

  // do passive
  dopassiveskills(skill, cast, target) {
    var dinfo = []
    return dinfo
  }

  // check skill replace
  checkreplace(skill, cast, target) {
    return skill
  }

  // do dead trigger skill or buff
  dodeadeffect(skill, cast, target) {
    var dinfo = []
    return dinfo
  }

  // big skill extra describe
  bigskilldes(skill, cast, target) {
    var dinfo = []
    return dinfo
  }
}