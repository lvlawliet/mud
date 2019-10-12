import Player     from './player/index'
import Enemy      from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import DataBus    from './databus'

let ctx  = canvas.getContext('2d')

/**
 * 游戏主函数
 */
export default class Main {
  constructor(e) {
    // init background color
    ctx.font = "14px Georgia";
    ctx.fillStyle = '#FFFFFF'
    this.playername = e.nickName
    this.bindLoop = this.loop.bind(this)
    this.x = 0
    this.y = 0
    window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
    this.battledata = ["战斗记录:\r\n"]
    this.skills = [
      { name: "剑一·破", x: 35, y: canvas.height - 120, damage: 1 },
      { name: "回鸿十字引", x: canvas.width / 2, y: canvas.height - 120, damage: 10 },
      { name: "八烟天剑吾为锋", x: 35, y: canvas.height - 60, damage: 20 },
      { name: "一式留神 ", x: canvas.width / 2, y: canvas.height - 60, damage: 35 }
                  ]
    this.initEvent()
  }

  initEvent(){
    wx.onTouchStart(((e) => {
      this.x = e.touches[0].clientX
      this.y = e.touches[0].clientY

    }).bind(this))
    wx.onTouchMove(((e) => {

      this.x = e.touches[0].clientX
      this.y = e.touches[0].clientY

    }).bind(this))

    wx.onTouchEnd(((e) => {
      console.log(this.x, this.y)
      /*
      this.battledata.push(this.x + " " + this.y)
      while (this.battledata.length > 14) {
        this.battledata.shift()
      }
      */
      this.checkskill(this.x, this.y)
    }).bind(this))
  }

  //check skill
  checkskill( x, y) {
    for (var i = 0; i < this.skills.length; i++) {
      let tmpx = this.skills[i].x
      let tmpy = this.skills[i].y
      if ( x > tmpx - 10 && x < tmpx + canvas.width / 2 - 45 && y > tmpy - 30 && y < tmpy + 30 ){
        this.battledata.push( this.playername + "的[" + this.skills[i].name + "]对木桩造成了" + this.skills[i].damage + "伤害")
        while (this.battledata.length > 14) {
          this.battledata.shift()
        }
        break;
      }
    }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillText(this.playername + "   对阵   木桩", 20, 70)
    for (var i = 0; i < this.battledata.length; i++) {
      ctx.fillText(this.battledata[i], 20, 90 + i * 20)
    }
    for (var i = 0; i < this.skills.length; i++) {
      ctx.fillText(this.skills[i].name, this.skills[i].x, this.skills[i].y)
    }
  }

  // 游戏逻辑更新主函数
  update() {
  }

  // 实现游戏帧循环
  loop() {

    this.update()
    this.render()

    window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
