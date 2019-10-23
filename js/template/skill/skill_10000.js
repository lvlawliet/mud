import skill_template from './skill_template'

export default class skill_10000 extends skill_template {
  constructor() {
    super()
  }

  // do passive
  dopassiveskills(skill, cast, target) {
    var dinfo = []
    var tmps = cast.magicadd(1)
    dinfo.push(cast.name + "恢复了" + tmps + "点内力")
    return dinfo
  }
}