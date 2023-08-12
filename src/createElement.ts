import { EventHandler ,Children, ElementCreator } from './types';
import { forEach, isFunction, map, isString, isElement, includes, entries, camelCase, debounce, pickBy, isEmpty } from 'lodash-es';

export const onBeforeMount = (callback: () => void) => {
    const debouncedCallback = debounce(callback, 300);
    window.addEventListener("load", debouncedCallback);
};

export const onMounted = (callback: () => void) => {
    const debouncedCallback = debounce(callback, 300);
    window.addEventListener("DOMContentLoaded", debouncedCallback);
};

export const onUpdated = (callback: () => void) => {
    const debouncedCallback = debounce(callback, 300);
    document.addEventListener("DOMContentLoaded", debouncedCallback);
};

export const onDestroy = (callback: () => void) => {
    window.addEventListener("unload", callback);
};



if (document.readyState == 'loading') {
    console.log(document.readyState);
}




const applyStyles = (element: HTMLElement, styles: { [key: string]: string }): void => {
    map(styles, (value, key) => {
        element.style.setProperty(key, value);
    });
};

const addClasses = (element: HTMLElement, classList: string[]): void => {
    forEach(classList, className => {
        if (!includes(element.classList, className)) {
            element.classList.add(className);
        }
    });
}
const addEventListeners = (element: HTMLElement, events: { [key: string]: EventHandler }): void => {
    forEach(entries(events), ([eventName, eventHandler]) => {
        const formattedEventName = camelCase(eventName.slice(2));
        if (isFunction(eventHandler)) {
            element.addEventListener(formattedEventName, eventHandler);
        }
    });
};

const appendChildren = (element: HTMLElement, children: Children): void => {
    forEach(children, child => {
        if (isString(child)) {
            element.appendChild(document.createTextNode(child));
        } else if (isElement(child)) {
            element.appendChild(child);
        }
    });
};

export const r = ({ tag, attrs, children }: ElementCreator): HTMLElement => {
    const element = document.createElement(tag);

    const validStyles = pickBy(attrs.style, isString);

    if (!isEmpty(validStyles)) {
        applyStyles(element, validStyles);
    }

    if (attrs.classList && attrs.classList.length > 0) {
        addClasses(element, attrs.classList);
    }

    if (attrs) {
        addEventListeners(element, attrs);
    }

    if (children) {
        appendChildren(element, children);
    }

    return element;
};
