function Header() {
  const root = document.getElementById('root')
  const p = document.createElement('p')
  p.innerText = '我是头'
  root.appendChild(p)
}

export default Header