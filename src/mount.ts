import { Mount } from "./types";

/**
 * Mounts an HTML element onto a target element in the DOM and returns the mounted element.
 *
 * @param $node - The HTML element to be mounted.
 * @param $target - The target element where the $node will be mounted.
 * @returns The mounted HTML element.
 *
 * @example
 * ```
 * // Mount an element onto a target element
 * const elementToMount = document.createElement("div");
 * const targetElement = document.querySelector("#target");
 * mount({ $node: elementToMount, $target: targetElement });
 *```
 */
export const mount = ({ $node, $target }: Mount): void => {
  $target.append($node);
};
