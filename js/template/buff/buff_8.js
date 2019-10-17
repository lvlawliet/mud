import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_8 extends buff_template {
  constructor() {
    super()
  }

  // do buff effect after be damage
  dobuffeffectafterbedamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    if (tmppassvalue.type != -1) {
      var percent = cast.sourcenow
      var damage = Math.floor(tmppassvalue.damage * (5 + percent) / 10)
      target.hpadd(-damage)
      dinfo.push(target.name + "被" + cast.name + "的[" + skilldata.buffs[8].name + "]反弹了" + damage + "点伤害");
    }
    return dinfo
  }
}