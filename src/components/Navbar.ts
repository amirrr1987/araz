import {createElement} from '../araz';
import link from './Link'
export default createElement('navbar', {
    attrs: {
        class: 'navbar',
    },
    children:[
        createElement('ul', {
            attrs: {
                class: 'navbar__nav',
            },
            children: [
                link,
                link,
                link,
                link,
            ]
        })
    ]
})
