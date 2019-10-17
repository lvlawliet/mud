import skill_template from './skill_template'

export default class skill_105 extends skill_template {
  constructor() {
    super()
  }

  // do passive
  dopassiveskills(skill, cast, target) {
    var dinfo = []
    var tmps = cast.sourceadd(20)
    dinfo.push(cast.name + "通过[" + skill.name + "]恢复了" + tmps + "点剑意")
    return dinfo
  }
}