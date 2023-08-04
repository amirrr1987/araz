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
               click:'link'
               
            },
           
        })
    ]
})

let item = document.querySelectorAll('navbar__item');
item.forEach((single) => {
    single.addEventListener('click', () => {
        console.log('test')
    })
})