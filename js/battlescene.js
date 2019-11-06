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
import SearchScene from './searchscene'

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
export default class BattleScene {
  constructor(e) {
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
    this.initEvent()
    this.playerA = new actorimp(0, usedata)
    this.playerB = new actorimp(1, tempman.npc[e])
    this.result = 0
    this.stopflag = false
    this.battledata = []
    this.pop = -1

    this.restart = function(e) {
      this.x = 0
      this.y = 0
      this.playerA = new actorimp(0, usedata)
      this.playerB = new actorimp(1, tempman.npc[e])
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
            for (var i = 0; i < this.playerA.activeskills.length; ++i) {
              if (y > dy + 5 && y < dy + 3 * canvas.height / 20 - 5) {
                this.pop = -1
                this.battledata = []
                var trand = Math.floor(Math.random() * 11) - 5 + this.playerA.getshenfa() - this.playerB.getshenfa()
                var queue = []
                if (trand >= 0) {
                  queue = [0, 1]
                } else {
                  queue = [1, 0]
                }
                for (var t = 0; t < queue.length; t++) {
                  if (queue[t] == 0) {
                    if (t == 0) {
                      this.battledata.push("+Left")
                    } else {
                      this.battledata.push("+Right")
                    }
                    var tmpd = fightman.work(this.playerA.activeskills[i].id, this.playerA, this.playerB)
                    for (var k = 0; k < tmpd.length; k++) {
                      this.battledata.push(tmpd[k])
                    }
                  } else {
                    // ai
                    if (t == 0) {
                      this.battledata.push("Left+")
                    } else {
                      this.battledata.push("Right+")
                    }
                    var skill = this.playerB.ai.work(this.playerB, this.playerA)
                    var tmpd = fightman.work(skill.id, this.playerB, this.playerA)
                    for (var k = 0; k < tmpd.length; k++) {
                      this.battledata.push(tmpd[k])
                    }
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
                    if (result == 1) {
                      var npc = tempman.npc[this.playerB.id]
                      if (npc.drop.length != 0) {
                        var total = 0
                        for (var i = 0; i < npc.drop.length; i++) {
                          total += npc.drop[i].value
                        }
                        var rand = Math.floor(Math.random() * total)
                        console.log(rand)
                        for (var i = 0; i < npc.drop.length; i++) {
                          if (rand < npc.drop[i].value) {
                            if (npc.drop[i].id > 0) {
                              if (npc.drop[i].type == 'skill') {
                                usedata.saveskillbag([npc.drop[i].id])
                                this.battledata.push("获得技能[" + skilldata.skills[npc.drop[i].id].name + "]")
                              } else
                              if (npc.drop[i].type == 'method') {
                                usedata.savemethodbag([npc.drop[i].id])
                                this.battledata.push("获得心法[" + tempman.methods[npc.drop[i].id].name + "]")
                              }
                            }
                            break
                          } else {
                            rand -= npc.drop[i].value
                          }
                        }
                      }
                    }
                    this.battledata.push("点击任意地方重新开始")
                    break;
                  }
                }
                if (result != 0) {
                  break
                }

                this.battledata.push("Middle")
                var tmpd = fightman.endround(this.playerA, this.playerB)
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
                  if (result == 1) {
                    var npc = tempman.npc[this.playerB.id]
                    if (npc.drop.length != 0) {
                      var total = 0
                      for (var i = 0; i < npc.drop.length; i++) {
                        total += npc.drop[i].value
                      }
                      var rand = Math.floor(Math.random() * total)
                      console.log(rand)
                      for (var i = 0; i < npc.drop.length; i++) {
                        if (rand < npc.drop[i].value) {
                          if (npc.drop[i].id > 0) {
                            if (npc.drop[i].type == 'skill') {
                              usedata.saveskillbag([npc.drop[i].id])
                              this.battledata.push("获得技能[" + skilldata.skills[npc.drop[i].id].name + "]")
                            } else
                            if (npc.drop[i].type == 'method') {
                              usedata.savemethodbag([npc.drop[i].id])
                              this.battledata.push("获得心法[" + tempman.methods[npc.drop[i].id].name + "]")
                            }
                          }
                          break
                        } else {
                          rand -= npc.drop[i].value
                        }
                      }
                    }
                  }
                  this.battledata.push("点击任意地方重新开始")
                  break;
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
        scenemanager.stopballtescene()
        console.log(usedata.local + ' ' + this.result)
        if (usedata.local == 'main' || this.result != 1) {
          if (scenemanager.hasmain()) {
            scenemanager.restartmain()
          } else {
            var p = new Main()
            scenemanager.addmain(p)
          }
        } else 
        if (usedata.local == 'search') {
          if (scenemanager.hassearch()) {
            scenemanager.restartsearch(usedata.mapid, true)
          } else {
            var p = new SearchScene(usedata.mapid, true)
            scenemanager.addsearch(p)
          }
        }
      }
    }
  }

  dopopwork() {
    if (this.pop == 0) {
      /*
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
      */
      var x = canvas.width / 8 + canvas.width / 20
      var dx = canvas.width / 20
      var y = canvas.height / 5 + 20
      var dy = 20
      y = canvasTextAutoLine("属性：", canvas, x, y, 20)
      y = canvasTextAutoLine("体质：" + this.playerA.gettizhi() + '(' + this.playerA.extra['tizhi'] + ')', canvas, x + dx, y, dy)
      y = canvasTextAutoLine("身法：" + this.playerA.getshenfa() + '(' + this.playerA.extra['shenfa'] + ')', canvas, x + dx, y, dy)
      y = canvasTextAutoLine("臂力：" + this.playerA.getbili() + '(' + this.playerA.extra['bili'] + ')', canvas, x + dx, y, dy)
      y = canvasTextAutoLine("定力：" + this.playerA.getdingli() + '(' + this.playerA.extra['dingli'] + ')', canvas, x + dx, y, dy)
      y = canvasTextAutoLine("根骨：" + this.playerA.getgengu() + '(' + this.playerA.extra['gengu'] + ')', canvas, x + dx, y, dy)
      y = canvasTextAutoLine("额外暴击率：" + this.playerA.extra['crit'], canvas, x + dx, y, dy)
      y = canvasTextAutoLine("额外命中率：" + this.playerA.extra['hit'], canvas, x + dx, y, dy)
    }
    if (this.pop == 1) {
      var x = canvas.width / 8
      var dis = (canvas.height * 3 / 5 - 80) / 6
      var y = canvas.height / 5
      for (var i = 0; i < this.playerA.activeskills.length; i++) {
        var skill = this.playerA.activeskills[i]
        var str = skill.name + '(' + tempman.wuxing[skill.wuxing] + ')' + "(" + skill.cost + ")" + '(' + skill.sourcecost + ')'
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
    // magic
    canvasTextAutoLine('内力:' + this.playerA.magicnow + '/' + this.playerA.magicmax, canvas, tx, y, 20)
    canvasTextRight('内力:' + this.playerB.magicnow + '/' + this.playerB.magicmax, canvas, tx, y, 20)
    y += 20
    // source
    canvasTextAutoLine(this.playerA.getsourcename() + this.playerA.sourcenow + '/' + this.playerA.getsourcemax(), canvas, tx, y, 20)
    canvasTextRight(this.playerB.getsourcename() + this.playerB.sourcenow + '/' + this.playerB.getsourcemax(), canvas, tx, y, 20)
    y += 20
    // split
    canvasTextSplit(canvas, tx, y)
    y += 20
    // main word
    canvasTextCenter('战斗记录:', canvas, tx, y, tx)
    y += 20

    for (var i = 0; i < this.battledata.length; i++) {
      if (this.battledata[i] == "+Left") {
        y = canvasTextAutoLine("先手", canvas, tx, y, 20)
      } else
      if (this.battledata[i] == "Left+") {
        canvasTextRight("先手", canvas, tx, y, 20)
        y += 20
      } else
      if (this.battledata[i] == "Right+") {
        canvasTextSplit(canvas, tx, y)
        y += 20
        canvasTextRight("后手", canvas, tx, y, 20)
        y += 20
      } else
      if (this.battledata[i] == "+Right") {
        canvasTextSplit(canvas, tx, y)
        y += 20
        canvasTextAutoLine("后手", canvas, tx, y, 20)
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
      ctx.beginPath()
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