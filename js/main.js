import Template from './template/template'
import DataBus from './template/databus'
import BattleScene from './battlescene'
import SceneManager from './scenemanager'
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

/*
 * pop的说明
 * -1.主界面
 * 0.属性界面
 * 1.一级技能装备界面
 * 2-5.二级装备界面
 * 6.心法装备界面
 */
export default class Main {
  constructor() {
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
      0: [
        {
          x: tx,
          y: 130,
        },
        {
          x: tx * 11,
          y: 130,
        },
        {
          x: tx,
          y: 130 + ty,
        },
        {
          x: tx * 11,
          y: 130 + ty
        }
      ]
    }
    this.selectbar = [
      {
        name: '木武童',
        x: tx,
        y: 130 + ty / 2
      },
    ] 
    this.initEvent()
    this.stopflag = false
    this.pop = -1
    this.page = 0
    this.skillshow = []
    this.methodshow = []

    this.restart = function() {
      this.x = 0
      this.y = 0
      this.stopflag = false
      this.pop = -1
      this.page = 0
      this.skillshow = []
      this.methodshow = []
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
            scenemanager.stopmain()
            if (scenemanager.hasballtescene()) {
              scenemanager.restartballtescene(0)
            } else {
              var p = new BattleScene(0)
              scenemanager.addballtescene(p)
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
                var flag = usedata.saveskill(this.pop - 2, this.skillshow[i])
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
                usedata.savemethod(this.methodshow[i])
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
      for (var i = 0; i < usedata.activeskills.length; i++) {
        if (usedata.activeskills[i] != null) {
          y = canvasTextAutoLine(usedata.activeskills[i].name, canvas, x + dx, y, dy)
        }
      }
      y = canvasTextAutoLine("心法：", canvas, x, y, dy)
      if (usedata.method == null) {
        canvasTextAutoLine("无", canvas, x + dx, y, dy)
      } else {
        canvasTextAutoLine(usedata.method.name, canvas, x + dx, y, dy)
      }
    } else
    if (this.pop == 1) {
      var x = canvas.width / 8
      var y = canvas.height / 5
      for (var i = 0; i < 4; i++) {
        var str = "[第" + (i + 1) + "个技能槽]"
        if (usedata.activeskills[i] != null) {
          str = usedata.activeskills[i].name
        }
        canvasTextCenter(str, canvas, tx, y + 3 * canvas.height / 50, tx)
        y = y + 3 * canvas.height / 25
        ctx.strokeStyle = "white";
        ctx.moveTo(x, y)
        ctx.lineTo(x * 7, y)
        ctx.stroke()
      }
      if (usedata.method == null) {
        canvasTextCenter("[心法槽]", canvas, tx, y + 3 * canvas.height / 50, tx)
      } else {
        canvasTextCenter(usedata.method.name, canvas, tx, y + 3 * canvas.height / 50, tx)
      }
    } else
    if (this.pop >= 2 && this.pop <= 5) {
      // init
      this.skillshow = []
      var tmpbag = []
      if (usedata.getdata('job') == 0) {
        tmpbag = usedata.skillbag
      } else {
        for (var i = 0; i < usedata.skillbag.length; i++) {
          if (usedata.getdata('job') == usedata.skillbag[i].job) {
            tmpbag.push(usedata.skillbag[i])
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
        var str = skill.name
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
      if (this.page > Math.ceil(usedata.methodbag.length / 4) - 1) {
        this.page = Math.ceil(usedata.methodbag.length / 4) - 1
      }
      if (this.page < 0) {
        this.page = 0
      }
      var tmp = this.page * 4
      for (var i = 0; i < usedata.methodbag.length; i++) {
        if (tmp == 0) {
          this.methodshow.push(usedata.methodbag[i])
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
        var skill = this.methodshow[i]
        var str = skill.name
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
    y = canvasTextAutoLine("职业：" + tempman.job[usedata.getdata('job')].name, canvas, tx, y, 20)
    // split
    canvasTextSplit(canvas, tx, y)

    // draw select
    for (var key in this.selectpos) {
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
    for (var i = 0; i < this.selectbar.length; i++) {
      canvasTextCenter(this.selectbar[i].name, canvas, 0, this.selectbar[i].y, 0)
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
}