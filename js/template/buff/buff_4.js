import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_4 extends buff_template {
  constructor() {
    super()
  }

  // do buff effect on add
  attach(imp, number) {
    imp.extra['dingli'] += 15
  }

  // do buff effect on remove
  detach(imp, number) {
    imp.extra['dingli'] -= 15
  }
}