/* @flow */
/**
 * ���⿪����������initMixin,initInternalComponent,resolveConstructorOptions
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

// ���ID
let uid = 0

// Component��������/types/options.d.ts���Զ���ģ���ͬ
export function initMixin (Vue: Class<Component>) {

  Vue.prototype._init = function (options?: Object) {
    // ����thisΪvm,���ں���ʹ��
    const vm: Component = this
    // a uid
    // ÿ����һ�������uid����һ��
    vm._uid = uid++

    let startTag, endTag

    /**
    * Istanbul �� JavaScript ����Ĵ��븲���ʹ���
    * ����ο���https://istanbul.js.org/
    */

    /* istanbul ignore if */
    /* ���д���� if ���飬�ڼ��㸲���ʵ�ʱ��ᱻ����*/
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      // window.performance.mark()
      mark(startTag)
    }

    // a flag to avoid this being observed
    // _isVueΪһ����ʶ���Ա��ڼ������ݱ仯ʱ������vm,��this
    vm._isVue = true
    // merge options
    // �ϲ�ѡ��
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      // �Ż��ڲ����ʵ����
      // ��Ϊ��̬ѡ��ϲ����൱���ģ�û��һ���ڲ����ѡ����Ҫ���⴦��
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
  // ����������Ϊ���ȶ�̬ö�ٿ�
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

// ����vm.constructor�ϵ�options
export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options

  // ���super���ڣ�������vue.extend��չ������
  if (Ctor.super) {
    // �ݹ飬���ظ����options
    const superOptions = resolveConstructorOptions(Ctor.super)
    // Vue���캯���ϵ�options,��directives,filters
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      // �������option�ı��ˣ���ô�Ѹ���options��ֵ����ǰ��superOptions
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      // ����Ƿ��к����޸Ļ򸽼ӵ�ѡ��
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      // ���»�������չѡ��
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
