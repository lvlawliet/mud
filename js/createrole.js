import Main from './main'
import DataBus from './template/databus'
import SkillBus from './template/skillbus'

import { canvasTextAutoLine } from './util/utilf'

let ctx = canvas.getContext('2d')
let usedata = new DataBus()
let skilldata = new SkillBus()
let tx = canvas.width * 1 / 12


export default class CreateRole {
//class CreateRole {
  constructor(e) {
    // evn
    ctx.font = "14px Georgia";
    ctx.fillStyle = '#FFFFFF'
    this.page = 0

    // player init
    usedata.setdata('name', e.nickName)
    this.tmppro = usedata.initpro();

    this.bindLoop = this.loop.bind(this)
    window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
    this.stop = false
    this.initEvent()
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (this.page==0) {
      this.drawpage1()
    } else if (this.page==1) {
      this.drawpage2()
    }
  }

  checkpoint(x, y) {
    console.log("123")
    if (this.page==0) {
      this.checkpage1(x,y)
    } else if (this.page == 1) {
      this.checkpage2(x, y)
    }
  }
  
  checkpage1(x, y) {
    var tmpx = canvas.width / 4 - canvas.width / 15
    var tmpy = canvas.height - 60
    if (x > tmpx - 10 && x < tmpx + canvas.width / 2 - 45 && y > tmpy - 30 && y < tmpy + 30) {
      this.tmppro = usedata.initpro();
    }
    tmpx = canvas.width * 3 / 4 - canvas.width / 15
    tmpy = canvas.height - 60
    if (x > tmpx - 10 && x < tmpx + canvas.width / 2 - 45 && y > tmpy - 30 && y < tmpy + 30) {
      usedata.savepro(this.tmppro)
      this.page++
    }
  }

  checkpage2(x, y) {
    var flag = false
    var tmpx = canvas.width / 4 - canvas.width / 15
    var tmpy = canvas.height - 60
    if (x > tmpx - 10 && x < tmpx + canvas.width / 2 - 45 && y > tmpy - 30 && y < tmpy + 30) {
      usedata.savejob(0)
      usedata.saveskill([1, 2, 3, 4, 5])
      flag = true
    }
    tmpx = canvas.width * 3 / 4 - canvas.width / 15
    tmpy = canvas.height - 60
    if (x > tmpx - 10 && x < tmpx + canvas.width / 2 - 45 && y > tmpy - 30 && y < tmpy + 30) {
      usedata.savejob(1)
      usedata.saveskill([101, 102, 103, 104, 105])
      flag = true
    }
    if (flag == true) {
      this.stop = true
      this.page++
      new Main()
      delete this
    }
  }

  drawpage1() {
    var i = 0;
    ctx.fillText(usedata.getdata('name'), tx, 70)
    for (var key in usedata.property) {
      var tmp = usedata.datatostring(key)
      ctx.fillText(tmp.name + ':' + this.tmppro[i], tx, 90 + (2 * i + 1) * 20)
      ctx.fillText(tmp.des, tx, 90 + 2 * ( i + 1 ) * 20)
      i++
    }
    ctx.fillText('重置', canvas.width / 4 - canvas.width/ 15, canvas.height - 60)
    ctx.fillText('确定', canvas.width * 3 / 4 - canvas.width / 15, canvas.height - 60)
  }

  drawpage2() {
    var l = 0
    var y = 70
    y = canvasTextAutoLine('职业技能介绍：', canvas, tx, y, 20)
    y = canvasTextAutoLine('刀：', canvas, tx, y, 20)
    var daoskills = [1, 2, 3, 4, 5]
    for (var i = 0; i < daoskills.length; i++) {
      var tmp = skilldata.skills[daoskills[i]]
      y = canvasTextAutoLine('[' + tmp.name + ']', canvas, tx, y, 20)
      y = canvasTextAutoLine(tmp.des, canvas, tx, y, 20)
    }
    y = canvasTextAutoLine('-----------------------------', canvas, tx, y, 20)
    y = canvasTextAutoLine('剑：', canvas, tx, y, 20)
    var daoskills = [101, 102, 103, 104, 105]
    for (var i = 0; i < daoskills.length; i++) {
      var tmp = skilldata.skills[daoskills[i]]
      y = canvasTextAutoLine('[' + tmp.name + ']', canvas, tx, y, 20)
      y = canvasTextAutoLine(tmp.des, canvas, tx, y, 20)
    }
    ctx.fillText('刀', canvas.width / 4 - canvas.width / 15, canvas.height - 60)
    ctx.fillText('剑', canvas.width * 3 / 4 - canvas.width / 15, canvas.height - 60)
  }

  update() {
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
      this.checkpoint(this.x, this.y)
    }).bind(this))
  }

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