import createElement from './tools/createElement'
import render from './tools/render'
import './assets/scss/style.scss'

import header from './layouts/header'
import main from './layouts/main'
import footer from './layouts/footer'

// @ts-ignores
const vApp = createElement('div', {
    
    attrs: {
        id: 'app',
        class: 'amir'
    },

    children: [
        header,
        main,
        footer
    ],

})

let $app = render(vApp);
let app = document.querySelector('#app');
app.appendChild($app)
mount($app,app)
