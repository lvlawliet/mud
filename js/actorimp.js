import Template from './template/template'
import SkillBus from './template/skillbus'
import AiRegister from './template/airegister'

let tempman = new Template()
let skilldata = new SkillBus()
let airegister = new AiRegister()

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
      this.activeskills = []
      this.passiveskills = []
      for (var i = 0; i < e.activeskills.length; i++) {
        this.activeskills.push(skilldata.skills[e.activeskills[i]])
      }
      for (var i = 0; i < e.passiveskills.length; i++) {
        this.passiveskills.push(skilldata.skills[e.passiveskills[i]])
      }
      this.ai = airegister.ar[e.ai]
    }
    this.hpnow = this.gethpmax()
    this.sourcenow = this.getsourceinit();
    this.buffs = {}
  }

  getextratizhi() {
    var tmp = 0
    for (var key in this.buffs) {
    }
    return tmp
  }

  getextrashenfa() {
    var tmp = 0
    for (var key in this.buffs) {
      if (key == 2) {
        tmp += 15
      }
    }
    return tmp
  }

  getextrabili() {
    var tmp = 0
    for (var key in this.buffs) {
      if (key == 3) {
        tmp += 15
      } else
      if (key == 6) {
        tmp += this.buffs[key].number
      }
    }
    return tmp
  }
  getextradingli() {
    var tmp = 0
    for (var key in this.buffs) {
      if (key == 4) {
        tmp += 15
      }
    }
    return tmp
  }

  getextragengu() {
    var tmp = 0
    for (var key in this.buffs) {
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

  getgengu() {
    return this.gengu + this.getextragengu()
  }

  gethpmax() {
    return this.hpbase + 20 * this.gettizhi()
  }

  getphyattack() {
    return 2 * this.getbili()
  }

  getextrahit() {
    var tmp = 0
    for (var key in this.buffs) {
      if (key == 5) {
        tmp += 5
      }
      if (key == 6 && this.getbuffnumber(key) >= 8) {
        tmp += 5
      }
    }
    return tmp
  }

  getextracrit() {
    var tmp = 0
    for (var key in this.buffs) {
      if (key == 1) {
        tmp += 10
      } else
      if (key == 6 && this.getbuffnumber(key) >= 15) {
        tmp += 10
      }
    }
    return tmp
  }

  getcrit() {
    return 5 + this.getextracrit() + this.getdingli() / 5
  }

  getphydefence() {
    return 1.5 * this.getdingli()
  }

  getsourceinit() {
    return tempman.job[this.job].sourceinit
  }

  getsourcemax() {
    return tempman.job[this.job].sourcemax
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

  hpadd(e) {
    var max = this.gethpmax()
    var realadd = e
    if (e > 0) {
      if (this.hpnow + e > max) {
        realadd = max - this.hpnow
        this.hpnow = max
      } else {
        this.hpnow += e
      }
    } else {
      this.hpnow += e
    }
    return realadd
  }

  addbuff(buffid, number) {
    var buff = skilldata.buffs[buffid]
    if (this.buffs.hasOwnProperty(buff.id) == false) {
      this.buffs[buff.id] = {
        buff: buff,
        number: number,
        round: buff.round
      }
    } else {
      this.buffs[buff.id].number += number
      if (this.buffs[buff.id].number > buff.max) {
        this.buffs[buff.id].number = buff.max
        this.buffs[buff.id].round = buff.round
      }
    }
  }

  removebuff(id, number) {
    if (this.buffs.hasOwnProperty(id)) {
      this.buffs[id].number -= number
      if (this.buffs[id].number <= 0) {
        delete this.buffs[id]
      }
    }
  }

  getbuffnumber(id) {
    if (this.buffs.hasOwnProperty(id)) {
      return this.buffs[id].number
    }
    return 0
  }

}