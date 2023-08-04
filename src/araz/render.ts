const render = (vNode: { tagName: any; innerText: any; attrs: { [s: string]: unknown; } | ArrayLike<unknown>; children: any; }) => {
    const $el = document.createElement(vNode.tagName);

    // Set innerText if available
    if (vNode.innerText) {
        $el.innerText = vNode.innerText;
    }

    // Handle class attribute separately
    if (vNode.attrs.class) {
        const classes = vNode.attrs.class.split(' ');
        $el.classList.add(...classes);
        delete vNode.attrs.class; // Remove the original class attribute
    }

    for (const [k, v] of Object.entries(vNode.attrs)) {
        $el.setAttribute(k, v);
    }

    for (const child of vNode.children) {
        const $child = render(child);
        $el.appendChild($child);
    }

    return $el;
};

export default render;