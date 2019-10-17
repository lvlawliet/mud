import skill_1 from './skill/skill_1'
import skill_2 from './skill/skill_2'
import skill_3 from './skill/skill_3'
import skill_4 from './skill/skill_4'
import skill_5 from './skill/skill_5'
import skill_101 from './skill/skill_101'
import skill_102 from './skill/skill_102'
import skill_103 from './skill/skill_103'
import skill_104 from './skill/skill_104'
import skill_105 from './skill/skill_105'
import skill_106 from './skill/skill_106'
import skill_200 from './skill/skill_200'
import skill_1000 from './skill/skill_1000'
import skill_1001 from './skill/skill_1001'
import skill_1002 from './skill/skill_1002'
import skill_1003 from './skill/skill_1003'
import skill_1004 from './skill/skill_1004'

let instance

export default class SkillRegister {
  constructor() {
    if (instance)
      return instance
    instance = this
    this.sr = {
      1: new skill_1(),
      2: new skill_2(),
      3: new skill_3(),
      4: new skill_4(),
      5: new skill_5(),
      101: new skill_101(),
      102: new skill_102(),
      103: new skill_103(),
      104: new skill_104(),
      105: new skill_105(),
      106: new skill_106(),
      200: new skill_200(),
      1000: new skill_1000(),
      1001: new skill_1001(),
      1002: new skill_1002(),
      1003: new skill_1003(),
      1004: new skill_1004(),
    }
  }
}