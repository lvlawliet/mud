## quickstart

## 源码目录介绍
```
./js
├── template                               // 各种模板数据
│   ├── ai                                 // ai数据
│   │  ├── ai_tempalte.js                  // ai的基类
│   │  └── ai_XXX.js                       // 各类ai的具体实现
│   ├── buff                               // buff数据
│   │  ├── buff_tempalte.js                // buff的基类
│   │  └── buff_XXX.js                     // 各类buff的具体实现
│   ├── skill                              // skill数据
│   │  ├── skill_tempalte.js               // skill的基类
│   │  └── skill_XXX.js                    // 各类skill的具体实现
│   ├── airegister.js                      // 注册ai实例
│   ├── buffregister.js                    // 注册buff实例
│   ├── skillregister.js                   // 注册skill实例
│   ├── databus.js                         // 玩家的db数据
│   ├── skillbus.js                        // skill和buff的模板数据
│   └── template.js                        // 模板数据
├── util
│   └── utilf.js                           // 全局函数
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```