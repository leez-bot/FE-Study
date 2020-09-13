import React from 'react'
import useMousePosition from '../hooks/useMousePosition'

interface IHelloProps {
    message?: string;
}

const Hello: React.FC<IHelloProps> = (props) => {
    const positions = useMousePosition()
return (<h2>{props.message}X:{positions.x};Y:{positions.y}</h2>)
}


Hello.defaultProps = {
    message: 'lalala'
}

export default Hello