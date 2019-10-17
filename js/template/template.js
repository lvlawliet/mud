let instance

export default class Template {
  constructor() {
    if (instance)
      return instance
    instance = this

    this.job = {
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
      3: {
        id: 3,
        name: '御',
        sourcename: '战意',
        sourcemax: 5,
        sourceinit: 0,
      },
      100: {
        id: 100,
        name: '玄武魄',
        sourcename: '玄武',
        sourcemax: 10,
        sourceinit: 0,
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
        ai: "0",
      },
      1: {
        id: 1,
        name: '风铃一刀声',
        job: 2,
        tizhi: 10,
        shenfa: 40,
        bili: 18,
        dingli: 30,
        gengu: 0,
        hpbase: 2000,
        activeskills: [],
        passiveskills: [200],
        ai: "0",
      },
      1000: {
        id: 1000,
        name: '玄武魄·孙甲鱼',
        job: 100,
        tizhi: 30,
        shenfa: 30,
        bili: 30,
        dingli: 30,
        gengu: 30,
        hpbase: 3000,
        activeskills: [1002, 1003, 1004],
        passiveskills: [],
        ai: "jiayu",
      }
    }

  }
}