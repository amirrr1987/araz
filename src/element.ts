import { Attrs, Children, ElementFunction, Tag } from "./types";
import {
  camelCase,
  entries,
  isArray,
  isElement,
  isEqual,
  isFunction,
  isObject,
  isString,
  join,
  kebabCase,
  map,
  trim,
} from "lodash-es";

/**
 * Create an HTML element.
 *
 * @param {string} $tag - The HTML tag name or tag type.
 * @param {Attrs} [$attrs] - Optional attributes for the element.
 * @param {Children} [$children] - Optional children of the element.
 * @returns {Element} The created HTML element.
 */

export const el: ElementFunction = (
  $tag: Tag,
  $attrs?: Attrs,
  $children?: Children
) => {
  const element = document.createElement($tag);

  if ($attrs) {
    for (const [key, value] of entries($attrs)) {
      if (isEqual(key, "style") && isObject(value)) {
        const result = map(
          entries(value),
          ([property, propertyValue]) =>
            `${kebabCase(property)}:${propertyValue}`
        );
        const styleString = join(result, "; ");
        element.setAttribute("style", styleString);
      } else if (isEqual(key, "class") && isArray(value)) {
        const classList = value.join(" ");
        element.setAttribute("class", trim(classList));
      } else if (isEqual(key, "events") && isObject(value)) {
        for (const [eventName, eventHandler] of entries(value)) {
          const formattedEventName = camelCase(eventName.slice(2));
          if (isFunction(eventHandler)) {
            element.addEventListener(
              formattedEventName,
              eventHandler as unknown as EventListener
            );
          }
        }
      } else {
        element.setAttribute(key, isString(value) ? value.toString() : "");
      }
    }
  }

  if ($children) {
    if (isString($children)) {
      element.append($children as string);
    }
    if (isElement($children)) {
      element.append($children as Element);
    }

    if (isArray($children)) {
      for (const child of $children) {
        if (isString(child)) {
          element.append(child as string);
        }

        if (isElement(child)) {
          element.append(child as Element);
        }
      }
    }
  }

  return element;
};
