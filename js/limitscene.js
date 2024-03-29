import Template from './template/template'
import DataBus from './template/databus'
import Limit_BattleScene from './limit_battlescene'
import SceneManager from './scenemanager'
import SkillBus from './template/skillbus'
import {
  canvasTextAutoLine,
  canvasTextRight,
  canvasTextCenter,
  canvasTextSplit,
} from './util/utilf'

let ctx = canvas.getContext('2d')
let usedata = new DataBus()
let tempman = new Template()
let tx = canvas.width * 1 / 12
let ty = (canvas.height - 310) / 3
let scenemanager = new SceneManager()
let skilldata = new SkillBus()

export default class LimitScene {
  constructor(mapid, e = false) {
    ctx.font = "14px Georgia";
    ctx.fillStyle = '#FFFFFF'
    this.playername = usedata.getdata('name')
    this.bindLoop = this.loop.bind(this)
    this.x = 0
    this.y = 0
    window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
    this.operatebarpos = [{
        name: "属性",
        x: canvas.width / 4 - canvas.width / 15,
        y: canvas.height - 60
      },
      {
        name: "技能",
        x: canvas.width * 3 / 4 - canvas.width / 15,
        y: canvas.height - 60
      }
    ]
    this.poppos = [{
        x: canvas.width / 8,
        y: canvas.height / 5,
      },
      {
        x: canvas.width / 8,
        y: canvas.height * 4 / 5,
      },
      {
        x: canvas.width * 7 / 8,
        y: canvas.height / 5,
      },
      {
        x: canvas.width * 7 / 8,
        y: canvas.height * 4 / 5,
      }
    ]
    this.selectpos = {
      0: [{
          x: tx,
          y: 150,
        },
        {
          x: tx * 11,
          y: 150,
        },
        {
          x: tx,
          y: 150 + ty,
        },
        {
          x: tx * 11,
          y: 150 + ty
        }
      ],
      1: [{
          x: tx,
          y: 150 + ty + 20,
        },
        {
          x: tx * 11,
          y: 150 + ty + 20,
        },
        {
          x: tx,
          y: 150 + ty + ty + 20,
        },
        {
          x: tx * 11,
          y: 150 + ty + ty + 20,
        }
      ],
      2: [{
          x: tx,
          y: 150 + 2 * ty + 40,
        },
        {
          x: tx * 11,
          y: 150 + 2 * ty + 40,
        },
        {
          x: tx,
          y: 150 + 3 * ty + 40,
        },
        {
          x: tx * 11,
          y: 150 + 3 * ty + 40,
        }
      ],
    }
    this.selectbar = [{
        x: tx,
        y: 150 + ty / 2
      },
      {
        x: tx,
        y: 150 + ty + ty / 2 + 20
      },
      {
        x: tx,
        y: 150 + 2 * ty + ty / 2 + 40
      },
    ]
    this.initEvent()
    this.stopflag = false
    this.pop = -1
    this.page = 0
    this.skillshow = []
    this.methodshow = []
    this.finish = e
    this.mapid = mapid
    this.npcid = this.getnpcid()
    this.choose = this.getchooselist()

    this.restart = function(mapid, e = false) {
      this.x = 0
      this.y = 0
      this.stopflag = false
      this.pop = -1
      this.page = 0
      this.skillshow = []
      this.methodshow = []
      this.finish = e
      this.mapid = mapid
      this.npcid = this.getnpcid()
      this.choose = this.getchooselist()
      window.requestAnimationFrame(
        this.bindLoop,
        canvas
      )
    }

    this.stop = function() {
      this.stopflag = true
    }
  }

  initEvent() {
    wx.onTouchStart(((e) => {
      this.x = e.touches[0].clientX
      this.y = e.touches[0].clientY

    }).bind(this))
    wx.onTouchMove(((e) => {

      this.x = e.touches[0].clientX
      this.y = e.touches[0].clientY

    }).bind(this))

    wx.onTouchEnd(((e) => {
      this.checkskill(this.x, this.y)
    }).bind(this))
  }

  checkskill(x, y) {
    if (this.stopflag == false) {
      if (this.pop == -1) {
        for (var key in this.selectpos) {
          var tmpselect = this.selectpos[key]
          if (x > tmpselect[0].x && y > tmpselect[0].y && x < tmpselect[3].x && y < tmpselect[3].y) {
            if (this.finish == false) {
              scenemanager.stoplimit()
              if (scenemanager.haslimitballtescene()) {
                scenemanager.restartlimitballtescene(this.npcid[key])
              } else {
                var p = new Limit_BattleScene(this.npcid[key])
                scenemanager.addlimitballtescene(p)
              }
            } else {
              var choose = this.choose[key]
              if (choose.type == 'skill') {
                usedata.savelimit_skillbag([choose.id])
              } else {
                usedata.savelimit_methodbag([choose.id])
              }
              this.mapid++
              usedata.mapid = this.mapid
              this.finish = false
              this.npcid = this.getnpcid()
              this.choose = this.getchooselist()
            }
          }
        }
        for (var i = 0; i < this.operatebarpos.length; i++) {
          let tmpx = this.operatebarpos[i].x
          let tmpy = this.operatebarpos[i].y
          if (x > tmpx - 10 && x < tmpx + 30 && y > tmpy - 30 && y < tmpy + 30) {
            this.pop = i
            break
          }
        }
      } else
      if (this.pop == 0) {
        this.pop = -1
      } else
      if (this.pop == 1) {
        if (x > this.poppos[0].x && y > this.poppos[0].y && x < this.poppos[3].x && y < this.poppos[3].y) {
          var dis = (canvas.height * 3 / 5 - 80) / 6
          var dy = canvas.height / 6
          for (var i = 0; i < 5; ++i) {
            if (y > dy + 5 && y < dy + 3 * canvas.height / 25 - 5) {
              if (i < 4) {
                this.pop = 2 + i
                this.page = 0
              } else {
                this.pop = 6
                this.page = 0
              }
              break;
            } else {
              dy = dy + 3 * canvas.height / 25
            }
          }
        } else {
          this.pop = -1
        }
      } else
      if (this.pop >= 2 && this.pop <= 5) {
        if (x > this.poppos[0].x && y > this.poppos[0].y && x < this.poppos[3].x && y < this.poppos[3].y) {
          var dis = (canvas.height * 3 / 5 - 80) / 5
          var dy = canvas.height / 5
          for (var i = 0; i < 4; ++i) {
            if (y > dy + 5 && y < dy + 3 * canvas.height / 20 - 5) {
              if (i < this.skillshow.length) {
                var flag = usedata.savelimit_skill(this.pop - 2, this.skillshow[i])
                if (flag == true) {
                  this.pop = 1
                  this.page = 0
                } else {
                  wx.showModal({
                    title: "技能和运转的心法不符",
                    showCancel: false
                  })
                }
              }
              break;
            } else {
              dy = dy + 3 * canvas.height / 20
            }
          }
        } else
        if (y > this.poppos[0].y && y < this.poppos[3].y) {
          if (x < this.poppos[0].x) {
            this.page--
          } else
          if (x > this.poppos[3].x) {
            this.page++
          }
        } else {
          this.pop = 1
        }
      } else
      if (this.pop == 6) {
        if (x > this.poppos[0].x && y > this.poppos[0].y && x < this.poppos[3].x && y < this.poppos[3].y) {
          var dis = (canvas.height * 3 / 5 - 80) / 5
          var dy = canvas.height / 5
          for (var i = 0; i < 4; ++i) {
            if (y > dy + 5 && y < dy + 3 * canvas.height / 20 - 5) {
              if (i < this.methodshow.length) {
                usedata.savelimit_method(this.methodshow[i])
                this.pop = 1
                this.page = 0
              }
              break;
            } else {
              dy = dy + 3 * canvas.height / 20
            }
          }
        } else
        if (y > this.poppos[0].y && y < this.poppos[3].y) {
          if (x < this.poppos[0].x) {
            this.page--
          } else
          if (x > this.poppos[3].x) {
            this.page++
          }
        } else {
          this.pop = 1
        }
      }
    }

  }

  dopopwork() {
    if (this.pop == 0) {
      var x = canvas.width / 8 + canvas.width / 20
      var dx = canvas.width / 20
      var y = canvas.height / 5 + 20
      var dy = 20
      y = canvasTextAutoLine("属性：", canvas, x, y, 20)
      y = canvasTextAutoLine("体质：" + usedata.getdata('tizhi'), canvas, x + dx, y, dy)
      y = canvasTextAutoLine("身法：" + usedata.getdata('shenfa'), canvas, x + dx, y, dy)
      y = canvasTextAutoLine("臂力：" + usedata.getdata('bili'), canvas, x + dx, y, dy)
      y = canvasTextAutoLine("定力：" + usedata.getdata('dingli'), canvas, x + dx, y, dy)
      y = canvasTextAutoLine("根骨：" + usedata.getdata('gengu'), canvas, x + dx, y, dy)
      y = canvasTextAutoLine("技能：", canvas, x, y, dy)
      for (var i = 0; i < usedata.limit_activeskills.length; i++) {
        if (usedata.limit_activeskills[i] != null) {
          y = canvasTextAutoLine(usedata.limit_activeskills[i].name + '(' + tempman.wuxing[usedata.limit_activeskills[i].wuxing] + ')', canvas, x + dx, y, dy)
        }
      }
      y = canvasTextAutoLine("心法：", canvas, x, y, dy)
      if (usedata.limit_method == null) {
        canvasTextAutoLine("无", canvas, x + dx, y, dy)
      } else {
        var tmpstr = usedata.limit_method.name + '('
        for (var xf = 0; xf < usedata.limit_method.wuxing.length; xf++) {
          tmpstr += tempman.wuxing[usedata.limit_method.wuxing[xf]]
        }
        tmpstr += ')'
        canvasTextAutoLine(tmpstr, canvas, x + dx, y, dy)
      }
    } else
    if (this.pop == 1) {
      var x = canvas.width / 8
      var y = canvas.height / 5
      for (var i = 0; i < 4; i++) {
        var str = "[第" + (i + 1) + "个技能槽]"
        if (usedata.limit_activeskills[i] != null) {
          str = usedata.limit_activeskills[i].name + '(' + tempman.wuxing[usedata.limit_activeskills[i].wuxing] + ')'
        }
        canvasTextCenter(str, canvas, tx, y + 3 * canvas.height / 50, tx)
        y = y + 3 * canvas.height / 25
        ctx.strokeStyle = "white";
        ctx.moveTo(x, y)
        ctx.lineTo(x * 7, y)
        ctx.stroke()
      }
      if (usedata.limit_method == null) {
        canvasTextCenter("[心法槽]", canvas, tx, y + 3 * canvas.height / 50, tx)
      } else {
        var tmpstr = usedata.limit_method.name + '('
        for (var xf = 0; xf < usedata.limit_method.wuxing.length; xf++) {
          tmpstr += tempman.wuxing[usedata.limit_method.wuxing[xf]]
        }
        tmpstr += ')'
        canvasTextCenter(tmpstr, canvas, tx, y + 3 * canvas.height / 50, tx)
      }
    } else
    if (this.pop >= 2 && this.pop <= 5) {
      // init
      this.skillshow = []
      var tmpbag = []
      if (usedata.getdata('limit_job') == 0) {
        tmpbag = usedata.limit_skillbag
      } else {
        for (var i = 0; i < usedata.limit_skillbag.length; i++) {
          if (usedata.getdata('limit_job') == usedata.limit_skillbag[i].job) {
            tmpbag.push(usedata.limit_skillbag[i])
          }
        }
      }
      if (this.page > Math.ceil(tmpbag.length / 4) - 1) {
        this.page = Math.ceil(tmpbag.length / 4) - 1
      }
      if (this.page < 0) {
        this.page = 0
      }
      var tmp = this.page * 4
      for (var i = 0; i < tmpbag.length; i++) {
        if (tmp == 0) {
          this.skillshow.push(tmpbag[i])
        } else {
          tmp--
        }
        if (this.skillshow.length >= 4) {
          break;
        }
      }

      var x = canvas.width / 8
      var dis = (canvas.height * 3 / 5 - 80) / 6
      var y = canvas.height / 5
      for (var i = 0; i < this.skillshow.length; i++) {
        var skill = this.skillshow[i]
        var str = skill.name + '(' + tempman.wuxing[skill.wuxing] + ')'
        canvasTextCenter(str, canvas, tx, y + 3 * canvas.height / 40, tx)
        y = y + 3 * canvas.height / 20
        ctx.strokeStyle = "white";
        ctx.moveTo(x, y)
        ctx.lineTo(x * 7, y)
        ctx.stroke()
      }
      canvasTextAutoLine("<<", canvas, canvas.width / 20, canvas.height / 2, 20)
      canvasTextAutoLine(">>", canvas, canvas.width * 18 / 20, canvas.height / 2, 20)
    } else
    if (this.pop == 6) {
      // init
      this.methodshow = []
      if (this.page > Math.ceil(usedata.limit_methodbag.length / 4) - 1) {
        this.page = Math.ceil(usedata.limit_methodbag.length / 4) - 1
      }
      if (this.page < 0) {
        this.page = 0
      }
      var tmp = this.page * 4
      for (var i = 0; i < usedata.limit_methodbag.length; i++) {
        if (tmp == 0) {
          this.methodshow.push(usedata.limit_methodbag[i])
        } else {
          tmp--
        }
        if (this.methodshow.length >= 4) {
          break;
        }
      }

      var x = canvas.width / 8
      var dis = (canvas.height * 3 / 5 - 80) / 6
      var y = canvas.height / 5
      for (var i = 0; i < this.methodshow.length; i++) {
        var method = this.methodshow[i]
        var str = method.name + '('
        for (var xf = 0; xf < method.wuxing.length; xf++) {
          str += tempman.wuxing[method.wuxing[xf]]
        }
        str += ')'
        canvasTextCenter(str, canvas, tx, y + 3 * canvas.height / 40, tx)
        y = y + 3 * canvas.height / 20
        ctx.strokeStyle = "white";
        ctx.moveTo(x, y)
        ctx.lineTo(x * 7, y)
        ctx.stroke()
      }
      canvasTextAutoLine("<<", canvas, canvas.width / 20, canvas.height / 2, 20)
      canvasTextAutoLine(">>", canvas, canvas.width * 18 / 20, canvas.height / 2, 20)

    }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.beginPath()
    var y = 70
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // title name 
    y = canvasTextAutoLine(usedata.getdata('name'), canvas, tx, y, 20)
    y = canvasTextAutoLine("职业：" + tempman.job[usedata.getdata('limit_job')].name, canvas, tx, y, 20)
    // split
    canvasTextSplit(canvas, tx, y)
    y += 20
    // text
    canvasTextCenter('第' + this.mapid + '层', canvas, 0, y, 0)

    // draw select
    if (this.finish == false) {
      for (var key = 0; key < 3; key++) {
        var tmppos = this.selectpos[key]
        ctx.strokeStyle = "white";
        ctx.moveTo(tmppos[0].x, tmppos[0].y)
        ctx.lineTo(tmppos[1].x, tmppos[1].y)
        ctx.moveTo(tmppos[0].x, tmppos[0].y)
        ctx.lineTo(tmppos[2].x, tmppos[2].y)
        ctx.moveTo(tmppos[3].x, tmppos[3].y)
        ctx.lineTo(tmppos[1].x, tmppos[1].y)
        ctx.moveTo(tmppos[3].x, tmppos[3].y)
        ctx.lineTo(tmppos[2].x, tmppos[2].y)
        ctx.stroke();
        canvasTextCenter(tempman.npc[this.npcid[key]].name, canvas, 0, this.selectbar[key].y, 0)
      }
    } else {
      for (var key = 0; key < 3; key++) {
        var tmppos = this.selectpos[key]
        ctx.strokeStyle = "white";
        ctx.moveTo(tmppos[0].x, tmppos[0].y)
        ctx.lineTo(tmppos[1].x, tmppos[1].y)
        ctx.moveTo(tmppos[0].x, tmppos[0].y)
        ctx.lineTo(tmppos[2].x, tmppos[2].y)
        ctx.moveTo(tmppos[3].x, tmppos[3].y)
        ctx.lineTo(tmppos[1].x, tmppos[1].y)
        ctx.moveTo(tmppos[3].x, tmppos[3].y)
        ctx.lineTo(tmppos[2].x, tmppos[2].y)
        ctx.stroke();
      }
      for (var i = 0; i < 3; i++) {
        if (this.choose[i].type == 'skill') {
          canvasTextCenter(skilldata.skills[this.choose[i].id].name + '(技)', canvas, 0, this.selectbar[i].y, 0)
        } else {
          canvasTextCenter(tempman.methods[this.choose[i].id].name + '(心)', canvas, 0, this.selectbar[i].y, 0)
        }
      }
    }

    // bottom
    for (var i = 0; i < this.operatebarpos.length; i++) {
      ctx.fillText(this.operatebarpos[i].name, this.operatebarpos[i].x, this.operatebarpos[i].y)
    }
    if (this.pop != -1) {
      ctx.clearRect(this.poppos[0].x, this.poppos[0].y, this.poppos[3].x - this.poppos[0].x, this.poppos[3].y - this.poppos[0].y)
      ctx.strokeStyle = "white";
      ctx.beginPath()
      ctx.moveTo(this.poppos[0].x, this.poppos[0].y)
      ctx.lineTo(this.poppos[1].x, this.poppos[1].y)
      ctx.moveTo(this.poppos[0].x, this.poppos[0].y)
      ctx.lineTo(this.poppos[2].x, this.poppos[2].y)
      ctx.moveTo(this.poppos[3].x, this.poppos[3].y)
      ctx.lineTo(this.poppos[1].x, this.poppos[1].y)
      ctx.moveTo(this.poppos[3].x, this.poppos[3].y)
      ctx.lineTo(this.poppos[2].x, this.poppos[2].y)
      ctx.stroke();
      this.dopopwork()
    }
  }

  // 游戏逻辑更新主函数
  update() {}

  // 实现游戏帧循环
  loop() {
    if (this.stopflag == false) {
      this.update()
      this.render()

      window.requestAnimationFrame(
        this.bindLoop,
        canvas
      )
    }
  }

  getnpcid() {
    var list = [2, 2, 2]
    var nlist = tempman.limit[this.mapid].npc
    for (var t = 0; t < 3; t++) {
      var idx = Math.floor(Math.random() * nlist.length)
      list[t] = nlist[idx]
    }
    return list
  }

  getchooselist() {
    var methods = Math.floor(Math.random() * 2)
    var skills = 3 - methods
    var list = []
    var slist = tempman.limit[this.mapid].dropskill
    var mlist = tempman.limit[this.mapid].dropmethod
    for (var i = 0; i < skills; i++) {
      var idx = Math.floor(Math.random() * slist.length)
      list.push({type: 'skill', id: slist[idx]})
    }
    for (var i = 0; i < methods; i++) {
      var idx = Math.floor(Math.random() * mlist.length)
      list.push({ type: 'method', id: mlist[idx] })
    }
    return list
  }

}