import {createElement} from '@/araz';
import Container from '@/components/Container';
const log = ()=>{
    console.log(11111)
}
export default createElement('footer', {
    attrs: {
        class: 'footer',
        onclick: log
    },
    children:[
        Container(createElement())
    ],
    // innerText: `
    // lorem sdffffffffffffffffffffffffffffffffffffffffff
    // `

})
