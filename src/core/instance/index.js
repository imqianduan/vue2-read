/**
 * VUE构造函数入口
 */


import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

/**
 * @param {*} options  new Vue时传入的参数
 */
function Vue (options) {
  // 不是生产环境，且this不是Vue的实例，则抛出错误
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

  console.log('1、初始化Vue实例')
  console.log('this:')
  console.log(this);
  console.log(this._init);
  // 初始化
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
