# vue笔记

## <slot></slot>

index.vue

```html
//在index.vue中传入了参数
<custom>{{ val }}</custom>
```

components/custom.vue

```html
//在custom.vue中能够传进去
<p><slot></slot></p>
```

想要达到下图的效果
![](https://cdn.jsdelivr.net/gh/you-bowen/func_picgo/20200905092711.png)
就要在layout.vue中给q-item的to属性赋值，并且防止多个图标同时亮起，添加exact属性
![](https://cdn.jsdelivr.net/gh/you-bowen/func_picgo/20200905094651.png)

