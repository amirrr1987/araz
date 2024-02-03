export interface Mount {
  $node: Element;
  $target: HTMLElement;
}

export interface Attrs {
  style?: Partial<CSSStyleDeclaration> | string;
  class?: string | string[];
  events?: Partial<GlobalEventHandlers>;
  [key: string]:
    | string
    | number
    | boolean
    | Partial<CSSStyleDeclaration>
    | Partial<GlobalEventHandlers>
    | string[]
    | undefined;
}
export type Children = string | string[] | Element | Element[];
export type Tag = string;
export interface VNode {
  tag: Tag;
  attrs: Attrs;
  children: Children;
}
export type ElementFunction = (
  $tag: Tag,
  $attrs?: Attrs,
  $children?: Children
) => Element;

export interface Route {
  path: string;
  component: VNode;
  name: string;
}
export type Ref<T> = {
  value: T;
};
export type ReactiveObject<T> = {
  [key: string]: T;
};

export type Reactive<T> = {
  [K in keyof T]: T[K];
};
