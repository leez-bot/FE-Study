import './style.css'

function Content() {
  const root = document.getElementById('root')
  const p = document.createElement('p')
  p.innerText = '我是内容略略略!!!哈哈哈哈！！！@#￥#@￥！！啦啦啦嘿嘿嘿嘿哈哈哈...'
  p.className = 'content-wrapper'
  root.appendChild(p)
}

export default Content