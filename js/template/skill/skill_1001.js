import skill_template from './skill_template'

export default class skill_1001 extends skill_template {
  constructor() {
    super()
  }
  
  // do dead trigger skill or buff
  dodeadeffect(skill, cast, target) {
    var dinfo = []
    if (cast.hpnow > -600) {
      cast.hpnow = cast.gethpmax()
      dinfo.push(cast.name + "受到的伤害并未至死，并且受到玄武真神[" + skill.name + "]神力的庇护，伤势痊愈。玄武真道，齐天寿甲！")
    }
    return dinfo
  }

}