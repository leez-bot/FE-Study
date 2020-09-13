import React, { useState, useEffect } from 'react'

export default function CountExample() {
    const [ count, setCount ] = useState(0)
    const [ fruit, setFruit ] = useState('banana')
    const [ todoList, setTodoList ] = useState([{ key: '000' }])

    useEffect(() => {
        document.title = `你点了页面${count}次`
    })

    const addTodo = () => {
        let value = Math.random() * 1000
        let _todoList = todoList
        _todoList.push({ key: value.toString() })
        setTodoList(_todoList)
    }

    return (
        <div>
            <p>你点击了{ count } 次</p>
            <button onClick={() => setCount(count + 1)}>增加</button>
            <button onClick={() => setCount(count - 1)}>减少</button>

            <p>当前水果：{ fruit }</p>
            <button onClick={() => setFruit(fruit.split('').reverse().join(''))}>反转</button>

            <p>todoList: { todoList.map(item => item.key) }</p>
            <button onClick={addTodo}>添加要做的事</button>
        </div>
    )
}