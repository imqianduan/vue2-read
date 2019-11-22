/**
 * Vue构造函数入口
 */

import { initMixin } from './init'
import { warn } from '../util/index'

function Vue(options){
  // 非生产环境，且this不是Vue实例
  if(process.env.NODE_ENV !=='production' && !(this instanceof Vue)){
    // warn方法只在开发环境中可用，生产环境表现为一个空操作（空函数）
    // 在'src\core\util\debug.js`中定义
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

  // 执行初始化
  // _init方法在'./init.js'文件中有定义
  // 组件每一次渲染，都会触发'_init'方法，如通过v-for循环子组件，每循环一次子组件，都会执行`_init`方法
  this._init(options);
}

this.initMixin(Vue)

export default Vue
