let instance

export default class Template {
  constructor() {
    if (instance)
      return instance
    instance = this

    this.job =  {
      0: {
        id: 0,
        name: '刀',
        sourcename: '狂刀值',
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
      2: {
        id: 2,
        name: '杀手',
        sourcename: '影',
        sourcemax: 200,
        sourceinit: 200,
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
        passiveskills: [1000, 1001],
      },
      1: {
        id: 1,
        name: '风铃一刀声',
        job: 2,
        tizhi: 10,
        shenfa:40,
        bili: 18,
        dingli: 30,
        gengu: 0,
        hpbase: 2000,
        activeskills: [],
        passiveskills: [200],
      }
    }

  }
}