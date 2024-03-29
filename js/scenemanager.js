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

  restartballtescene(e) {
    this.scene['balltescene'].restart(e)
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

  // search scene
  addsearch(e) {
    this.scene['search'] = e
  }

  hassearch() {
    return this.scene.hasOwnProperty('search')
  }

  restartsearch(mapid, e = false) {
    this.scene['search'].restart(mapid, e)
  }

  stopsearch() {
    this.scene['search'].stop()
  }

  // limit scene
  addlimit(e) {
    this.scene['limit'] = e
  }

  haslimit() {
    return this.scene.hasOwnProperty('limit')
  }

  restartlimit(mapid, e = false) {
    this.scene['limit'].restart(mapid, e)
  }

  stoplimit() {
    this.scene['limit'].stop()
  }

  // limit_battle
  addlimitballtescene(e) {
    this.scene['limitballtescene'] = e
  }

  haslimitballtescene() {
    return this.scene.hasOwnProperty('limitballtescene')
  }

  restartlimitballtescene(e) {
    this.scene['limitballtescene'].restart(e)
  }

  stoplimitballtescene() {
    this.scene['limitballtescene'].stop()
  }
}