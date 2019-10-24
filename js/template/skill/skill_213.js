import skill_template from './skill_template'
import SkillBus from './../skillbus'
import BuffRegister from './../buffregister'

let skilldata = new SkillBus()
let br = new BuffRegister()

export default class skill_212 extends skill_template {
  constructor() {
    super()
  }

  // do not damage or heal skill
  dootherskill(skill, cast, target) {
    var dinfo = []
    var number = 0
    for (var t = 18; t <= 22; t++) {
      if (target.buffs.hasOwnProperty(t)) {
        var effect = br.br[t].doeffectonroundend(target, cast)
        for (var i = 0; i < effect.length; i++) {
          dinfo.push(effect[i])
        }
      }
    }
    return dinfo
  }
}