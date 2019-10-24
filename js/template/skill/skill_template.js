export default class skill_template {
  constructor() {
  }

  // do not damage or heal skill
  dootherskill(skill, cast, target) {
    var dinfo = []
    return dinfo
  }

  doskilleffectbeforebedamage(skill, cast, target, tmppassvalue) {
    return tmppassvalue
  }

  dopassiveskilleffectbeforebedamage(skill, cast, target, tmppassvalue) {
    return tmppassvalue
  }

  // do passive skill effect after add buff
  dopassiveskilleffectafteraddbuff(id) {
    return 0
  }
  
  // do first use buff
  dofirstusebuff(skill, cast, target, tmppassvalue) {
    var dinfo = []
    return dinfo
  }

  // do passive effect after damage
  dopassiveskilleffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    return dinfo
  }

  // do skill effect after damage
  doeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    return dinfo
  }

  // do passive
  dopassiveskills(skill, cast, target) {
    var dinfo = []
    return dinfo
  }

  // check skill replace
  checkreplace(skill, cast, target) {
    return skill
  }

  // do dead trigger skill or buff
  dodeadeffect(skill, cast, target) {
    var dinfo = []
    return dinfo
  }

  // big skill extra describe
  bigskilldes(skill, cast, target) {
    var dinfo = []
    return dinfo
  }
}