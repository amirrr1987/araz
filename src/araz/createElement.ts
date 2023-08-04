const createElement = (tagName: string, { attrs = {}, children = [], innerText = '' } = {}) => {
    return {
        tagName,
        attrs,
        children,
        innerText
    };
};

export default createElement;