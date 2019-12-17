// 任意值（Any）用来表示允许赋值为任意类型

let seven: any = 'seven'
seven = 7

// 在任意值上访问任何属性\访问任何方法都是允许的
let anyThing: any = 'hello'
console.log(anyThing.name)
console.log(anyThing.name.hello)
anyThing.sayHello()

// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型
let something;
something = 'seven'
something = 7
something.sayHello('hello')