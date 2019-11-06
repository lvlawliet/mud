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
      /*无*/
      [1, 1, 1, 1, 1, 1],
      /*金*/
      [1, 1, 2, 0.75, 0.5, 1.25],
      /*木*/
      [1, 0.5, 1, 1.25, 0.75, 2],
      /*水*/
      [1, 1.25, 0.75, 1, 2, 0.5],
      /*火*/
      [1, 2, 1.25, 0.5, 1, 0.75],
      /*土*/
      [1, 0.75, 0.5, 2, 1.25, 1],
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
        passiveskills: [],
        ai: "0",
        wuxing: [2],
        drop: [],
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
        passiveskills: [],
        ai: "0",
        wuxing: [1],
        drop: [],
      },
      2: {
        id: 2,
        name: '小木人',
        job: 0,
        tizhi: 10,
        shenfa: 10,
        bili: 10,
        dingli: 10,
        gengu: 10,
        hpbase: 2000,
        activeskills: [],
        passiveskills: [],
        ai: "0",
        wuxing: [2],
        drop: [{
          value: 0,
          type: 'skill',
          id: 0
        }, {
          value: 10,
          type: 'skill',
          id: 1
        }, {
          value: 10,
          type: 'skill',
          id: 101
        }, {
          value: 10,
          type: 'skill',
          id: 200
        }, {
          value: 10,
          type: 'skill',
          id: 205
        }, {
          value: 10,
          type: 'skill',
          id: 210
        }, {
          value: 5,
          type: 'method',
          id: 1
        }, {
          value: 5,
          type: 'method',
          id: 2
        }, ],
      },
      3: {
        id: 3,
        name: '中木人',
        job: 0,
        tizhi: 15,
        shenfa: 15,
        bili: 15,
        dingli: 15,
        gengu: 15,
        hpbase: 2500,
        activeskills: [],
        passiveskills: [],
        ai: "0",
        wuxing: [2],
        drop: [{
          value: 20,
          type: 'skill',
          id: 0
        }, {
          value: 10,
          type: 'skill',
          id: 2
        }, {
          value: 10,
          type: 'skill',
          id: 102
        }, {
          value: 10,
          type: 'skill',
          id: 201
        }, {
          value: 10,
          type: 'skill',
          id: 206
        }, {
          value: 10,
          type: 'skill',
          id: 211
        }, {
          value: 5,
          type: 'method',
          id: 3
        }, ],
      },
      4: {
        id: 4,
        name: '大木人',
        job: 0,
        tizhi: 20,
        shenfa: 20,
        bili: 20,
        dingli: 20,
        gengu: 20,
        hpbase: 3000,
        activeskills: [],
        passiveskills: [],
        ai: "0",
        wuxing: [2],
        drop: [{
          value: 30,
          type: 'skill',
          id: 0
        }, {
          value: 10,
          type: 'skill',
          id: 3
        }, {
          value: 10,
          type: 'skill',
          id: 103
        }, {
          value: 10,
          type: 'skill',
          id: 202
        }, {
          value: 10,
          type: 'skill',
          id: 207
        }, {
          value: 10,
          type: 'skill',
          id: 212
        }, {
          value: 5,
          type: 'method',
          id: 4
        }, {
          value: 5,
          type: 'method',
          id: 5
        }, ],
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
        drop: [],
      },
      1001: {
        id: 1001,
        name: '苍鹰魄·咕咕月(伪)',
        job: 3,
        tizhi: 10,
        shenfa: 20,
        bili: 15,
        dingli: 25,
        gengu: 10,
        hpbase: 1500,
        activeskills: [205, 206, 207, 208],
        passiveskills: [209, 10000],
        ai: "guguyue",
        wuxing: [5],
        drop: [{
          value: 10,
          type: 'skill',
          id: 4
        }, {
          value: 10,
          type: 'skill',
          id: 104
        }, {
          value: 10,
          type: 'skill',
          id: 203
        }, {
          value: 10,
          type: 'skill',
          id: 208
        }, {
          value: 10,
          type: 'skill',
          id: 213
        }, ],
      }
    }

    this.map = {
      1: {
        id: 1,
        name: '小竹林',
        des: '眼前一片竹林，竹林之间有一条小溪自远处高山流下，绵延至另一端，不见其头。',
        npc: [{
          id: 2,
          value: 100
        }, ],
        choose: [{
          des: '顺流而下',
          map: [{
            id: 3,
            value: 100
          }, {
            id: 1,
            value: 50
          }, ]
        }, {
          des: '进入竹林',
          map: [{
            id: 1,
            value: 50
          }, {
            id: 2,
            value: 200
          }]
        }]
      },
      2: {
        id: 2,
        name: '竹林深处',
        des: '来到竹林深处，虽然是正午，但茂密的竹林遮天挡日，周围视线并不是很好',
        npc: [{
          id: 3,
          value: 200
        }, {
          id: 2,
          value: 50
        }, {
          id: 1001,
          value: 50
        }, ],
        choose: [{
          des: '向东',
          map: [{
            id: 1,
            value: 100
          }]
        }, {
          des: '向西',
          map: [{
            id: 1,
            value: 100
          }]
        }]
      },
      3: {
        id: 3,
        name: '溪流下游',
        des: '沿着溪流来到下游，是一片平原，但未见溪流尽头，只见溪流又流入了一片竹林。',
        npc: [{
          id: 4,
          value: 200
        }, {
          id: 3,
          value: 50
        }, {
          id: 2,
          value: 50
        }, ],
        choose: [{
          des: '沿着平原走',
          map: [{
            id: 1,
            value: 100
          }]
        }, {
          des: '沿着溪流进入竹林',
          map: [{
            id: 1,
            value: 100
          }, {
            id: 3,
            value: 300
          }, ]
        }]
      },
    }
  }
}