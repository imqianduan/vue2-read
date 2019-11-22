// 定义某个SSR渲染部分的属性
// 如果某个DIV设置data-server-rendered属性为'true'，表示这一部分的内容由服务器端渲染完成
// 具体可参考：https://ssr.vuejs.org/zh/guide/hydration.html

export const SSR_ATTR = 'data-server-rendered'

// ASSET TYPES在后续使用时，会用到很多forEach循环
export const ASSET_TYPES = [
  // 组件
  'component',
  // 指令
  'directive',
  // 过滤器
  'filter'
]

// 生命周期钩子函数名称定义
// 具体参考：https://cn.vuejs.org/v2/api/#beforeCreate
export const LIFECYCLE_HOOKS = [
  // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
  'beforeCreate',

  // 在实例创建完成后被立即调用
  'created',

  // 在挂载开始之前被调用：相关的 render 函数首次被调用。SSR时，不生效
  'beforeMount',

  // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。注意 mounted 不会承诺所有的子组件也都一起被挂载，如果要等待整个视图渲染完毕，可以使用vm.$nextTick
  'mounted',

  // 数据更新之前调用
  'beforeUpdate',

  // 数据更新之后调用
  'updated',

  // 实例销毁之前调用
  'beforeDestroy',
  // 实例销毁之后调用
  'destroyed',
  // keep-alive 组件激活时调用
  'activated',
  // keep-alive 组件停用时调用
  'deactivated',
  // 当捕获一个来自子孙组件的错误时被调用
  'errorCaptured',
  // 2.6.0新增，允许服务器端渲染时，通过`serverPrefetch`预先进行数据获取。返回一个promise
  'serverPrefetch'
]
