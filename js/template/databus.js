import SkillBus from './skillbus'
import Template from './template'

let instance
let skilldata = new SkillBus()
let tempman = new Template()

/**
 * player info
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this
    this.name = ""
    this.job = -1
    this.property = {
      'tizhi': 0,
      'shenfa': 0,
      'bili': 0,
      'dingli': 0,
      'gengu': 0,
      }
    this.activeskills = [null, null, null, null]
    this.passiveskills = []
    this.method = null
    this.skillbag = []
    this.methodbag = []
    this.wuxing = [0]
    // limit
    this.limit_job = -1
    this.limit_activeskills = [null, null, null, null]
    this.limit_passiveskills = []
    this.limit_method = null
    this.limit_skillbag = []
    this.limit_methodbag = []
    this.limit_wuxing = [0]
    // end
    this.local = 'main'
    this.mapid = -1

    // const string
    this.pro2string = {
      'tizhi': { name: '体质', des:'影响人物血量'},
      'shenfa': { name: '身法', des: '影响人物躲闪和出手命中率' },
      'bili': { name: '臂力', des: '影响人物外功伤害' },
      'dingli': { name: '定力', des: '影响人物防御能力和致命一击能力' },
      'gengu': { name: '根骨', des: '影响人物内功和内力回复速度' },
    }
  }

  getdata(index, param) {
    switch (index) {
      case 'name':
        return this.name
        break
      case 'job':
        return this.job
        break
      case 'limit_job':
        return this.limit_job
        break
      case 'tizhi':
      case 'shenfa':
      case 'bili':
      case 'dingli':
      case 'gengu':
        return this.property[index]
        break
    }
  }

  setdata(index, param) {
    switch (index) {
      case 'name':
        this.name = param
        break
      case 'job':
        this.job = param
        break
      case 'tizhi':
      case 'shenfa':
      case 'bili':
      case 'dingli':
      case 'gengu':
        this.property[index] = param
        break
    }
  }

  initpro() {
    var tmp = []
    var allpoint = 25 + Math.floor(Math.random() * 6)
    var len = 0
    for ( var key in this.property ) {
      var check1 = Math.floor(Math.random() * 14) + 1
      if (check1 <= 3) {
        tmp.push(10 - check1)
        allpoint += check1
      } else {
        var check2 = Math.floor(Math.random() * allpoint) + 1
        tmp.push(10 + check2)
        allpoint -= check2;
      }
      len++
    }
    var index = Math.floor(Math.random() * len)
    tmp[index] += allpoint
    return tmp
  }

  datatostring(e) {
    switch (e) {
      case 'name':
        return this.name
        break
      case 'job':
        return this.job
        break
      case 'tizhi':
      case 'shenfa':
      case 'bili':
      case 'dingli':
      case 'gengu':
        return this.pro2string[e]
        break
    }
  }

  savepro(tmppro) {
    var i = 0
    for (var key in this.property) {
      this.property[key] = tmppro[i]
      i++
    } 
  }
  
  saveskillbag(e) {
    for (var i = 0; i < e.length; i++) {
      if (this.skillbag.indexOf(skilldata.skills[e[i]]) > -1) {

      } else {
        this.skillbag.push(skilldata.skills[e[i]])
      }
    }
  }

  savemethodbag(e) {
    for (var i = 0; i < e.length; i++) {
      if (this.methodbag.indexOf(tempman.methods[e[i]]) > -1) {

      } else {
        this.methodbag.push(tempman.methods[e[i]])
      }
    }
  }

  savejob(e) {
    this.job = e
  }

  saveskill(idx, e) {
    // check
    if (this.job != 0 && e.job != this.job) {
      return false
    }

    for (var i = 0; i < this.activeskills.length; i++) {
      if (this.activeskills[i] != null) {
        if (this.activeskills[i].id == e.id) {
          this.activeskills[i] = null
        }
      }
    }
    this.activeskills[idx] = e
    return true
  }
  
  savemethod(e) {
    this.activeskills = [null, null, null, null]
    this.passiveskills = []
    if (e.id == 0) {
      this.method = null
      this.job = 0
      this.wuxing = [0]
    } else {
      for (var i = 0; i < e.passiveskill.length; i++) {
        this.passiveskills.push(skilldata.skills[e.passiveskill[i]])
      }
      for (var i = 0; i < 4; i++) {
        var tskill = skilldata.skills[e.skills[i]]
        var index = this.skillbag.indexOf(tskill)
        if (index != -1) {
          this.activeskills[i] = tskill
        }
      }
      this.method = e
      this.job = e.job
    }
  }
  
  // limit  
  savelimit_skillbag(e) {
    for (var i = 0; i < e.length; i++) {
      if (this.limit_skillbag.indexOf(skilldata.skills[e[i]]) > -1) {

      } else {
        this.limit_skillbag.push(skilldata.skills[e[i]])
      }
    }
  }

  savelimit_methodbag(e) {
    for (var i = 0; i < e.length; i++) {
      if (this.limit_methodbag.indexOf(tempman.methods[e[i]]) > -1) {

      } else {
        this.limit_methodbag.push(tempman.methods[e[i]])
      }
    }
  }

  savelimit_job(e) {
    this.limit_job = e
  }

  savelimit_skill(idx, e) {
    // check
    if (this.limit_job != 0 && e.job != this.limit_job) {
      return false
    }

    for (var i = 0; i < this.limit_activeskills.length; i++) {
      if (this.limit_activeskills[i] != null) {
        if (this.limit_activeskills[i].id == e.id) {
          this.limit_activeskills[i] = null
        }
      }
    }
    this.limit_activeskills[idx] = e
    return true
  }
  
  savelimit_method(e) {
    this.limit_activeskills = [null, null, null, null]
    this.limit_passiveskills = []
    if (e.id == 0) {
      this.limit_method = null
      this.limit_job = 0
      this.limit_wuxing = [0]
    } else {
      for (var i = 0; i < e.passiveskill.length; i++) {
        this.limit_passiveskills.push(skilldata.skills[e.passiveskill[i]])
      }
      for (var i = 0; i < 4; i++) {
        var tskill = skilldata.skills[e.skills[i]]
        var index = this.limit_skillbag.indexOf(tskill)
        if (index != -1) {
          this.limit_activeskills[i] = tskill
        }
      }
      this.limit_method = e
      this.limit_job = e.job
    }
  }
  // end
}
