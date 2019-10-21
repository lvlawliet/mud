let instance

export default class SceneManager {
  constructor() {
    if (instance)
      return instance
    instance = this
    this.scene = {}
  }

  // all scene
  stopallscene() {
    for (key in this.scene) {
      this.scene[key].stop()
    }
  }

  // ulogin scene
  addulogin(e){
    this.scene['ulogin'] = e
  }

  hasulogin(){
    return this.scene.hasOwnProperty('ulogin')
  }

  restartulogin() {
    this.scene['ulogin'].restart()
  }

  stopulogin() {
    this.scene['ulogin'].stop()
  }

  // createrole scene
  addcreaterole(e) {
    this.scene['createrole'] = e
  }

  hascreaterole() {
    return this.scene.hasOwnProperty('createrole')
  }

  restartcreaterole() {
    this.scene['createrole'].restart()
  }

  stopcreaterole() {
    this.scene['createrole'].stop()
  }

  // balltescene scene
  addballtescene(e) {
    this.scene['balltescene'] = e
  }

  hasballtescene() {
    return this.scene.hasOwnProperty('balltescene')
  }

  restartballtescene() {
    this.scene['balltescene'].restart()
  }

  stopballtescene() {
    this.scene['balltescene'].stop()
  }

  // main scene
  addmain(e) {
    this.scene['main'] = e
  }

  hasmain() {
    return this.scene.hasOwnProperty('main')
  }

  restartmain() {
    this.scene['main'].restart()
  }

  stopmain() {
    this.scene['main'].stop()
  }

}