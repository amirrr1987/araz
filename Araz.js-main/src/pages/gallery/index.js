import createElement from '../../tools/createElement';
// import './style.scss';
export default createElement('li', {
    attrs: {
        class: 'navbar__item',
    },
    children: [
        createElement('a', {
            attrs: {
                class: 'navbar__link',

            },

        })
    ]
})
