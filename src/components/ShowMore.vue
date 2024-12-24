<template>
  <div class="vue-show-more" :class="customClass">
    <!-- Text container -->
    <div
      ref="contentRef"
      class="vue-show-more__content"
      :class="{
        'vue-show-more__content--expanded': isExpanded,
        'vue-show-more__content--inline':
          actionPosition === 'inline' && !isExpanded,
      }"
      :style="contentStyle"
    >
      <div ref="innerContentRef">
        <slot></slot>
      </div>
    </div>

    <!-- Inline button with gradient mask -->
    <div
      v-if="showButton && actionPosition === 'inline' && !isExpanded"
      class="vue-show-more__mask"
      @click.stop="toggleExpand"
    >
      <slot
        name="action"
        :is-expanded="isExpanded"
        :expand-text="expandText"
        :collapse-text="collapseText"
      >
        <span class="vue-show-more__text">{{ expandText }}</span>
      </slot>
    </div>

    <!-- Bottom action button -->
    <span
      v-if="showButton && (actionPosition === 'bottom' || isExpanded)"
      class="vue-show-more__action-bottom"
      @click.stop="toggleExpand"
    >
      <slot
        name="action"
        :is-expanded="isExpanded"
        :expand-text="expandText"
        :collapse-text="collapseText"
      >
        <span class="vue-show-more__text">
          {{ isExpanded ? collapseText : expandText }}
        </span>
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted, computed } from "vue";

interface Props {
  maxLines?: number;
  expandText?: string;
  collapseText?: string;
  class?: string;
  expandButtonClass?: string;
  actionPosition?: "inline" | "bottom";
}

const props = withDefaults(defineProps<Props>(), {
  maxLines: 3,
  expandText: "展开",
  collapseText: "收起",
  class: "",
  expandButtonClass: "",
  actionPosition: "bottom",
});

const customClass = computed(() => props.class);

// Compute content styles
const contentStyle = computed(() => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
  WebkitLineClamp: isExpanded.value ? undefined : props.maxLines,
}));

const emit = defineEmits<{
  (e: "expand", value: boolean): void;
}>();

const isExpanded = ref(false);
const showButton = ref(false);
const contentRef = ref<HTMLElement | null>(null);
const innerContentRef = ref<HTMLElement | null>(null);

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
  emit("expand", isExpanded.value);
};

const checkOverflow = () => {
  if (!contentRef.value || !innerContentRef.value) return;
  const container = contentRef.value;
  const content = innerContentRef.value;

  // Save original styles
  const containerOriginalStyle = container.style.cssText;
  const contentOriginalStyle = content.style.cssText;

  // Create a clone element to measure clamped height
  const clone = content.cloneNode(true) as HTMLElement;
  clone.style.cssText = `
    position: absolute;
    visibility: hidden;
    width: ${content.offsetWidth}px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props.maxLines};
    overflow: hidden;
  `;
  document.body.appendChild(clone);
  const clampedHeight = clone.offsetHeight;
  document.body.removeChild(clone);

  // Remove all restrictions to get actual height
  container.style.cssText =
    "display: block !important; overflow: visible !important; -webkit-line-clamp: none !important;";
  content.style.cssText = "";
  const actualHeight = content.offsetHeight;

  // Restore original styles
  container.style.cssText = containerOriginalStyle;
  content.style.cssText = contentOriginalStyle;

  // Update button visibility state
  const needsExpansion = actualHeight > clampedHeight;
  if (showButton.value !== needsExpansion) {
    showButton.value = needsExpansion;
    // Reset expanded state if content doesn't need expansion
    if (!needsExpansion && isExpanded.value) {
      isExpanded.value = false;
    }
  }
};

// Watch for content changes
const observer = new MutationObserver(() => {
  nextTick(() => {
    checkOverflow();
  });
});

onMounted(() => {
  checkOverflow();
  window.addEventListener("resize", checkOverflow);

  // Observe content changes
  if (innerContentRef.value) {
    observer.observe(innerContentRef.value, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", checkOverflow);
  observer.disconnect();
});
</script>

<style scoped>
.vue-show-more {
  position: relative;
}

.vue-show-more__content {
  position: relative;
}

.vue-show-more__mask {
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  background: linear-gradient(to right, transparent, white 3em);
  padding-left: 3em;
}

.vue-show-more__text {
  position: relative;
  z-index: 2;
  display: inline-block;
  color: #2196f3;
  background: white;
  font: inherit;
}

.vue-show-more__text:hover {
  color: #1976d2;
}

.vue-show-more__action-bottom {
  cursor: pointer;
}
</style>
