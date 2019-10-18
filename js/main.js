import Player from './player/index'
import Enemy from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './template/databus'
import SkillBus from './template/skillbus'
import CreateRole from './createrole'
import actorimp from './actorimp'
import Template from './template/template'
import SceneManager from './scenemanager'
import Fight from './fight'

import {
  canvasTextAutoLine,
  canvasTextRight,
  canvasTextCenter,
  canvasTextSplit,
} from './util/utilf'

let ctx = canvas.getContext('2d')
let usedata = new DataBus()
let skilldata = new SkillBus()
let tx = canvas.width * 1 / 12
let tempman = new Template()
let scenemanager = new SceneManager()
let fightman = new Fight()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // init background color
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
    this.operatebarpos = [
      /*{
              x: canvas.width * 1 / 12,
              y: canvas.height - 120
            },
            {
              x: canvas.width / 2 + canvas.width * 1 / 12,
              y: canvas.height - 120
            },*/
      {
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
    this.initEvent()
    this.playerA = new actorimp(0, usedata)
    this.playerB = new actorimp(1, tempman.npc[1000])
    this.result = 0
    this.stopflag = false
    this.battledata = []
    this.pop = -1

    this.restart = function() {
      this.x = 0
      this.y = 0
      this.playerA = new actorimp(0, usedata)
      this.playerB = new actorimp(1, tempman.npc[1000])
      this.result = 0
      this.stopflag = false
      this.battledata = []
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

  //check skill
  checkskill(x, y) {
    if (this.stopflag == false) {
      if (this.result == 0) {
        if (this.pop == -1) {
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
            var dis = (canvas.height * 3 / 5 - 80) / 5
            var dy = canvas.height / 5
            for (var i = 0; i < 4; ++i) {
              if (y > dy + 5 && y < dy + 3 * canvas.height / 20 - 5) {
                this.pop = -1
                this.battledata = []
                this.battledata.push("Left")
                var tmpd = fightman.work(usedata.activeskills[i].id, this.playerA, this.playerB)
                for (var k = 0; k < tmpd.length; k++) {
                  this.battledata.push(tmpd[k])
                }

                // checkalive
                var tmpa = fightman.checkalive(this.playerA, this.playerB)
                var result = tmpa.result
                var tmpd = tmpa.info

                for (var k = 0; k < tmpd.length; k++) {
                  this.battledata.push(tmpd[k])
                }
                if (result != 0) {
                  this.result = result
                  if (result == 1) {
                    this.battledata.push(this.playerA.name + "获胜")
                  } else
                  if (result == 2) {
                    this.battledata.push(this.playerB.name + "获胜")
                  } else
                  if (result == 3) {
                    this.battledata.push(this.playerA.name + "与" + this.playerB.name + "同归于尽")
                  }
                  this.battledata.push("点击任意地方重新开始")
                  break;
                }
                // ai
                this.battledata.push("Right")
                var skill = this.playerB.ai.work(this.playerB, this.playerA)
                var tmpd = fightman.work(skill.id, this.playerB, this.playerA)
                for (var k = 0; k < tmpd.length; k++) {
                  this.battledata.push(tmpd[k])
                }

                // checkalive
                var tmpa = fightman.checkalive(this.playerA, this.playerB)
                var result = tmpa.result
                var tmpd = tmpa.info

                for (var k = 0; k < tmpd.length; k++) {
                  this.battledata.push(tmpd[k])
                }
                if (result != 0) {
                  this.result = result
                  if (result == 1) {
                    this.battledata.push(this.playerA.name + "获胜")
                  } else
                  if (result == 2) {
                    this.battledata.push(this.playerB.name + "获胜")
                  } else
                  if (result == 3) {
                    this.battledata.push(this.playerA.name + "与" + this.playerB.name + "同归于尽")
                  }
                  this.battledata.push("点击任意地方重新开始")
                  break;
                }

                this.battledata.push("Middle")
                var tmpd = fightman.endround(this.playerA, this.playerB)
                for (var k = 0; k < tmpd.length; k++) {
                  this.battledata.push(tmpd[k])
                }
                break
              } else {
                dy = dy + 3 * canvas.height / 20
              }
            }
          } else {
            this.pop = -1
          }
        }
      } else {
        scenemanager.stopmain()
        if (scenemanager.hascreaterole()) {
          scenemanager.restartcreaterole()
        } else {
          var res = {
            nickName: this.playerA.name
          }
          var p = new CreateRole(res)
          scenemanager.addcreaterole(p)
        }
      }
    }
  }

  dopopwork() {
    if (this.pop == 0) {
      var y = canvas.height / 5 + canvas.height / 10
      canvasTextCenter('你……', canvas, tx, y, tx)
      y += canvas.height / 10
      canvasTextCenter('刚才你问我啊', canvas, tx, y, tx)
      y += canvas.height / 10
      canvasTextCenter('我可以回答你一句无可奉告', canvas, tx, y, tx)
      y += canvas.height / 10
      canvasTextCenter('那你们又不高兴', canvas, tx, y, tx)
      y += canvas.height / 10
      canvasTextCenter('那怎么办？', canvas, tx, y, tx)
    }
    if (this.pop == 1) {
      var x = canvas.width / 8
      var dis = (canvas.height * 3 / 5 - 80) / 5
      var y = canvas.height / 5
      for (var i = 0; i < usedata.activeskills.length; i++) {
        var skill = usedata.activeskills[i]
        var str = skill.name + "(消耗:" + skill.cost + ")"
        canvasTextCenter(str, canvas, tx, y + 3 * canvas.height / 40, tx)
        y = y + 3 * canvas.height / 20
        ctx.strokeStyle = "white";
        ctx.moveTo(x, y)
        ctx.lineTo(x * 7, y)
        ctx.stroke()
      }
    }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    var y = 70
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // title name
    canvasTextAutoLine(this.playerA.name, canvas, tx, y, 20)
    canvasTextCenter('对阵', canvas, tx, y, tx)
    canvasTextRight(this.playerB.name, canvas, tx, y, tx)
    y += 20
    // hp
    canvasTextAutoLine('血量:' + this.playerA.hpnow + '/' + this.playerA.gethpmax(), canvas, tx, y, 20)
    canvasTextRight('血量:' + this.playerB.hpnow + '/' + this.playerB.gethpmax(), canvas, tx, y, 20)
    y += 20
    // source
    canvasTextAutoLine(this.playerA.getsourcename() + this.playerA.sourcenow + '/' + this.playerA.getsourcemax(), canvas, tx, y, 20)
    canvasTextRight(this.playerB.getsourcename() + this.playerB.sourcenow + '/' + this.playerB.getsourcemax(), canvas, tx, y, 20)
    y += 20
    // split
    canvasTextSplit(canvas, tx, y)
    y += 20
    // main word
    canvasTextAutoLine('战斗记录:', canvas, tx, y, tx)
    y += 20

    for (var i = 0; i < this.battledata.length; i++) {
      if (this.battledata[i] == "Left") {
        y = canvasTextAutoLine("先手", canvas, tx, y, 20)
      } else
      if (this.battledata[i] == "Right") {
        canvasTextSplit(canvas, tx, y)
        y += 20
        canvasTextRight("后手", canvas, tx, y, 20)
        y += 20
      } else
      if (this.battledata[i] == "Middle") {
        canvasTextSplit(canvas, tx, y)
        y += 20
        canvasTextCenter("尾声", canvas, tx, y, 20)
        y += 20
      } else {
        y = canvasTextAutoLine(this.battledata[i], canvas, tx, y, 20)
      }
      //y = canvasTextAutoLine(this.battledata[i], canvas, tx, y, 20)
    }
    /*
    for (var i = 0; i < usedata.activeskills.length; i++) {
      ctx.fillText(usedata.activeskills[i].name, this.skillspos[i].x, this.skillspos[i].y)
    }
    */
    for (var i = 0; i < this.operatebarpos.length; i++) {
      ctx.fillText(this.operatebarpos[i].name, this.operatebarpos[i].x, this.operatebarpos[i].y)
    }
    if (this.pop != -1) {
      ctx.clearRect(this.poppos[0].x, this.poppos[0].y, this.poppos[3].x - this.poppos[0].x, this.poppos[3].y - this.poppos[0].y)
      ctx.strokeStyle = "white";
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