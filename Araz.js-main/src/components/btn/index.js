import createElement from '../../tools/createElement'
export default createElement('button', {
    attrs: {
        id: 'btn',
        class: 'btn',
        // @ts-ignore
        click: `logger`
    },
  
})
