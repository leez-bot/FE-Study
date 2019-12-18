function Footer() {
  const root = document.getElementById('root')
  const p = document.createElement('p')
  p.innerText = '我是脚'
  root.appendChild(p)
}

export default Footer