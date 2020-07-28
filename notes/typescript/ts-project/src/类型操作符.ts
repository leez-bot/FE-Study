// 类型操作符
// 1、typeof: 获取值的类型
let colors = {
  color1: 'red',
  color2: 'blue'
}

// b_color: { color1: string, color2: string }
// 抽取colors的值类型赋给新的类型
type b_color = typeof colors

let data: b_color;

interface Person {
  name: string,
  age: number
}

// typeof Person // 报错，typeof抽取的是值，不是类型


// 2、keyof：获取类型所对应的key的集合，返回key的联合类型
// keyof 抽取的是对象，不是值
// a: 'name' | 'age'
type a = keyof Person

let _data: a;
_data = 'name'
_data = 'age'
// _data = 'hehe' // 报错

let p3 = {
  name: 'hehe',
  age: 11
}

// 两种写法
function getPersonVal(k: keyof Person) {
  return p3[k]
}

function getPersonVal2(k: keyof typeof p3) {
  return p3[k]
}


// 3、in操作符，对值和类型使用

interface Person2 {
  name: string,
  age: number,
  like: string
}

type personKeys = keyof Person2 // 'name' | 'age'
// 遍历key, 生成新的type
type newPerson = {
  [k in personKeys]: string
}

// 4、extend: 继承：

interface type1 {
  x: number,
  y: number
}

interface type2 extends type1 {
  z: number
}

let _type2: type2 = {
  x: 1,
  y: 1,
  z: 3
}

type type3 = {
  x: number;
  y: number
}

function fn2<T extends type3>(args: T) {

}

fn2({ x: 1, y: 1, str: 'hehe' })