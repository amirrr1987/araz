 # Araz.js


Araz.js is a mini framework that provides a simple and intuitive API for building web applications. It is inspired by popular frameworks like React and Vue.js, but with a focus on simplicity and ease of use.

## Installation

To install Araz.js, simply run the following command in your terminal:

```
npm install araz
```

## Usage

Araz.js is a component-based framework, which means that your application is built by composing reusable components. Each component is a self-contained unit that has its own state and logic.

To create a component, you can use the `el()` function. This function takes an object with three properties: `$tag`, `$attrs`, and `$children`.

* `$tag` is the HTML tag name of the component.
* `$attrs` is an object containing the attributes of the component.
* `$children` is an array of child components.

For example, the following code creates a simple button component:

```
const button = el({
  $tag: 'button',
  $attrs: {
    type: 'button',
    class: 'btn btn-primary',
  },
  $children: ['Click me'],
});
```

Once you have created a component, you can mount it to the DOM using the `mount()` function. This function takes two arguments: the component to be mounted, and the target element in the DOM.

For example, the following code mounts the button component to the `<body>` element:

```
mount({
  $node: button,
  $target: document.body,
});
```

## Rendering

Araz.js uses a virtual DOM to render components. This means that it creates a lightweight representation of the DOM in memory, and then compares it to the actual DOM. If there are any differences, Araz.js will update the actual DOM to match the virtual DOM.

This approach makes Araz.js very efficient, as it only updates the parts of the DOM that need to be updated.

To render a component, you can use the `render()` function. This function takes a single argument: the component to be rendered.

For example, the following code renders the button component:

```
const renderedButton = await render(button);
```

## Routing

Araz.js includes a simple router that allows

Generated by [BlackboxAI](https://www.useblackbox.ai)