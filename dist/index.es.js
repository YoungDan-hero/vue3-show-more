import { defineComponent, computed, ref, nextTick, onMounted, onUnmounted, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, renderSlot, withModifiers, toDisplayString, createCommentVNode } from "vue";
const _hoisted_1 = { class: "vue-show-more__text" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ShowMore",
  props: {
    maxLines: { default: 3 },
    expandText: { default: "展开" },
    collapseText: { default: "收起" },
    class: { default: "" },
    expandButtonClass: { default: "" },
    actionPosition: { default: "bottom" },
    maskBackground: { default: "white" }
  },
  emits: ["expand"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const customClass = computed(() => props.class);
    const contentStyle = computed(() => ({
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      WebkitLineClamp: isExpanded.value ? void 0 : props.maxLines
    }));
    const emit = __emit;
    const isExpanded = ref(false);
    const showButton = ref(false);
    const contentRef = ref(null);
    const innerContentRef = ref(null);
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
      emit("expand", isExpanded.value);
    };
    const checkOverflow = () => {
      if (!contentRef.value || !innerContentRef.value)
        return;
      const container = contentRef.value;
      const content = innerContentRef.value;
      const containerOriginalStyle = container.style.cssText;
      const contentOriginalStyle = content.style.cssText;
      const clone = content.cloneNode(true);
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
      container.style.cssText = "display: block !important; overflow: visible !important; -webkit-line-clamp: none !important;";
      content.style.cssText = "";
      const actualHeight = content.offsetHeight;
      container.style.cssText = containerOriginalStyle;
      content.style.cssText = contentOriginalStyle;
      const needsExpansion = actualHeight > clampedHeight;
      if (showButton.value !== needsExpansion) {
        showButton.value = needsExpansion;
        if (!needsExpansion && isExpanded.value) {
          isExpanded.value = false;
        }
      }
    };
    const observer = new MutationObserver(() => {
      nextTick(() => {
        checkOverflow();
      });
    });
    onMounted(() => {
      checkOverflow();
      window.addEventListener("resize", checkOverflow);
      if (innerContentRef.value) {
        observer.observe(innerContentRef.value, {
          childList: true,
          subtree: true,
          characterData: true
        });
      }
    });
    onUnmounted(() => {
      window.removeEventListener("resize", checkOverflow);
      observer.disconnect();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["vue-show-more", customClass.value])
      }, [
        createElementVNode("div", {
          ref_key: "contentRef",
          ref: contentRef,
          class: normalizeClass(["vue-show-more__content", {
            "vue-show-more__content--expanded": isExpanded.value,
            "vue-show-more__content--inline": _ctx.actionPosition === "inline" && !isExpanded.value
          }]),
          style: normalizeStyle(contentStyle.value)
        }, [
          createElementVNode("div", {
            ref_key: "innerContentRef",
            ref: innerContentRef
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 512)
        ], 6),
        showButton.value && _ctx.actionPosition === "inline" && !isExpanded.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "vue-show-more__mask",
          style: normalizeStyle({
            background: `linear-gradient(to right, transparent, ${_ctx.maskBackground} 3em)`
          }),
          onClick: withModifiers(toggleExpand, ["stop"])
        }, [
          renderSlot(_ctx.$slots, "action", {
            isExpanded: isExpanded.value,
            expandText: _ctx.expandText,
            collapseText: _ctx.collapseText
          }, () => [
            createElementVNode("span", {
              class: "vue-show-more__text",
              style: normalizeStyle({ background: _ctx.maskBackground })
            }, toDisplayString(_ctx.expandText), 5)
          ], true)
        ], 4)) : createCommentVNode("", true),
        showButton.value && (_ctx.actionPosition === "bottom" || isExpanded.value) ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "vue-show-more__action-bottom",
          onClick: withModifiers(toggleExpand, ["stop"])
        }, [
          renderSlot(_ctx.$slots, "action", {
            isExpanded: isExpanded.value,
            expandText: _ctx.expandText,
            collapseText: _ctx.collapseText
          }, () => [
            createElementVNode("span", _hoisted_1, toDisplayString(isExpanded.value ? _ctx.collapseText : _ctx.expandText), 1)
          ], true)
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const ShowMore_vue_vue_type_style_index_0_scoped_8e9cc5e6_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const ShowMore = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8e9cc5e6"]]);
const index = {
  install: (app) => {
    app.component("ShowMore", ShowMore);
  }
};
export {
  ShowMore,
  index as default
};
//# sourceMappingURL=index.es.js.map
