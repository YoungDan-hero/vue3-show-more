interface Props {
    maxLines?: number;
    expandText?: string;
    collapseText?: string;
    class?: string;
    expandButtonClass?: string;
    actionPosition?: "inline" | "bottom";
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        action?(_: {
            isExpanded: false;
            expandText: string;
            collapseText: string;
        }): any;
        action?(_: {
            isExpanded: boolean;
            expandText: string;
            collapseText: string;
        }): any;
    };
    refs: {
        contentRef: HTMLDivElement;
        innerContentRef: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../node_modules/vue').DefineComponent<Props, {}, {}, {}, {}, import('../../node_modules/vue').ComponentOptionsMixin, import('../../node_modules/vue').ComponentOptionsMixin, {} & {
    expand: (value: boolean) => any;
}, string, import('../../node_modules/vue').PublicProps, Readonly<Props> & Readonly<{
    onExpand?: ((value: boolean) => any) | undefined;
}>, {
    maxLines: number;
    expandText: string;
    collapseText: string;
    class: string;
    expandButtonClass: string;
    actionPosition: "inline" | "bottom";
}, {}, {}, {}, string, import('../../node_modules/vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
