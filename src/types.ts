// types.ts
export type ElementAttributes = {
  style?: Partial<CSSStyleDeclaration>;
  classList?: string[];
  [key: string]: any;
};

export  type EventHandler = (event: Event) => void;

export type Children = Array<string | Element>;
export enum HTML {
  Div = 'div',
  Anchor = 'a',
  Paragraph = 'p',
  Heading1 = 'h1',
  Heading2 = 'h2',
  Heading3 = 'h3',
  Heading4 = 'h4',
  Heading5 = 'h5',
  Heading6 = 'h6',
  Image = 'img',
  UnorderedList = 'ul',
  OrderedList = 'ol',
  ListItem = 'li',
  Table = 'table',
  TableRow = 'tr',
  TableCell = 'td',
  TableHeaderCell = 'th',
  TableHead = 'thead',
  TableBody = 'tbody',
  TableFoot = 'tfoot',
  Form = 'form',
  Input = 'input',
  TextArea = 'textarea',
  Button = 'button',
  Select = 'select',
  Option = 'option',
  Label = 'label',
  Fieldset = 'fieldset',
  Legend = 'legend',
  LineBreak = 'br',
  HorizontalRule = 'hr',
  Iframe = 'iframe',
  Audio = 'audio',
  Video = 'video',
  Canvas = 'canvas',
  SVG = 'svg',
  Header = 'header',
  Footer = 'footer',
  Navigation = 'nav',
  Main = 'main',
  Article = 'article',
  Section = 'section',
  Aside = 'aside',
  Time = 'time',
  Mark = 'mark',
  BlockQuote = 'blockquote'
}
export type ElementCreator = {
  tag: HTML;
  attrs?: ElementAttributes;
  children?: Children;
};

