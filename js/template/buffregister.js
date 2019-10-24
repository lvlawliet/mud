import buff_1 from './buff/buff_1'
import buff_2 from './buff/buff_2'
import buff_3 from './buff/buff_3'
import buff_4 from './buff/buff_4'
import buff_5 from './buff/buff_5'
import buff_6 from './buff/buff_6'
import buff_7 from './buff/buff_7'
import buff_8 from './buff/buff_8'
import buff_9 from './buff/buff_9'
import buff_10 from './buff/buff_10'
import buff_11 from './buff/buff_11'
import buff_12 from './buff/buff_12'
import buff_13 from './buff/buff_13'
import buff_14 from './buff/buff_14'
import buff_15 from './buff/buff_15'
import buff_16 from './buff/buff_16'
import buff_17 from './buff/buff_17'
import buff_18 from './buff/buff_18'
import buff_19 from './buff/buff_19'
import buff_20 from './buff/buff_20'
import buff_21 from './buff/buff_21'
import buff_22 from './buff/buff_22'

let instance

export default class BuffRegister {
  constructor() {
    if (instance)
      return instance
    instance = this
    this.br = {
      1: new buff_1(),
      2: new buff_2(),
      3: new buff_3(),
      4: new buff_4(),
      5: new buff_5(),
      6: new buff_6(),
      7: new buff_7(),
      8: new buff_8(),
      9: new buff_9(),
      10: new buff_10(),
      11: new buff_11(),
      12: new buff_12(),
      13: new buff_13(),
      14: new buff_14(),
      15: new buff_15(),
      16: new buff_16(),
      17: new buff_17(),
      18: new buff_18(),
      19: new buff_19(),
      20: new buff_20(),
      21: new buff_21(),
      22: new buff_22(),
    }
  }
}