import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_9 extends buff_template {
  constructor() {
    super()
  }

  // do buff effect after be damage
  dobuffeffectafterbedamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    if (tmppassvalue.type != -1) {
      var percent = cast.sourcenow
      var rand = Math.random() * 2
      var heal = Math.floor((50 + rand * cast.getgengu()) * (1 + percent / 10))
      var tmps = cast.hpadd(heal)
      dinfo.push(target.name + "随被伤及，但受到[" + skilldata.buffs[9].name + "]祝福，回复了" + tmps + "点血量");
    }
    return dinfo
  }
}