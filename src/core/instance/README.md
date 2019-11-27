# ./core/instance

```
.
|-- events.js
|-- index.js
|-- init.js
|-- inject.js
|-- lifecycle.js
|-- proxy.js
|-- render-helpers
|   |-- bind-dynamic-keys.js
|   |-- bind-object-listeners.js
|   |-- bind-object-props.js
|   |-- check-keycodes.js
|   |-- index.js
|   |-- render-list.js
|   |-- render-slot.js
|   |-- render-static.js
|   |-- resolve-filter.js
|   |-- resolve-scoped-slots.js
|   `-- resolve-slots.js
|-- render.js
`-- state.js
```
## index.js

- 定义了`Vue`的构造函数入口，供`new`关键字使用

- 执行了`init`初始化

- 执行了`state`状态初始化

- 执行了`render`渲染初始化

- 执行了`events`事件初始化

- 执行了`lifecycle`生命周期初始化






