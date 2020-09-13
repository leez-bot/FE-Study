import { useState, useEffect } from 'react'

const useMousePositon = () => {
    const [ positon, setPosition ] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({
                x: e.clientX,
                y: e.clientY
            })
        }
        document.addEventListener('mousemove', updatePosition)
        return () => {
            document.removeEventListener('mousemove', updatePosition)
        }
    }, [])
    return positon
}

export default useMousePositon