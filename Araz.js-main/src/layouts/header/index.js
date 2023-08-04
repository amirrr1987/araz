import createElement from '../../tools/createElement';
import './style.scss';
import Navbar from '../../components/navbar'
export default createElement('header', {
    attrs: {
        class: 'header',
    },
    children:[Navbar]
})
