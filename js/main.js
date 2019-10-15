import Player from './player/index'
import Enemy from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './template/databus'
import SkillBus from './template/skillbus'
import CreateRole from './createrole'
import actorimp from './actorimp'
import template from './template/template'

import {
  canvasTextAutoLine,
  canvasTextRight,
  canvasTextCenter
} from './util/utilf'

let ctx = canvas.getContext('2d')
let usedata = new DataBus()
let skilldata = new SkillBus()
let tx = canvas.width * 1 / 12
let tempman = new template()

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
    this.battledata = []
    this.skillspos = [{
        x: canvas.width * 1 / 12,
        y: canvas.height - 120
      },
      {
        x: canvas.width / 2 + canvas.width * 1 / 12,
        y: canvas.height - 120
      },
      {
        x: canvas.width * 1 / 12,
        y: canvas.height - 60
      },
      {
        x: canvas.width / 2 + canvas.width * 1 / 12,
        y: canvas.height - 60
      }
    ]
    this.initEvent()
    this.playerA = new actorimp(0, usedata)
    this.playerB = new actorimp(1, tempman.npc[0])
    this.result = 0
    this.stop = false
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
    if (this.stop == false) {
      if (this.result == 0) {
        for (var i = 0; i < usedata.activeskills.length; i++) {
          let tmpx = this.skillspos[i].x
          let tmpy = this.skillspos[i].y
          if (x > tmpx - 10 && x < tmpx + canvas.width / 2 - 45 && y > tmpy - 30 && y < tmpy + 30) {
            /*
            this.battledata.push( this.playername + "的[" + this.skills[i].name + "]对木桩造成了" + this.skills[i].damage + "伤害")
            while (this.battledata.length > 14) {
              this.battledata.shift()
            }*/
            //this.battledata.push(skilldata.work(usedata.activeskills[i].id, this.playerA, '木桩'))
            this.battledata = []
            var tmpd = skilldata.work(usedata.activeskills[i].id, this.playerA, this.playerB)
            for (var k = 0; k < tmpd.length; k++) {
              this.battledata.push(tmpd[k])
            }

            // checkalive
            var tmpa = skilldata.checkalive(this.playerA, this.playerB)
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

            var tmpd = skilldata.endround(this.playerA, this.playerB)
            for (var k = 0; k < tmpd.length; k++) {
              this.battledata.push(tmpd[k])
            }
            /*
            while (this.battledata.length > 14) {
              this.battledata.shift()
            }
            */
            break;
          }
        }
      } else {
        this.stop = true
        var res = {
          nickName: this.playerA.name
        }
        new CreateRole(res)
        delete this
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

    // main word
    canvasTextAutoLine('战斗记录:', canvas, tx, y, tx)
    y += 20

    for (var i = 0; i < this.battledata.length; i++) {
      //ctx.fillText(this.battledata[i], tx, 90 + i * 20)
      y = canvasTextAutoLine(this.battledata[i], canvas, tx, y, 20)
    }
    /*
    for (var i = 0; i < this.skills.length; i++) {
      ctx.fillText(this.skills[i].name, this.skills[i].x, this.skills[i].y)
    }
    */
    for (var i = 0; i < usedata.activeskills.length; i++) {
      ctx.fillText(usedata.activeskills[i].name, this.skillspos[i].x, this.skillspos[i].y)
    }
  }

  // 游戏逻辑更新主函数
  update() {}

  // 实现游戏帧循环
  loop() {
    if (this.stop == false) {
      this.update()
      this.render()

      window.requestAnimationFrame(
        this.bindLoop,
        canvas
      )
    }
  }
}