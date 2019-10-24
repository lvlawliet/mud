let instance

export default class Template {
  constructor() {
    if (instance)
      return instance
    instance = this

    this.wuxing = {
      0: '无',
      1: '金',
      2: '木',
      3: '水',
      4: '火',
      5: '土'
    }

    this.wuxingrestrain = [
           /*无    金    木    水    火    土*/
      /*无*/[1,    1,    1,    1,    1,    1],
      /*金*/[1,    1,    2, 0.75,  0.5, 1.25],
      /*木*/[1,  0.5,    1, 1.25, 0.75,    2],
      /*水*/[1, 1.25, 0.75,    1,    2,  0.5],
      /*火*/[1,    2, 1.25,  0.5,    1, 0.75],
      /*土*/[1, 0.75,  0.5,    2, 1.25,    1],
    ]

    this.methods = {
      0: {
        id: 0,
        name: '卸下心法',
        passiveskill: [0],
        job: 0,
        wuxing: [0],
        skills: [],
      },
      1: {
        id: 1,
        name: '烟柳画桥',
        passiveskill: [105],
        job: 1,
        wuxing: [2],
        skills: [101, 102, 103, 104],
      },
      2: {
        id: 2,
        name: '狂龙刀法',
        passiveskill: [5],
        job: 2,
        wuxing: [1],
        skills: [1, 2, 3, 4],
      },
      3: {
        id: 3,
        name: '断水刃',
        passiveskill: [204, 10000],
        job: 3,
        wuxing: [1],
        skills: [200, 201, 202, 203],
      },
      4: {
        id: 4,
        name: '冲云链',
        passiveskill: [209, 10000],
        job: 3,
        wuxing: [5],
        skills: [205, 206, 207, 208],
      },
      5: {
        id: 5,
        name: '隐龙诀',
        passiveskill: [214, 10000],
        job: 3,
        wuxing: [4],
        skills: [210, 211, 212, 213],
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
      3: {
        id: 3,
        name: '链刃',
        sourcename: '隐',
        sourcemax: 5,
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
        name: '木武童',
        job: 0,
        tizhi: 50,
        shenfa: 0,
        bili: 10,
        dingli: 5,
        gengu: 5,
        hpbase: 1000,
        activeskills: [],
        passiveskills: [1000],
        ai: "0",
        wuxing: [2],
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
        wuxing: [1],
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
        wuxing: [5],
      },
      1001: {
        id: 1001,
        name: '苍鹰魄·咕咕月',
        job: 3,
        tizhi: 22,
        shenfa: 24,
        bili: 26,
        dingli: 18,
        gengu: 11,
        hpbase: 1800,
        activeskills: [205, 206, 207, 208],
        passiveskills: [209, 10000],
        ai: "guguyue",
        wuxing: [5],
      }
    }

  }
}