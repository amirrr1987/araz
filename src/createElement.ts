import { Element } from './types';

const addAttributes = <P extends { [key: string]: any }>(element: HTMLElement, props: P) => {
  for (const prop in props) {
    if (prop.startsWith('on')) {
      const eventName = prop.substring(2).toLowerCase();
      element.addEventListener(eventName, props[prop]);
    } else {
      element.setAttribute(prop, props[prop]);
    }
  }
};

const addChildren = (element: HTMLElement, children: Node | string | (Node | string)[] | null) => {
  if (children !== null && children !== undefined) {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (child instanceof Node) {
          element.appendChild(child);
        } else {
          element.appendChild(document.createTextNode(child.toString()));
        }
      });
    } else if (children instanceof Node) {
      element.appendChild(children);
    } else {
      element.appendChild(document.createTextNode(children.toString()));
    }
  }
};

const h = <P extends { [key: string]: any }>({
  name,
  props = {} as P,
  children = null,
  setup,
  onMounted,
}: Element<P>): HTMLElement => {
  const element: HTMLElement = document.createElement(name);

  addAttributes(element, props);

  addChildren(element, children);
  if (setup) {
    setup(element); // Call the setup function with the created element
  }

  if (onMounted) {
    element.addEventListener('DOMContentLoaded', () => {
      onMounted(element); // Call the onMounted function when the element is mounted
    });
  }
  return element;
};

export default h;
