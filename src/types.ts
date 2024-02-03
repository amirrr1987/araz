export interface Mount {
  $node: Element;
  $target: HTMLDivElement;
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
export type Children = VNode | string | VNode[] | string[];

export interface VNode {
  $tag: HTMLTags;
  $attrs?: Attrs;
  $children?: (VNode | string)[];
}

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
export type HTMLTags =
  | "a"
  | "abbr"
  | "address"
  | "area"
  | "article"
  | "aside"
  | "audio"
  | "b"
  | "base"
  | "bdi"
  | "bdo"
  | "blockquote"
  | "body"
  | "br"
  | "button"
  | "canvas"
  | "caption"
  | "cite"
  | "code"
  | "col"
  | "colgroup"
  | "data"
  | "datalist"
  | "dd"
  | "del"
  | "details"
  | "dfn"
  | "dialog"
  | "div"
  | "dl"
  | "dt"
  | "em"
  | "embed"
  | "fieldset"
  | "figcaption"
  | "figure"
  | "footer"
  | "form"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "head"
  | "header"
  | "hgroup"
  | "hr"
  | "html"
  | "i"
  | "iframe"
  | "img"
  | "input"
  | "ins"
  | "kbd"
  | "label"
  | "legend"
  | "li"
  | "link"
  | "main"
  | "map"
  | "mark"
  | "meta"
  | "meter"
  | "nav"
  | "noscript"
  | "object"
  | "ol"
  | "optgroup"
  | "option"
  | "output"
  | "p"
  | "param"
  | "picture"
  | "pre"
  | "progress"
  | "q"
  | "rp"
  | "rt"
  | "ruby"
  | "s"
  | "samp"
  | "section"
  | "select"
  | "small"
  | "source"
  | "span"
  | "strong"
  | "style"
  | "sub"
  | "summary"
  | "sup"
  | "table"
  | "tbody"
  | "td"
  | "template"
  | "textarea"
  | "tfoot"
  | "th"
  | "thead"
  | "time"
  | "title"
  | "tr"
  | "track"
  | "u"
  | "ul"
  | "var"
  | "video"
  | "wbr";
