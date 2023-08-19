// // types.ts
// export type EventHandler = (event: Event) => void;

// export interface CustomGlobalEventHandlers extends GlobalEventHandlers {
//   onabort: EventHandler;
// }

// export type StateUpdater<T> = (newValue: T) => void;

// export type ElementAttributes = {
//   style?: Partial<CSSStyleDeclaration>;
//   classList?: string[];
//   events?: { [key: string]: EventHandler }; // Change the type here
//   [key: string]: any;
// };

// export type Children = Array<string | Element>;
// export enum HTML {
//   Div = "div",
//   Anchor = "a",
//   Paragraph = "p",
//   Heading1 = "h1",
//   Heading2 = "h2",
//   Heading3 = "h3",
//   Heading4 = "h4",
//   Heading5 = "h5",
//   Heading6 = "h6",
//   Image = "img",
//   UnorderedList = "ul",
//   OrderedList = "ol",
//   ListItem = "li",
//   Table = "table",
//   TableRow = "tr",
//   TableCell = "td",
//   TableHeaderCell = "th",
//   TableHead = "thead",
//   TableBody = "tbody",
//   TableFoot = "tfoot",
//   Form = "form",
//   Input = "input",
//   TextArea = "textarea",
//   Button = "button",
//   Select = "select",
//   Option = "option",
//   Label = "label",
//   Fieldset = "fieldset",
//   Legend = "legend",
//   LineBreak = "br",
//   HorizontalRule = "hr",
//   Iframe = "iframe",
//   Audio = "audio",
//   Video = "video",
//   Canvas = "canvas",
//   SVG = "svg",
//   Header = "header",
//   Footer = "footer",
//   Navigation = "nav",
//   Main = "main",
//   Article = "article",
//   Section = "section",
//   Aside = "aside",
//   Time = "time",
//   Mark = "mark",
//   BlockQuote = "blockquote",


 
// }
// export type ElementCreator = {
//   tag: HTML;
//   attrs?: ElementAttributes;
//   children?: Children;
// };
type HTMLTags = 'a' | 'abbr' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 'b' |
    'base' | 'bdi' | 'bdo' | 'blockquote' | 'body' | 'br' | 'button' | 'canvas' | 'caption' |
    'cite' | 'code' | 'col' | 'colgroup' | 'data' | 'datalist' | 'dd' | 'del' | 'details' |
    'dfn' | 'dialog' | 'div' | 'dl' | 'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' |
    'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' |
    'hgroup' | 'hr' | 'html' | 'i' | 'iframe' | 'img' | 'input' | 'ins' | 'kbd' | 'label' |
    'legend' | 'li' | 'link' | 'main' | 'map' | 'mark' | 'meta' | 'meter' | 'nav' | 'noscript' |
    'object' | 'ol' | 'optgroup' | 'option' | 'output' | 'p' | 'param' | 'picture' | 'pre' |
    'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'section' | 'select' |
    'small' | 'source' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'table' |
    'tbody' | 'td' | 'template' | 'textarea' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' |
    'tr' | 'track' | 'u' | 'ul' | 'var' | 'video' | 'wbr';


export interface VNode {
  $tag: HTMLTags;
  $attrs?: Record<string , string | number | boolean>;
  $children?: (VNode | string)[];
}
export interface Mount{
  $node: HTMLElement;
  $target: HTMLElement
}