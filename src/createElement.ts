import { EventHandler ,Children, ElementCreator } from './types';
import { forEach, isFunction, isString, isElement, includes, entries, camelCase, debounce, assign } from 'lodash-es';

export const onBeforeMount = (callback: () => void) => {
    const debouncedCallback = debounce(callback, 300);
    window.addEventListener("load", debouncedCallback);
};

export const onMounted = (callback: () => void) => {
    const debouncedCallback = debounce(callback, 300);
    window.addEventListener("DOMContentLoaded", debouncedCallback);
};

export const onDestroy = (callback: () => void) => {
    window.addEventListener("unload", callback);
};



if (document.readyState == 'loading') {
    console.log(document.readyState);
}




const applyStyles = (element: HTMLElement, styles: CSSStyleDeclaration): void => {
    const style = element.style as CSSStyleDeclaration;
    assign(style, styles)
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
 

    if (attrs?.style) {
        applyStyles(element, <CSSStyleDeclaration>attrs?.style);
    }

    if (attrs?.classList) {
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
