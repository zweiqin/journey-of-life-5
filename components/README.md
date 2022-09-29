# Components Description

*本项目及其组件均是通过`团蜂家居`直接复制而来，组件中凡是以`J`开头的组件系为`巨蜂商城`自有组件, 团蜂家居遗留问题很多注意使用*

## 组件规范

所有组件以`J[ComponentName]`名称命名，如`JNavs`

```js
components
    | ------ J[ComponentName]
    |               | ---------- J[ComponentName].vue
```

这样的好处是`uniapp`会自动全局注册该组件，就不用`import` 注册了

## 单个组件

最好有README文档

