import skill_template from './skill_template'

export default class skill_1000 extends skill_template {
  constructor() {
    super()
  }

  // do passive
  dopassiveskills(skill, cast, target) {
    var dinfo = []
    var tmps = cast.hpadd(1 * cast.getgengu())
    dinfo.push(cast.name + "受到玄武真道教宗的[" + skill.name + "]祝福，恢复了" + tmps + "点生命")
    return dinfo
  }
}