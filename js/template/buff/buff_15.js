import buff_template from './buff_template'
import SkillBus from './../skillbus'
import Template from './../template'

let skilldata = new SkillBus()
let tempman = new Template()

export default class buff_15 extends buff_template {
  constructor() {
    super()
  }

  // do buff effect on round end
  doeffectonroundend(cast, target) {
    var dinfo = []
    var damage = Math.floor(50 + ((Math.random() * 0.4) + 0.8) * target.getphyattack() - cast.getphydefence())
    // wuxing
    var percent = 1
    for (var i = 0; i < cast.wuxing.length; i++) {
      percent = percent * tempman.wuxingrestrain[skilldata.buffs[15].wuxing][cast.wuxing[i]]
    }
    damage = Math.floor(damage * percent)
    if (damage <= 0) {
      damage = 1
    }
    cast.hpadd(-damage)
    target.hpadd(damage)
    dinfo.push(target.name + "的[" + skilldata.buffs[15].name + "]对" + cast.name + "偷取了" + damage + "生命值")
    return dinfo
  }

}