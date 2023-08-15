// createElement.ts
import { EventHandler, Children, ElementCreator, StateUpdater } from "./types";
export { HTML } from "./types";
import {
  forEach,
  isFunction,
  isString,
  isElement,
  includes,
  entries,
  camelCase,
  debounce,
  assign,
} from "lodash-es";

export const onMounted = (callback: () => void): void => {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};


export const useState = <T>(initialValue: T): [T, StateUpdater<T>] => {
  let state: T = initialValue;
  const listeners: Array<StateUpdater<T>> = [];

  const setState = (newValue: T): void => {
    state = newValue;
    forEach(listeners, listener => listener(state));
  };

  return [state, setState];
};


const applyStyles = (
  element: HTMLElement,
  styles: CSSStyleDeclaration
): void => {
  const style = element.style as CSSStyleDeclaration;
  assign(style, styles);
};

const addClassList = (element: HTMLElement, classList: string[]): void => {
  forEach(classList, (className) => {
    if (!includes(element.classList, className)) {
      element.classList.add(className);
    }
  });
};

const addEventListeners = (
  element: HTMLElement,
  events: { [key: string]: EventHandler }
): void => {
  forEach(entries(events), ([eventName, eventHandler]) => {
    const formattedEventName = camelCase(eventName.slice(2));
    if (isFunction(eventHandler)) {
      element.addEventListener(formattedEventName, eventHandler);
    }
  });
};

const appendChildren = (element: HTMLElement, children: Children): void => {
  forEach(children, (child) => {
    if (isString(child)) {
      element.appendChild(document.createTextNode(child));
    } else if (isElement(child)) {
      element.appendChild(child);
    }
  });
};

export const render = ({
  tag,
  attrs,
  children,
}: ElementCreator): HTMLElement => {
  const element = document.createElement(tag);

  if (attrs?.style) {
    applyStyles(element, <CSSStyleDeclaration>attrs?.style);
  }

  if (attrs?.classList) {
    addClassList(element, attrs.classList);
  }

  if (attrs?.events) {
    addEventListeners(element, attrs.events);
  }

  if (children) {
    appendChildren(element, children);
  }

  return element;
};
