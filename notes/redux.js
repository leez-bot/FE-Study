function countReducer(state, action) {
  switch (action.type) {
    case 'INCRESE':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECRESE':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

function infoReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_AGE':
      return {
        ...state,
        age: action.age
      }
  }
}

const createStore = function(reducer, initState) {
  let state = initState
  let listeners = []

  // 添加订阅列表
  function subscribe(listener) {
    listeners.push(listener)
  }

  // 更改数据，发布消息
  function dispatch(action) {
    state = reducer(state, action)
    // 通知订阅者
    for (let i = 0; i< listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  // 获取数据
  function getState() {
    return state
  }

  return {
    subscribe,
    dispatch,
    getState
  }
}

// 使用
let initState = {
  counter: {
    count: 0
  },
  info: {
    name: 'lee',
    age: 17
  }
}

// reducer合并
const rootReducer = combineReducers({
  counter: countReducer,
  info: infoReducer
})

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers) // ['counter', 'info']
  // 返回合并后的reducer
  return function conbination(state = {}, action) {
    const nextState = {}
    // 遍历reducers,合成为一个新的state
    for (let i = 0; i< reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const reducer = reducers[key]
      // 之前key的state
      const previousStateForKey = state[key]
      // 分reducer, 获得新的state
      const nextStateForKey = reducer(previousStateForKey, action)
      nextState[key] = nextStateForKey
    }
    return nextState
  }
}

const store = createStore(rootReducer, initState)
store.subscribe(() => {
  let state = store.getState()
  console.log(state.info.age)
})
// store.dispatch({
//   type: 'INCRESE'
// })
// store.dispatch({
//   type: 'SET_NAME',
//   name: 'lizheng'
// })
store.dispatch({
  type: 'SET_AGE',
  age: 22
})
// reducer拆分（实践三）
// // 订阅（实践二）：自增自减
// store.subscribe(() => {
//   let state = store.getState()
//   console.log(state.count)
// })
// // 增
// store.dispatch({
//   type: 'INCRESE'
// })
// // 减
// store.dispatch({
//   type: 'DECRESE'
// })

// 订阅（实践一）两种信息
// store.subscribe(() => {
//   let state = store.getState()
//   console.log(`${state.info.name}:${state.info.age}`)
// })
// store.subscribe(() => {
//   let state = store.getState()
//   console.log(`counter:${state.counter.count}`)
// })
// // 改变消息并发布
// store.changeState({
//   ...store.getState(),
//   info: {
//     name: '李政',
//     age: 55
//   }
// })
// store.changeState({
//   ...store.getState(),
//   counter: {
//     count: 555
//   }
// })

// 发布订阅原理

// let state = {
//   count: 1
// }
// let listeners = []

// // 订阅列表
// function subscribe(listener) {
//   listeners.push(listener)
// }

// function changeCount(count) {
//   state.count = count
//   // 发布消息
//   for (let i = 0; i < listeners.length; i++) {
//     const listener = listeners[i]
//     listener()
//   }
// }

// // 订阅
// subscribe(() => {
//   console.log(state.count);
// });

// changeCount(2)
// changeCount(3)
// changeCount(4)
// console.log(subscribe)
