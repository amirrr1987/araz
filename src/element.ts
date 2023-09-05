import { VNode, Children } from "./types";
export const fragment = ({ $children }: { $children: Children }) => $children;

/**
 * Creates a virtual DOM element (VNode) with the provided tag, attributes, and children.
 *
 * @param $tag - The HTML tag name of the element.
 * @param $attrs - The attributes to apply to the element.
 * @param $children - An array of child VNodes.
 * @returns The created virtual DOM element (VNode).
 *
 * @example
 *```
 * const element = el({
 *   $tag: 'div',
 *   $attrs: { id: 'my-element', class: 'container' },
 *   $children: [
 *     el({ $tag: 'p', $children: ['Hello, World!'] }),
 *     el({ $tag: 'button', $attrs: { type: 'button' }, $children: ['Click me'] }),
 *   ],
 * });
 *```
 */
export const el = ({ $tag, $attrs = {}, $children = [] }: VNode) => {
  return {
    $tag,
    $attrs,
    $children,
  };
};
