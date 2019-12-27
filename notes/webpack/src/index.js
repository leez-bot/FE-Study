import Header from './components/header/index.js'
import Content from './components/content/index.js'
import Footer from './components/footer/index.js'
import counter from './components/counter/counter.js';
import number from './components/number/number.js';
import { cube } from './common/common.js';
import React from 'react'
import ReactDOM from 'react-dom'
import Rnode from './components/reactTemp'


import { ui } from './common/jquery.ui.js'

ui()

ReactDOM.render(<Rnode />, document.getElementById('root'))

// import _ from 'lodash'
// import axios from 'axios'

import './index.css'

if (module.hot) {
  module.hot.accept('./components/content/index.js', () => {
    document.getElementById('root').removeChild(document.getElementsByClassName('content-wrapper')[0])
    new Content()
  })
}

const btn = document.createElement('button')
btn.innerHTML = `添加${cube(5)}`
document.body.appendChild(btn)
btn.onclick = () => {
  const div = document.createElement('div')
  div.className = 'item'
  div.innerHTML = 'item'
  document.body.appendChild(div)
  import('lodash').then(() => {
    console.log(_.camelCase('Foo Bar'))
  })
}

new Header()
new Content()
new Footer()

counter()
number()

if (module.hot) {
  module.hot.accept('./components/number/number.js', () => {
    document.body.removeChild(document.getElementById('number'))
    number()
  })
}

// SplitChunksPlugin测试
// console.log(_.camelCase('Foo Bar'))
// axios.get('aaa')

// lazy-loading
// import('lodash').then(() => {
//   console.log(_.camelCase('Foo Bar'))
// })