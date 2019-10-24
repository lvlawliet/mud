import skill_0 from './skill/skill_0'
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
import skill_201 from './skill/skill_201'
import skill_202 from './skill/skill_202'
import skill_203 from './skill/skill_203'
import skill_204 from './skill/skill_204'
import skill_205 from './skill/skill_205'
import skill_206 from './skill/skill_206'
import skill_207 from './skill/skill_207'
import skill_208 from './skill/skill_208'
import skill_209 from './skill/skill_209'
import skill_210 from './skill/skill_210'
import skill_211 from './skill/skill_211'
import skill_212 from './skill/skill_212'
import skill_213 from './skill/skill_213'
import skill_214 from './skill/skill_214'
import skill_1000 from './skill/skill_1000'
import skill_1001 from './skill/skill_1001'
import skill_1002 from './skill/skill_1002'
import skill_1003 from './skill/skill_1003'
import skill_1004 from './skill/skill_1004'
import skill_9999 from './skill/skill_9999'
import skill_10000 from './skill/skill_10000'

let instance

export default class SkillRegister {
  constructor() {
    if (instance)
      return instance
    instance = this
    this.sr = {
      0: new skill_0(),
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
      201: new skill_201(),
      202: new skill_202(),
      203: new skill_203(),
      204: new skill_204(),
      205: new skill_205(),
      206: new skill_206(),
      207: new skill_207(),
      208: new skill_208(),
      209: new skill_209(),
      210: new skill_210(),
      211: new skill_211(),
      212: new skill_212(),
      213: new skill_213(),
      214: new skill_214(),
      1000: new skill_1000(),
      1001: new skill_1001(),
      1002: new skill_1002(),
      1003: new skill_1003(),
      1004: new skill_1004(),
      9999: new skill_9999(),
      10000: new skill_10000(),
    }
  }
}