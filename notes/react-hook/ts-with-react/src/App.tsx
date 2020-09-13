import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import Hello from './components/hello'
import LikeButton from './components/LikeButton'

import useMousePositon from './hooks/useMousePosition'

import useURLLoader from './hooks/useURLLoader'

interface IShowResult {
  message: string,
  status: string
}

interface IThemeProps {
  [key: string]: { color: string, background: string }
}

const themes: IThemeProps = {
  'linght': {
    color: '#000',
    background: '#eee'
  },
  'dark': {
    color: '#fff',
    background: '#000'
  }
}

export const ThemeContext = React.createContext(themes.light)

function App() {
  const [likeOn, setLikeOn] = useState(true)
  const [ show, setShow ] = useState(true)

  const positions = useMousePositon()

  const [ data, loading ] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show])
  const dogResult = data as IShowResult

  return (
    <div className="App">
      <ThemeContext.Provider value={themes.light}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p><button onClick={() => setShow(!show)}>refresh dog</button></p>
          {/* <Hello /> */}
          <p>
            positions: {`X: ${positions.x};Y:${positions.y}`}
          </p>
          {
            loading ? <p>读取中</p>:
            <img src={dogResult ? dogResult.message : ''} />
          }
          {
            likeOn ? <LikeButton></LikeButton> : null
          }
          <button onClick={() => setLikeOn(!likeOn)}>toggle</button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
