// types.ts
export type ElementAttributes = {
  style?: Partial<CSSStyleDeclaration>;
  classList?: string[];
  [key: string]: any;
};

export  type EventHandler = (event: Event) => void;

export type Children = Array<string | Element>;

export type ElementCreator = {
  tag: string;
  attrs?: ElementAttributes;
  children?: Children;
};