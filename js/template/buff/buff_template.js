export default class buff_template {
  constructor() {
  }

  // do buff control
  dobuffcontrol(skill, cast, target) {
    return skill
  }
  
  // do buff or passive effect before be damage
  dobuffeffectbeforebedamage(skill, cast, target, tmppassvalue) {
    return tmppassvalue
  }
  // do buff effect after damage
  dobuffeffectafterdamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    return dinfo
  }
  
  // do buff effect after be damage
  dobuffeffectafterbedamage(skill, cast, target, tmppassvalue) {
    var dinfo = []
    return dinfo
  }

  // do buff effect on round end
  doeffectonroundend(cast, target) {
    var dinfo = []
    return dinfo
  }

  // do buff effect after delete
  doeffectafterdelete(cast) {
    var dinfo = []
    return dinfo
  }

  // do buff effect on add
  attach(imp, number) {}

  // do buff effect on remove
  detach(imp, number) {}
}