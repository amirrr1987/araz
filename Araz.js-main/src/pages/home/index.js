import createElement from '../../tools/createElement';
// import './style.scss';
export default createElement('section', {
    attrs: {
        class: 'home__about about',
    },
    children: [
        createElement('div', {
            attrs: {
                class: 'container',

            },
            innerText: 'dsfsdf'

        })
    ]
})
