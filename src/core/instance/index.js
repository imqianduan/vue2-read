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
    // warn方法只在开发环境中可用，生产环境表现为一个空操作（空函数）
    // 在'src\core\util\debug.js`中定义
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

  // 执行初始化
  // _init方法在'/core/instance/init.js'文件中有定义
  // 组件每一次渲染，都会触发'_init'方法，如通过v-for循环子组件，每循环一次子组件，都会执行`_init`方法
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
