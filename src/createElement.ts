import { Element } from './types';

import { forEach, isArray, startsWith, toLower } from "lodash-es";



const addEventAttribute = (
  element: HTMLElement,
  attributeName: string,
  attributeValue: any
) => {
  const eventName = toLower(attributeName.substring(2));
  element.addEventListener(eventName, attributeValue);
};

const addRegularAttribute = (
  element: HTMLElement,
  attributeName: string,
  attributeValue: any
) => {
  element.setAttribute(attributeName, attributeValue);
};

const addAttributes = <P extends { [key: string]: any }>(
  element: HTMLElement,
  props: P
) => {
  forEach(props, (value, prop) => {
    if (startsWith(prop, "on")) {
      addEventAttribute(element, prop, value);
    } else {
      addRegularAttribute(element, prop, value);
    }
  });
};

const appendNode = (parent: HTMLElement, node: Node) => {
  parent.appendChild(node);
};

const appendText = (parent: HTMLElement, text: string) => {
  parent.appendChild(document.createTextNode(text));
};


const addChildren = (
  element: HTMLElement,
  children: Node | string | (Node | string)[] | null
) => {
  if (children !== null && children !== undefined) {
    const childArray = isArray(children) ? children : [children];
    forEach(childArray, (child) => {
      if (child instanceof Node) {
        appendNode(element, child);
      } else {
        appendText(element, children.toString());
      }
    });
  }
};


const h = <P extends { [key: string]: any }>({
  name,
  props = {} as P,
  children = null,
  setup,
}: Element<P>): HTMLElement => {
  const element: HTMLElement = document.createElement(name);

  addAttributes(element, props);

  addChildren(element, children);

  const beforeOnMounted = (callback: () => void) => {
    window.addEventListener("DOMContentLoaded", () => {
      callback();
    });
  };

  const onMounted = (callback: () => void) => {
    window.addEventListener("load", () => {
      callback();
    });
  };

  if (setup) {
    setup({
      beforeOnMounted,
      onMounted,
    });
  }
  return element;
};

export default h;
