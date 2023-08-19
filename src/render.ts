import { entries, isString } from "lodash-es";
import { VNode } from "./types";

const createNode = ({ $tag, $attrs = {}, $children = [] }: VNode): HTMLElement => {
  const $el = document.createElement($tag);

  for (const [key, value] of entries($attrs)) {
    $el.setAttribute(key, value.toString());
  }

  for (const child of $children) {
    if (isString(child)) {
      $el.appendChild(document.createTextNode(child));
    } else {
      const $child = createNode(child);
      $el.appendChild($child);
    }
  }

  return $el;
};

export const render = (vNode: VNode): HTMLElement => {
  const $el = createNode(vNode);
  return $el;
};
