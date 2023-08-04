export default (tagName, { attrs = {}, children = [], innerText = {} } = {},  ) => {
    return {
        tagName,
        attrs,
        children,
        innerText
    }
}