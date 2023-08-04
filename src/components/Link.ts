import {createElement} from '../araz';
export default createElement('li', {
    attrs: {
        class: 'navbar__item',
    },
    children: [
        createElement('a', {
            attrs: {
                class: 'navbar__link',
               click:'link'
               
            },
           innerText: 'DDD'
        })
    ]
})

let item = document.querySelectorAll('navbar__item');
item.forEach((single) => {
    single.addEventListener('click', () => {
        console.log('test')
    })
})