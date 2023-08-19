// createElement.ts
import { Children, ElementCreator, StateUpdater,EventHandler } from "./types";
import {
  forEach,
  isFunction,
  isString,
  isElement,
  includes,
  entries,
  camelCase,
  assign,
  startsWith,
  mapKeys,
  pickBy,
  indexOf,
} from "lodash-es";

export const onMounted = (callback: () => void): void => {
  if (document.readyState === "loading") {
    document.addEventListener("load", () => {
      callback();
    });
  } else {
    callback();
  }
};

export const useState = <T>(initialValue: T): [T, StateUpdater<T>] => {
  let state: T = initialValue;
  const listeners: Array<StateUpdater<T>> = [];

  const setState = (newValue: T): void => {
    state = newValue;
    forEach(listeners, (listener) => listener(state));
  };

  return [state, setState];
};

const applyStyles = (
  element: HTMLElement,
  styles: CSSStyleDeclaration
): void => {
  assign(element.style, styles);
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

const addAttrs = (
  element: HTMLElement,
  attrs: { [key: string]: string } | undefined
): void => {
  const validAttrNames = ["classList", "style"];

  const transformedAttrs = mapKeys(attrs, (value, key) => {
    if (startsWith(key, "data-")) {
      const dataAttributeName = key.replace("data-", "");
      element.dataset[dataAttributeName] = value || "";
      return null;
    }
    return key;
  });

  const filteredAttrs = pickBy(transformedAttrs, (_value, key) =>
    indexOf(validAttrNames, key) === -1
  );

  forEach(filteredAttrs, (attrValue, attrName) => {
    element.setAttribute(attrName, attrValue || "");
  });
};

export const render = ({
  tag,
  attrs,
  children,
}: ElementCreator): HTMLElement => {
  const element = document.createElement(tag);

  if (children) {
    appendChildren(element, children);
  }
  if (attrs) {
    if (attrs.style) {
      applyStyles(element, <CSSStyleDeclaration>attrs.style);
    }

    if (attrs.classList) {
      addClassList(element, attrs.classList);
    }

    if (attrs.events) {
      addEventListeners(element, attrs.events);
    }
    if (attrs.id) {
      element.id = attrs.id;
    } else {
      addAttrs(element, attrs);
    }
  }

  return element;
};