import skill_template from './skill_template'

export default class skill_106 extends skill_template {
  constructor() {
    super()
  }
  
  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    dinfo.push(cast.name + "的[" + skill.name + "]消耗掉了全部剑声")
    for (var i = 1; i <= 5; i++) {
      cast.removebuff(i, 1)
    }
    return dinfo
  }

  // big skill extra describe
  bigskilldes(skill, cast, target) {
    var dinfo = []
    if (skill.id == 106) {
      dinfo.push(skill.des)
    }
    return dinfo
  }
}