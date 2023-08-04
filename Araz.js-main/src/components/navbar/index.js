import createElement from '../../tools/createElement';
import './style.scss';
import link from '../link'
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
