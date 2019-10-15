import CreateRole from './createrole'
import BackGround from './runtime/background'
import DataBus from './databus'

let ctx = canvas.getContext('2d')
let stop = false
let usedata = new DataBus()

export default class Ulogin {
  
  constructor(){
    usedata.setdata()
    this.bindLoop = this.loop.bind(this)
    window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
  
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  update(){
  }

  loop() {
    if (stop == false) {
      this.update()
      this.render()
      window.requestAnimationFrame(
        this.bindLoop,
        canvas
      )
    }
  }
}

let button = wx.createUserInfoButton({
  type: 'text',
  text: '开始游戏',
  style: {
    left: 10,
    top: 76,
    width: 150,
    height: 40,
    lineHeight: 40,
    backgroundColor: '#ff0000',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 10
  }
});

button.onTap(function (res) {
  if (res.errMsg == "getUserInfo:ok") {
    button.hide()
    stop = true
    new CreateRole(res.userInfo)
  }
  else {
    wx.showModal({
      title: "授权用户信息方可登录\r\n放心\r\n我们不会把用户信息挪作他用~",
      showCancel: false
    })
  }
});
