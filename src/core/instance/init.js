/* @flow */
/**
 * 对外开放三个方法initMixin,initInternalComponent,resolveConstructorOptions
 */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

// 组件ID
let uid = 0

// Component类型是在/types/options.d.ts里自定义的，下同
export function initMixin (Vue: Class<Component>) {

  Vue.prototype._init = function (options?: Object) {
    // 保存this为vm,便于后面使用
    const vm: Component = this
    // a uid
    // 每更新一次组件，uid自增一次
    vm._uid = uid++

    let startTag, endTag

    /**
    * Istanbul 是 JavaScript 程序的代码覆盖率工具
    * 具体参考：https://istanbul.js.org/
    */

    /* istanbul ignore if */
    /* 下行代码的 if 语句块，在计算覆盖率的时候会被忽略*/
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      // window.performance.mark()
      mark(startTag)
    }

    // a flag to avoid this being observed
    // _isVue为一个标识，以便在监听数据变化时，忽略vm,即this
    vm._isVue = true
    // merge options
    // 合并选项
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      // 优化内部组件实例化
      // 因为动态选项合并是相当慢的，没有一个内部组件选项需要特殊处理。
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  // 这样做是因为它比动态枚举快
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

// 处理vm.constructor上的options
export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options

  // 如果super存在，表明是vue.extend扩展的子类
  if (Ctor.super) {
    // 递归，返回父类的options
    const superOptions = resolveConstructorOptions(Ctor.super)
    // Vue构造函数上的options,如directives,filters
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      // 如果父级option改变了，那么把父级options赋值给当前的superOptions
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      // 检查是否有后期修改或附加的选项
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      // 更新基本的扩展选项
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}
