import ai_0 from './ai/ai_0'
import ai_jiayu from './ai/ai_jiayu'
import ai_guguyue from './ai/ai_guguyue'

let instance

export default class AiRegister {
  constructor() {
    if (instance)
      return instance
    instance = this
    this.ar = {
      "0": new ai_0(),
      "jiayu": new ai_jiayu(),
      "guguyue": new ai_guguyue(),
    }
  }
}