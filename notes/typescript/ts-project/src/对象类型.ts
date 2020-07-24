let obj1: object = {
  x: 1,
  y: 2
}

// obj1.x // 报错：object类型没有x属性

let obj2: { x: number, y: number } = {
  x: 1,
  y: 2
}

obj2.x
obj2.y


// 内置对象类型

let d1: Date = new Date()

d1.getDate()
d1.getDay()