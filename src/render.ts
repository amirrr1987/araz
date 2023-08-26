import {
  camelCase,
  entries,
  isArray,
  isEqual,
  isFunction,
  isObject,
  isString,
  join,
  kebabCase,
  map,
  trim,
} from "lodash-es";
import { VNode } from "./types";

/**
 * Renders a virtual DOM structure into actual DOM elements and returns a DocumentFragment or HTMLElement.
 *
 * @param  nodes - A single VNode or an array of VNodes representing the virtual DOM structure.
 * @returns A DocumentFragment or HTMLElement containing the rendered DOM structure.
 *
 *
 * @example
 * ```
 * // Define a virtual DOM structure
 * const virtualDOM = [
 *   {
 *     $tag: "div",
 *     $attrs: { class: "container" },
 *     $children: [
 *       { $tag: "h1", $children: ["Hello, World!"] },
 *       { $tag: "p", $children: ["This is a paragraph."] },
 *     ],
 *   },
 *   // ...
 * ];
 * // Render the virtual DOM
 * const renderedDOM = await render(virtualDOM);
 * // Append the rendered DOM to the document
 * document.body.appendChild(renderedDOM);
 * ```
 */
export const render = async (
  nodes: VNode[] | VNode
): Promise<DocumentFragment | HTMLElement> => {
  const fragment = document.createDocumentFragment();

  const nodeArray = isArray(nodes) ? nodes : [nodes];

  for await (const node of nodeArray) {
    const { $tag, $attrs = {}, $children = [] } = node;

    if (!$tag) {
      continue;
    }

    const $el = document.createElement($tag);

    for await (const [key, value] of entries($attrs)) {
      if (isEqual(key, "style") && isObject(value)) {
        const result = map(
          entries(value),
          ([property, propertyValue]) =>
            `${kebabCase(property)}:${propertyValue}`
        );
        const styleString = join(result, "; ");
        $el.setAttribute("style", styleString);
      } else if (isEqual(key, "class") && isArray(value)) {
        const classList = value.join(" ");
        $el.setAttribute("class", trim(classList));
      } else if (isEqual(key, "events") && isObject(value)) {
        for (const [eventName, eventHandler] of entries(value)) {
          const formattedEventName = camelCase(eventName.slice(2));
          if (isFunction(eventHandler)) {
            $el.addEventListener(
              formattedEventName,
              eventHandler as unknown as EventListener
            );
          }
        }
      } else {
        $el.setAttribute(key, isString(value) ? value.toString() : "");
      }
    }

    for await (const child of $children) {
      if (isString(child)) {
        $el.appendChild(document.createTextNode(child));
      } else {
        const $child = await render(child);
        $el.appendChild($child);
      }
    }

    fragment.appendChild($el);
  }

  return fragment;
};
