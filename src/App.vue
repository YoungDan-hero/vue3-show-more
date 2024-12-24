<template>
  <div class="container">
    <h1>Vue Show More 组件演示</h1>

    <div class="demo-section">
      <h2>基础用法</h2>
      <ShowMore
        :max-lines="3"
        expand-text="展开"
        collapse-text="收起"
        @expand="onExpand"
      >
        {{ longText }}
      </ShowMore>
    </div>

    <div class="demo-section">
      <h2>内联按钮样式</h2>
      <ShowMore
        :max-lines="3"
        action-position="inline"
        expand-text="展开"
        collapse-text="收起"
        @expand="onExpand"
      >
        <p style="font-size: 18px">{{ longText }}</p>
      </ShowMore>
    </div>

    <div class="demo-section">
      <h2>自定义按钮样式</h2>
      <ShowMore :max-lines="2" @expand="onExpand">
        <div style="font-size: 16px; line-height: 1.6">{{ longText }}</div>
        <template #action="{ isExpanded }">
          <button class="custom-button">
            <span v-if="!isExpanded">
              查看更多
              <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
                <path
                  d="M512 685.248l-278.624-278.624 45.248-45.248L512 594.752l233.376-233.376 45.248 45.248z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span v-else>
              收起内容
              <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
                <path
                  d="M512 338.752l-278.624 278.624 45.248 45.248L512 429.248l233.376 233.376 45.248-45.248z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>
        </template>
      </ShowMore>
    </div>

    <button @click="changeText">修改文本</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ShowMore from "./components/ShowMore.vue";
const longText = ref(
  "Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。这是一个渐进式框架，意味着它可以根据你的需求逐渐引入和使用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。"
);

const onExpand = (isExpanded: boolean) => {
  console.log("展开状态:", isExpanded);
};

// 修改文本为不展示的长度
const changeText = () => {
  longText.value = longText.value.slice(0, 100);
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.demo-section {
  margin: 40px 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

h1 {
  color: #2c3e50;
  text-align: center;
}

h2 {
  color: #42b983;
  margin-bottom: 20px;
}

.custom-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  padding: 6px 12px;
  color: #42b983;
  background: #f0faf5;
  border: 1px solid #42b983;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.custom-button:hover {
  background: #42b983;
  color: white;
}

.icon {
  transition: transform 0.2s ease;
}
</style>
