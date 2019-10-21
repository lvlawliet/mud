let instance

export default class Template {
  constructor() {
    if (instance)
      return instance
    instance = this

    this.methods = {
      0: {
        id: 0,
        name: '卸下心法',
        passiveskill: 0,
        job: 0,
      },
      1: {
        id: 1,
        name: '烟柳画桥',
        passiveskill: 105,
        job: 1,
      },
      2: {
        id: 2,
        name: '狂龙刀法',
        passiveskill: 5,
        job: 2,
      },
    }

    this.job = {
      0: {
        id: 0,
        name: '散人',
        sourcename: '无',
        sourcemax: 0,
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
        name: '刀',
        sourcename: '狂刀值',
        sourcemax: 100,
        sourceinit: 0,
      },
      100: {
        id: 100,
        name: '玄武魄',
        sourcename: '玄武',
        sourcemax: 20,
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
        job: 0,
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
        tizhi: 70,
        shenfa: 0,
        bili: 10,
        dingli: 20,
        gengu: 20,
        hpbase: 2500,
        activeskills: [1002, 1003, 1004],
        passiveskills: [],
        ai: "jiayu",
      }
    }

  }
}