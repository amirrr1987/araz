import createElement from '../../tools/createElement';
import './style.scss';
import Home from '../../pages/home'

export default createElement('main', {
    attrs: {
        class: 'main',
    },
    children:[
        Home
    ],
    

})
