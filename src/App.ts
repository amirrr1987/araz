// import { h } from './araz'
import Header from "@/layouts/Header";
import Main from "@/layouts/Main";
import Footer from "@/layouts/Footer";

// const App :any = createElement('div', {
//     attrs: {
//         class: 'bg-red-500'
//     },
//     children: [
//         header:  createElement('header', {
//             attrs: {
//                 class: 'bg-red-500'
//             },
//             children: [
//                 Header,
//                 Main,
//                 Footer
//             ],
//             innerText: ' my content'
//         })
//         Main,
//         Footer
//     ],
//     innerText: ' my content'
// })

// نوع Props برای هر عنصر واکنش‌گرا
type ElementProps = {
  class?: string;
  onClick?: () => void;
};

// نوع عنصر واکنش‌گرا
type Element = string | VNode;

// نوع VNode (عنصر واکنش‌گرا مجاز)
type VNode = {
  type: string;
  props: ElementProps;
  children: Element[];
};

// تابع سازنده‌ی عنصر واکنش‌گرا
const  h = (tagName: string, { attrs = {}, children = [], innerText = '' } = {}) => {
  return {
      tagName,
      attrs,
      children,
      innerText
  };
};

const App = h("div", { attrs: { class: "bg-red-500", onClick: () => {}} , innerText: "hello"},);


export default App
