let instance

export default class template {
  constructor() {
    if (instance)
      return instance
    instance = this

    this.job =  {
      0: {
        id: 0,
        name: '刀',
        sourcename: '刀气',
        sourcemax: 100,
        sourceinit: 0,
      },
      1: {
        id: 1,
        name: '剑',
        sourcename: '剑意',
        sourcemax: 100,
        sourceinit: 50,
      },
    }

    this.npc = {
      0: {
        id: 0,
        name: '木桩',
        job: 0,
        tizhi: 50,
        shenfa: 50,
        bili: 50,
        dingli: 50,
        gengu: 50,
        hpbase: 5000,
        activeskills: [],
        passiveskills: [],
      }
    }

  }
}