import Template from './template/template'
import SkillBus from './template/skillbus'
import AiRegister from './template/airegister'
import BuffRegister from './template/buffregister'

let tempman = new Template()
let skilldata = new SkillBus()
let airegister = new AiRegister()
let br = new BuffRegister()

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
      this.activeskills = []
      this.wuxing = [0]
      for (var i = 0; i < e.activeskills.length; i++) {
        if (e.activeskills[i] != null) {
          this.activeskills.push(e.activeskills[i])
        }
      }
      if (this.activeskills.length == 0) {
        this.activeskills.push(skilldata.skills[0])
      }
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
      this.wuxing = e.wuxing
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
    this.extra = {
      'tizhi': 0,
      'shenfa': 0,
      'bili': 0,
      'dingli': 0,
      'gengu': 0,
      'hit': 0,
      'crit': 0,
    }
    this.hpnow = this.gethpmax()
    this.sourcenow = this.getsourceinit();
    this.buffs = {}
    this.magicnow = 200
    this.magicmax = 200
  }

  getextratizhi() {
    return this.extra['tizhi']
  }

  getextrashenfa() {
    return this.extra['shenfa']
  }

  getextrabili() {
    return this.extra['bili']
  }

  getextradingli() {
    return this.extra['dingli']
  }

  getextragengu() {
    return this.extra['gengu']
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
    return this.extra['hit']
  }

  getextracrit() {
    return this.extra['crit']
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

  magicadd(e) {
    var max = this.magicmax;
    var realadd = e
    if (this.magicnow + e > max) {
      realadd = max - this.magicnow
      this.magicnow = max
    } else {
      this.magicnow += e
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
    var tmpnumber = number
    if (this.buffs.hasOwnProperty(buff.id) == true) {
      tmpnumber = this.buffs[buff.id].number + number
      if (tmpnumber > buff.max) {
        tmpnumber = buff.max
      }
      br.br[buff.id].detach(this, this.buffs[buff.id].number)
      delete this.buffs[buff.id]
    }
    this.buffs[buff.id] = {
      buff: buff,
      number: tmpnumber,
      round: buff.round
    }
    br.br[buff.id].attach(this, tmpnumber)
    /*
    if (this.buffs.hasOwnProperty(buff.id) == false) {
      this.buffs[buff.id] = {
        buff: buff,
        number: number,
        round: buff.round
      }
      br.br[buff.id].attach(this, number)
    } else {
      var tmpnumber = this.buffs[buff.id].number + number
      if (tmpnumber > buff.max) {
        this.buffs[buff.id].number = buff.max
        this.buffs[buff.id].round = buff.round
      }
    }
    */
  }

  removebuff(id, number) {
    if (this.buffs.hasOwnProperty(id)) {
      var tmpnumber = this.buffs[id].number - number
      br.br[id].detach(this, this.buffs[id].number)
      delete this.buffs[id]
      if (tmpnumber > 0) {
        this.addbuff(id, tmpnumber)
      } 
    }
    /*
    if (this.buffs.hasOwnProperty(id)) {
      this.buffs[id].number -= number
      if (this.buffs[id].number <= 0) {
        delete this.buffs[id]
      }
    }
    */
  }

  getbuffnumber(id) {
    if (this.buffs.hasOwnProperty(id)) {
      return this.buffs[id].number
    }
    return 0
  }

}