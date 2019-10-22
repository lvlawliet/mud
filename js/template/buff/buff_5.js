import buff_template from './buff_template'
import SkillBus from './../skillbus'

let skilldata = new SkillBus()

export default class buff_5 extends buff_template {
  constructor() {
    super()
  }

  // do buff effect on add
  attach(imp, number) {
    imp.extra['hit'] += 5
  }

  // do buff effect on remove
  detach(imp, number) {
    imp.extra['hit'] -= 5
  }
}