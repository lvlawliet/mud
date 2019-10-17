import './js/libs/weapp-adapter'
import './js/libs/symbol'
import SceneManager from './js/scenemanager'

import Ulogin from './js/ulogin'
//new Ulogin()
let scenemanager = new SceneManager()

if (scenemanager.hasulogin()) {
  scenemanager.restartulogin()
} else {
  var p = new Ulogin()
  scenemanager.addulogin(p)
}