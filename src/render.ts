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
  trim
} from "lodash-es";
import { VNode } from "./types";

export const render = async ({
  $tag,
  $attrs = {},
  $children = [],
}: VNode): Promise<HTMLElement> => {
  const $el = document.createElement($tag);

  for await (const [key, value] of entries($attrs)) {

    if (isEqual(key, "style") && isObject(value)) {
      const result = map(entries(value), ([property, propertyValue]) => `${kebabCase(property)}:${propertyValue}`);
      const styleString = join(result, "; ");
      $el.setAttribute("style", styleString);
    }

    else if (isEqual(key, "events") && isObject(value)) {
      for (const [eventName, eventHandler] of entries(value)) {
        const formattedEventName = camelCase(eventName.slice(2));
        if (isFunction(eventHandler)) {
          $el.addEventListener(
            formattedEventName,
            eventHandler as unknown as EventListener
          );
        }
      }
    }
    
    else {
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

  return $el;
};