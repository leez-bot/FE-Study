import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../App'

const LikeButton: React.FC = () => {
    const [count, setCount] = useState(0)
    const [on, setOn] = useState(true)
    const theme = useContext(ThemeContext)
    console.log(theme)
    const listenKeyDonw = () => {
        console.log('keydow')
    }
    useEffect(() => {
        document.title = `点击了${count}次`
    })
    useEffect(() => {
        window.addEventListener('keydown', listenKeyDonw)
        return () => {
            window.removeEventListener('keydown', listenKeyDonw)
        }
    }, [])
    return (
        <>
            <button onClick={() => setCount(count + 1)}>
                {count}👍
            </button>
            <button onClick={() => setOn(!on) }>
                {on ? 'ON' : 'OFF'}
            </button>
        </>
    )
}

export default LikeButton