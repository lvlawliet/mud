import template from './template'

let tempman = new template()

export default class actorimp {
  constructor(type, e) {
    if (type == 0) { // player
      this.name = e.name
      this.job = e.job
      this.tizhi = e.property['tizhi']
      this.shenfa = e.property['shenfa']
      this.bili = e.property['bili']
      this.dingli = e.property['dingli']
      this.gengu = e.property['gengu']
      this.hpbase = 2000
      this.activeskills = e.activeskills
      this.passiveskills = e.passiveskills
    } else if (type == 1) { // npc
      this.name = e.name
      this.job = e.job
      this.tizhi = e.tizhi
      this.shenfa = e.shenfa
      this.bili = e.bili
      this.dingli = e.dingli
      this.gengu = e.gengu
      this.hpbase = e.hpbase
      this.activeskills = e.activeskills
      this.passiveskills = e.passiveskills
    }
    this.hpnow = this.gethpmax()
    this.sourcenow = this.getsourceinit();
    this.buffs = {}
  }

  getextratizhi() {
    var tmp = 0
    for (var key in this.buffs) {
      if (key == 1) {
        tmp += 10
      }
    }
    return tmp
  }

  getextrashenfa() {
    var tmp = 0
    for (var key in this.buffs) {
      if (key == 2) {
        tmp += 10
      }
    }
    return tmp
  }

  getextrabili() {
    var tmp = 0
    for (var key in this.buffs) {
      if (key == 3) {
        tmp += 10
      }
    }
    return tmp
  }
  getextradingli() {
    var tmp = 0
    for (var key in this.buffs) {
      if (key == 4) {
        tmp += 10
      }
    }
    return tmp
  }

  getextragengu() {
    var tmp = 0
    for (var key in this.buffs) {
      if (key == 5) {
        tmp += 10
      }
    }
    return tmp
  }

  gettizhi() {
    return this.tizhi + this.getextratizhi()
  }

  getshenfa() {
    return this.shenfa + this.getextrashenfa()
  }

  getbili() {
    return this.bili + this.getextrabili()
  }

  getdingli() {
    return this.dingli + this.getextradingli()
  }

  getgenggu() {
    return this.genggu + this.getextragenggu()
  }

  gethpmax() {
    return this.hpbase + 20 * this.gettizhi()
  }

  getphyattack() {
    return 2 * this.getbili()
  }

  getcrit() {
    return 5 + this.getdingli() / 5
  }

  getphydefence() {
    return 1.5 * this.getdingli()
  }

  getsourceinit() {
    if (this.job == 0) {
      return tempman.job[this.job].sourceinit
    }
    else
    if (this.job == 1) {
      return tempman.job[this.job].sourceinit
    }
  }

  getsourcemax() {
    if (this.job == 0) {
      return tempman.job[this.job].sourcemax
    }
    else
    if (this.job == 1) {
      return tempman.job[this.job].sourcemax
    }
  }

  getsourcename() {
    return tempman.job[this.job].sourcename
  }

  sourceadd(e) {
    var max = this.getsourcemax()
    var realadd = e
    if (this.sourcenow + e > max) {
      realadd = max - this.sourcenow
      this.sourcenow = max
    } else {
      this.sourcenow += e
    }
    return realadd
  }

}