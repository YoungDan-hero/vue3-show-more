# Vue Show More

一个轻量级的 Vue 3 组件，用于处理多行文本的展开/收起功能。

## 特性

- 🎯 支持自定义展开行数
- 🎨 支持通过插槽自定义展开/收起按钮
- 📱 响应式设计，支持移动端
- ⚡ 零依赖，轻量级
- 💪 使用 Vue 3 + TypeScript 开发，提供完整类型支持
- 🎈 灵活的按钮位置：支持内联和底部两种样式

## 安装

```bash
npm install @kiko-yd/vue-show-more
# 或
yarn add @kiko-yd/vue-show-more
```

## 使用方法

### 基础用法

```vue
<template>
  <ShowMore
    :max-lines="3"
    expand-text="展开"
    collapse-text="收起"
    @expand="onExpand"
  >
    这是一段很长的文本...
  </ShowMore>
</template>

<script setup lang="ts">
import { ShowMore } from "vue-show-more";
</script>
```

### 内联按钮样式

```vue
<template>
  <ShowMore
    :max-lines="3"
    action-position="inline"
    expand-text="展开"
    collapse-text="收起"
  >
    <p style="font-size: 18px">这是一段很长的文本...</p>
  </ShowMore>
</template>
```

### 自定义展开/收起按钮

```vue
<template>
  <ShowMore :max-lines="3">
    <div style="font-size: 16px">这是一段很长的文本...</div>
    <template #action="{ isExpanded }">
      <button class="custom-button">
        {{ isExpanded ? "收起" : "查看更多" }}
        <icon-arrow :direction="isExpanded ? 'up' : 'down'" />
      </button>
    </template>
  </ShowMore>
</template>
```

## Props

| 属性              | 类型                 | 默认值   | 描述                                                                              |
| ----------------- | -------------------- | -------- | --------------------------------------------------------------------------------- |
| maxLines          | number               | 3        | 收起状态下显示的最大行数                                                          |
| expandText        | string               | "展开"   | 展开按钮的文本                                                                    |
| collapseText      | string               | "收起"   | 收起按钮的文本                                                                    |
| class             | string               | -        | 自定义样式类名                                                                    |
| expandButtonClass | string               | -        | 展开按钮的自定义样式类名                                                          |
| actionPosition    | 'inline' \| 'bottom' | 'bottom' | 展开/收起按钮的位置。'inline' 表示按钮跟随在文本末尾，'bottom' 表示按钮在新行显示 |

## 插槽

### default

默认插槽，用于传入需要展开/收起的内容。默认按钮会自动继承该内容的字体样式。

### action

自定义展开/收起按钮的内容和样式

#### 作用域参数

| 参数名       | 类型    | 说明         |
| ------------ | ------- | ------------ |
| isExpanded   | boolean | 当前是否展开 |
| expandText   | string  | 展开按钮文本 |
| collapseText | string  | 收起按钮文本 |

## 事件

| 事件名 | 参数                | 描述                    |
| ------ | ------------------- | ----------------------- |
| expand | isExpanded: boolean | 展开/收起状态改变时触发 |

## License

MIT
