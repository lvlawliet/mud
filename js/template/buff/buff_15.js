import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_15 extends buff_template {
  constructor() {
    super()
  }

  // do buff effect on round end
  doeffectonroundend(cast, target) {
    var dinfo = []
    var damage = Math.floor(7000 + ((Math.random() * 0.4) + 0.8) * target.getphyattack() - cast.getphydefence())
    if (damage <= 0) {
      damage = 1
    }
    cast.hpadd(-damage)
    dinfo.push(target.name + "的[" + skilldata.buffs[15].name + "]对" + cast.name + "造成了" + damage + "伤害")
    return dinfo
  }

}