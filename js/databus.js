import Pool from './base/pool'
import SkillBus from './skillbus'

let instance
let skilldata = new SkillBus()

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
    this.activeskills = []
    this.passiveskills = []

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
  
  saveskill(e) {
    for (var i = 0; i < e.length; i++) {
      var skill = skilldata.skills[e[i]]
      if (skill.type != 'passive') {
        this.activeskills.push(skill)
      } else {
        this.passiveskills.push(skill)
      }
    }
  }

  savejob(e) {
    this.job = e
  }

}
