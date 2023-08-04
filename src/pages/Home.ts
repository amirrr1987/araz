import {createElement} from '@/araz';

const Container = createElement('div', {
    attrs: {
        class: 'container',

    },
    innerText: 'dsfsdf'

})
export default createElement('section', {
    attrs: {
        class: 'home__about about',
    },
    children: [
        Container
    ]
})
